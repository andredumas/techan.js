'use strict';

module.exports = function(d3_select, d3_event, d3_mouse, d3_dispatch, axisannotation, plotMixin) { // Injected dependencies
  return function() { // Closure function
    var dispatch = d3_dispatch('enter', 'out', 'move'),
        xAnnotation = [axisannotation()],
        yAnnotation = [axisannotation()],
        verticalWireRange,
        horizontalWireRange,
        change = 0; // Track changes to this object, to know when to redraw

    function crosshair(g) {
      var group = g.selectAll('g.data.top').data([change], function(d) { return d; }),
          groupEnter = group.enter(),
          dataEnter = groupEnter.append('g').attr('class', 'data top').style('display', 'none');

      group.exit().remove();

      dataEnter.append('path').attr('class', 'horizontal wire');
      dataEnter.append('path').attr('class', 'vertical wire');

      appendAnnotation(dataEnter, d3_select, 'x', xAnnotation);
      appendAnnotation(dataEnter, d3_select, 'y', yAnnotation);

      g.selectAll('rect').data([0]).enter().append('rect').style({ fill: 'none', 'pointer-events': 'all' });

      crosshair.refresh(g);
    }

    crosshair.refresh = function(g) {
      var xRange = xAnnotation[0].axis().scale().range(),
          yRange = yAnnotation[0].axis().scale().range(),
          group = g.selectAll('g.data'),
          mouseSelection = g.selectAll('rect'),
          pathVerticalSelection = group.selectAll('path.vertical'),
          pathHorizontalSelection = group.selectAll('path.horizontal'),
          xAnnotationSelection = group.selectAll('g.axisannotation.x > g'),
          yAnnotationSelection = group.selectAll('g.axisannotation.y > g');

      mouseSelection.attr({
          x: Math.min(xRange[0], xRange[xRange.length-1]),
          y: Math.min(yRange[0], yRange[yRange.length-1]),
          height: Math.abs(yRange[yRange.length-1] - yRange[0]),
          width: Math.abs(xRange[xRange.length-1] - xRange[0])
        })
        .on('mouseenter', function() {
          display(g, 'inline');
          dispatch.enter();
        })
        .on('mouseout', function() {
          display(g, 'none');
          dispatch.out();
        })
        .on('mousemove', mousemoveRefresh(d3_select, d3_mouse, dispatch, xAnnotation, yAnnotation,
          pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection,
          verticalWireRange, horizontalWireRange)
        );

      refresh(d3_select, xAnnotation, yAnnotation, pathVerticalSelection, pathHorizontalSelection,
        xAnnotationSelection, yAnnotationSelection, verticalWireRange, horizontalWireRange
      );
    };

    crosshair.xAnnotation = function(_) {
      if(!arguments.length) return xAnnotation;
      xAnnotation = _ instanceof Array ? _ : [_];
      change++; // Annotations have changed, increment to trigger a redraw
      return crosshair;
    };

    crosshair.yAnnotation = function(_) {
      if(!arguments.length) return yAnnotation;
      yAnnotation = _ instanceof Array ? _ : [_];
      change++; // Annotations have changed, increment to trigger a redraw
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

    // Mixin event listening
    plotMixin.on(crosshair, dispatch);

    return crosshair;
  };
};

function display(g, style) {
  g.select('g.data.top').style('display', style);
}

function mousemoveRefresh(d3_select, d3_mouse, dispatch, xAnnotation, yAnnotation, pathVerticalSelection, pathHorizontalSelection,
                          xAnnotationSelection, yAnnotationSelection, verticalWireRange, horizontalWireRange) {
  var event = [new Array(xAnnotation.length), new Array(yAnnotation.length)];

  return function() {
    var coords = d3_mouse(this),
        x = xAnnotation[0].axis().scale(),
        y = yAnnotation[0].axis().scale();

    refresh(d3_select, xAnnotation, yAnnotation,
      pathVerticalSelection.datum(x.invert(coords[0])),
      pathHorizontalSelection.datum(y.invert(coords[1])),
      xAnnotationSelection.each(updateAnnotationValue(xAnnotation, coords[0], event[0])),
      yAnnotationSelection.each(updateAnnotationValue(yAnnotation, coords[1], event[1])),
      verticalWireRange, horizontalWireRange
    );

    dispatch.move(event);
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

function updateAnnotationValue(annotations, value, event) {
  return function(d, i) {
    event[i] = annotations[i].axis().scale().invert(value);
    // d[0] because only ever 1 value for crosshairs
    d[0].value = event[i];
  };
}

function appendAnnotation(selection, d3_select, clazz, annotation) {
  var annotationSelection = selection.append('g').attr('class', 'axisannotation ' + clazz)
    .selectAll('g').data(annotation.map(function() { return [{ value: null }]; }));

  annotationSelection.enter().append('g').attr('class', function(d, i) { return i; })
    .each(function(d, i) { annotation[i](d3_select(this)); });
}

function refreshAnnotation(d3_select, annotation) {
  return function(d, i) {
    annotation[i].refresh(d3_select(this));
  };
}