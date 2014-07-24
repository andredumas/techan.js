'use strict';

module.exports = function(d3_svg_axis, plot) {  // Injected dependencies
  return function() { // Closure function
    var axis = d3_svg_axis(),
      format,
      point = 4,
      height = 14,
      width = 50;

    function annotation(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity);

      group.entry.append('path');
      group.entry.append('text');

      annotation.refresh(g);
    }

    annotation.refresh = function(g) {
      var fmt = format ? format :
        axis.tickFormat() ? axis.tickFormat() : axis.scale().tickFormat();

      refresh(g, axis, fmt, height, width, point);
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

    return annotation;
  };
};

function refresh(g, axis, format, height, width, point) {
  var scale = axis.scale(),
    neg = axis.orient() === 'left' || axis.orient() === 'top' ? -1 : 1;

  g.selectAll('path').attr('d', backgroundPath(axis, height, width, point, neg));

  var text = g.selectAll('text');

  switch(axis.orient()) {
    case 'left':
    case 'right':
      text.attr('x', neg*(Math.max(axis.innerTickSize(), 0) + axis.tickPadding()))
        .attr('y', function(d) { return scale(d); })
        .attr('dy', '.32em').style('text-anchor', neg < 0 ? 'end' : 'start');
      break;
    case 'top':
    case 'bottom':
      text.attr('x', function(d) { return scale(d); })
        .attr('y', neg*(Math.max(axis.innerTickSize(), 0) + axis.tickPadding()))
        .attr('dy', neg < 0 ? '0em' : '.72em').style('text-anchor', 'middle');
      break;
  }

  text.text(function(d) { return format(d); });
}

function backgroundPath(axis, height, width, point, neg) {
  return function(d) {
    var scale = axis.scale(),
      pt = point;

    switch(axis.orient()) {
      case 'left':
      case 'right':
        var h = 0;

        if(height/2 < point) pt = height/2;
        else h = height/2-point;

        return [
          'M', 0, scale(d),
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
          'M', scale(d), 0,
          'l', -pt, neg*axis.innerTickSize(),
          'l', -w, 0,
          'l', 0, neg*height,
          'l', width, 0,
          'l', 0, neg*-height,
          'l', -w, 0
        ].join(' ');
      default: throw "Unsupported axis.orient() " + axis.orient();
    }
  };
}