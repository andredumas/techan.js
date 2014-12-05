'use strict';

/**
 * TODO Refactor this to techan.plot.annotation.axis()?
 */
module.exports = function(d3_svg_axis, accessor_value, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},
        axis = d3_svg_axis(),
        format,
        point = 4,
        height = 14,
        width = 50,
        translate = [0, 0];

    function annotation(g) {
      g.selectAll('g.translate').data(plot.dataMapper.array).enter()
        .append('g').attr('class', 'translate');

      annotation.refresh(g);
    }

    annotation.refresh = function(g) {
      var fmt = format ? format : (axis.tickFormat() ? axis.tickFormat() : axis.scale().tickFormat());
      refresh(g, plot, p.accessor, axis, fmt, height, width, point, translate);
    };

    annotation.axis = function(_) {
      if(!arguments.length) return axis;
      axis = _;
      return annotation;
    };

    annotation.format = function(_) {
      if(!arguments.length) return format;
      format = _;
      return annotation;
    };

    annotation.height = function(_) {
      if(!arguments.length) return height;
      height = _;
      return annotation;
    };

    annotation.width = function(_) {
      if(!arguments.length) return width;
      width = _;
      return annotation;
    };

    annotation.translate = function(_) {
      if(!arguments.length) return translate;
      translate = _;
      return annotation;
    };

    plotMixin(annotation, p).accessor(accessor_value());

    return annotation;
  };
};

function refresh(g, plot, accessor, axis, format, height, width, point, translate) {
  var neg = axis.orient() === 'left' || axis.orient() === 'top' ? -1 : 1,
      translateSelection = g.select('g.translate'),
      dataGroup = plot.groupSelect(translateSelection, filterInvalidValues(accessor, axis.scale()));
  dataGroup.entry.append('path');
  dataGroup.entry.append('text');

  translateSelection.attr('transform', 'translate(' + translate[0] + ',' + translate[1] + ')');
  dataGroup.selection.selectAll('path').attr('d', backgroundPath(accessor, axis, height, width, point, neg));
  dataGroup.selection.selectAll('text').text(textValue(accessor, format)).call(textAttributes, accessor, axis, neg);
}

function filterInvalidValues(accessor, scale) {
  return function(data) {
    var range = scale.range(),
        start = range[0],
        end = range[range.length - 1];

    range = start < end ? [start, end] : [end, start];

    return data.filter(function (d) {
      if (!accessor(d)) return false;
      var value = scale(accessor(d));
      return value && !isNaN(value) && range[0] <= value && value <= range[1];
    });
  };
}

function textAttributes(text, accessor, axis, neg) {
  var scale = axis.scale();

  switch(axis.orient()) {
    case 'left':
    case 'right':
      text.attr({
        x: neg*(Math.max(axis.innerTickSize(), 0) + axis.tickPadding()),
        y: textPosition(accessor, scale),
        dy: '.32em'
      }).style('text-anchor', neg < 0 ? 'end' : 'start');
      break;
    case 'top':
    case 'bottom':
      text.attr({
        x: textPosition(accessor, scale),
        y: neg*(Math.max(axis.innerTickSize(), 0) + axis.tickPadding()),
        dy: neg < 0 ? '0em' : '.72em'
      }).style('text-anchor', 'middle');
      break;
  }
}

function textPosition(accessor, scale) {
  return function(d) {
    return scale(accessor(d));
  };
}

function textValue(accessor, format) {
  return function(d) {
    return format(accessor(d));
  };
}

function backgroundPath(accessor, axis, height, width, point, neg) {
  return function(d) {
    var scale = axis.scale(),
        value = scale(accessor(d)),
        pt = point;

    switch(axis.orient()) {
      case 'left':
      case 'right':
        var h = 0;

        if(height/2 < point) pt = height/2;
        else h = height/2-point;

        return [
          'M', 0, value,
          'l', neg*axis.innerTickSize(), -pt,
          'l', 0, -h,
          'l', neg*width, 0,
          'l', 0, height,
          'l', neg*-width, 0,
          'l', 0, -h
        ].join(' ');
      case 'top':
      case 'bottom':
        var w = 0;

        if(width/2 < point) pt = width/2;
        else w = width/2-point;

        return [
          'M', value, 0,
          'l', -pt, neg*axis.innerTickSize(),
          'l', -w, 0,
          'l', 0, neg*height,
          'l', width, 0,
          'l', 0, neg*-height,
          'l', -w, 0
        ].join(' ');
      default: throw "Unsupported axis.orient() = " + axis.orient();
    }
  };
}