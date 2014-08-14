'use strict';

module.exports = function(d3_select, d3_event, d3_mouse, axisannotation) { // Injected dependencies
  return function() { // Closure function
    var xAnnotation = [axisannotation()],
        yAnnotation = [axisannotation()],
        verticalWireRange,
        horizontalWireRange;

    function crosshair(g) {
      var xRange = xAnnotation[0].axis().scale().range(),
          yRange = yAnnotation[0].axis().scale().range(),
          group = g.selectAll('g.data').data([0]),
          groupEnter = group.enter().append('g').attr('class', 'data').call(display, 'none');

      groupEnter.append('path').attr('class', 'horizontal wire');
      groupEnter.append('path').attr('class', 'vertical wire');

      appendAnnotation(group, groupEnter, d3_select, ['axisannotation', 'x'], xAnnotation);
      appendAnnotation(group, groupEnter, d3_select, ['axisannotation', 'y'], yAnnotation);

      var mouseSelection = g.selectAll('rect').data([0]);
      mouseSelection.enter().append('rect').style({ fill: 'none', 'pointer-events': 'all'});

      mouseSelection.attr({
          x: Math.min(xRange[0], xRange[xRange.length-1]),
          y: Math.min(yRange[0], yRange[yRange.length-1]),
          height: Math.abs(yRange[yRange.length-1] - yRange[0]),
          width: Math.abs(xRange[xRange.length-1] - xRange[0])
        })
        .on('mouseenter', display(g, 'inline'))
        .on('mouseout', display(g, 'none'))
        .on('mousemove', mousemoveRefresh(group, d3_select, d3_mouse, xAnnotation, yAnnotation, verticalWireRange, horizontalWireRange));

      crosshair.refresh(g);
    }

    crosshair.refresh = function(g) {
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

function display(g, style) {
  return function() {
    g.selectAll('g.data').style('display', style);
  };
}

function mousemoveRefresh(group, d3_select, d3_mouse, xAnnotation, yAnnotation, verticalWireRange, horizontalWireRange) {
  return function() {
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
  };
}

function refresh(d3_select, xAnnotation, yAnnotation, xPath, yPath,
                 xAnnotationSelection, yAnnotationSelection,
                 verticalWireRange, horizontalWireRange) {
  var x = xAnnotation[0].axis().scale(),
      y = yAnnotation[0].axis().scale();

  xPath.attr('d', verticalPathLine(x, verticalWireRange || y.range()));
  yPath.attr('d', horizontalPathLine(y, horizontalWireRange || x.range()));
  xAnnotationSelection.each(refreshAnnotation(d3_select, xAnnotation));
  yAnnotationSelection.each(refreshAnnotation(d3_select, yAnnotation));
}

function horizontalPathLine(y, range) {
  return function(d) {
    if(!d) return "M 0 0";
    var value = y(d);
    return ['M', range[0], value, 'L', range[range.length-1], value].join(' ');
  };
}

function verticalPathLine(x, range) {
  return function(d) {
    if(!d) return "M 0 0";
    var value = x(d);
    return ['M', value, range[0], 'L', value, range[range.length-1]].join(' ');
  };
}

function updateAnnotationValue(annotations, value) {
  return function(d, i) {
    // d[0] because only ever 1 value for crosshairs
    d[0].value = annotations[i].axis().scale().invert(value);
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