'use strict';

module.exports = function(d3_select, d3_event, d3_mouse) { // Injected dependencies
  return function() { // Closure function
    var xAnnotation = [],
        yAnnotation = [],
        verticalWireRange,
        horizontalWireRange;

    function crosshair(g) {
      // TODO Handle this via noop on selection data?
      if(!xAnnotation.length || !yAnnotation.length) return;

      var xRange = xAnnotation[0].axis().scale().range(),
          yRange = yAnnotation[0].axis().scale().range(),
          group = g.selectAll('g.data').data([null]),
          groupEnter = group.enter().append('g').attr('class', 'data').style('display', 'none');

      groupEnter.append('path').attr('class', 'horizontal wire');
      groupEnter.append('path').attr('class', 'vertical wire');

      appendAnnotation(group, groupEnter, d3_select, ['axisannotation', 'x'], xAnnotation);
      appendAnnotation(group, groupEnter, d3_select, ['axisannotation', 'y'], yAnnotation);

      var mouseSelection = g.selectAll('rect').data([null]);
      mouseSelection.enter().append('rect').style({ fill: 'none', 'pointer-events': 'all'});

      mouseSelection.attr({
          x: Math.min(xRange[0], xRange[xRange.length-1]),
          y: Math.min(yRange[0], yRange[yRange.length-1]),
          height: Math.abs(yRange[yRange.length-1] - yRange[0]),
          width: Math.abs(xRange[xRange.length-1] - xRange[0])
        })
        .on('mouseenter', function() { g.selectAll('g.data').style('display', 'inline'); })
        .on('mouseout', function() { g.selectAll('g.data').style('display', 'none'); })
        .on('mousemove', function() {
          var coords = d3_mouse(this),
              x = xAnnotation[0].axis().scale(),
              y = yAnnotation[0].axis().scale();

          refresh(d3_select, xAnnotation, yAnnotation,
            group.select('path.vertical').datum(x.invert(coords[0])),
            group.select('path.horizontal').datum(y.invert(coords[1])),
            group.selectAll('g.axisannotation.x > g').each(updateAnnotationValue(xAnnotation, coords[0])),
            group.selectAll('g.axisannotation.y > g').each(updateAnnotationValue(yAnnotation, coords[1])),
            verticalWireRange, horizontalWireRange
          );
        });

      crosshair.refresh(g);
    }

    crosshair.refresh = function(g) {
      if(!xAnnotation.length || !yAnnotation.length) return;
      refresh(d3_select, xAnnotation, yAnnotation,
        g.select('path.vertical'), g.select('path.horizontal'),
        g.selectAll('g.axisannotation.x > g'), g.selectAll('g.axisannotation.y > g'),
        verticalWireRange, horizontalWireRange
      );
    };

    crosshair.xAnnotation = function(_) {
      if(!arguments.length) return xAnnotation;
      xAnnotation = _ instanceof Array ? _ : [_];
      return crosshair;
    };

    crosshair.yAnnotation = function(_) {
      if(!arguments.length) return yAnnotation;
      yAnnotation = _ instanceof Array ? _ : [_];
      return crosshair;
    };

    crosshair.verticalWireRange = function(_) {
      if(!arguments.length) return verticalWireRange;
      verticalWireRange = _;
      return crosshair;
    };

    crosshair.horizontalWireRange = function(_) {
      if(!arguments.length) return horizontalWireRange;
      horizontalWireRange = _;
      return crosshair;
    };

    return crosshair;
  };
};

function refresh(d3_select, xAnnotation, yAnnotation, xPath, yPath,
                 xAnnotationSelection, yAnnotationSelection,
                 verticalWireRange, horizontalWireRange) {
  var x = xAnnotation[0].axis().scale(),
      y = yAnnotation[0].axis().scale();

  xPath.attr('d', verticalPathLine(x, y, verticalWireRange));
  yPath.attr('d', horizontalPathLine(x, y, horizontalWireRange));
  xAnnotationSelection.each(refreshAnnotation(d3_select, xAnnotation));
  yAnnotationSelection.each(refreshAnnotation(d3_select, yAnnotation));
}

// TODO Remove isNaN checks to support other scales such as ordinals
function horizontalPathLine(x, y, horizontalWireRange) {
  return function(d) {
    if(!d || isNaN(d)) return "M 0 0";
    var value = y(d),
        range = horizontalWireRange|| x.range();
    return ['M', range[0], value, 'L', range[range.length-1], value].join(' ');
  };
}

// TODO Remove isNaN checks to support other scales such as ordinals
function verticalPathLine(x, y, verticalWireRange) {
  return function(d) {
    if(!d || isNaN(d)) return "M 0 0";
    var value = x(d),
        range = verticalWireRange || y.range();
    return ['M', value, range[0], 'L', value, range[range.length-1]].join(' ');
  };
}

function updateAnnotationValue(annotations, value) {
  return function(d, i) {
    var range = annotations[i].axis().scale().range(),
        start = range[0],
        end = range[range.length-1];

    range = start < end ? [start, end] : [end, start];

    // d[0] because only ever 1 value for crosshairs
    d[0].value = range[0] <= value && value <= range[range.length-1] ? annotations[i].axis().scale().invert(value) : null;
  };
}

function appendAnnotation(selection, selectionEnter, d3_select, classes, annotation) {
  selectionEnter.append('g').attr('class', classes.join(' '));
  var annotationSelection = selection.select('g.' + classes.join('.')).selectAll('g')
    .data(annotation.map(function() { return [{ value: null }]; }));
  annotationSelection.exit().remove();
  annotationSelection.enter().append('g').attr('class', function(d, i) { return i; })
    .each(function(d, i) { annotation[i](d3_select(this)); });
}

function refreshAnnotation(d3_select, annotation) {
  return function(d, i) {
    annotation[i].refresh(d3_select(this));
  };
}