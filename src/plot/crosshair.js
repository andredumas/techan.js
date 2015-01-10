'use strict';

module.exports = function(d3_select, d3_event, d3_mouse, d3_dispatch, plot, plotMixin) { // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatch = d3_dispatch('enter', 'out', 'move'),
        xAnnotation = [],
        yAnnotation = [],
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

      plot.annotation.append(dataEnter, xAnnotation, 'x');
      plot.annotation.append(dataEnter, yAnnotation, 'y');

      g.selectAll('rect').data([0]).enter().append('rect').style({ fill: 'none', 'pointer-events': 'all' });

      crosshair.refresh(g);
    }

    crosshair.refresh = function(g) {
      var xRange = p.xScale.range(),
          yRange = p.yScale.range(),
          group = g.selectAll('g.data'),
          mouseSelection = g.selectAll('rect'),
          pathVerticalSelection = group.selectAll('path.vertical'),
          pathHorizontalSelection = group.selectAll('path.horizontal'),
          xAnnotationSelection = group.selectAll('g.axisannotation.x > g'),
          yAnnotationSelection = group.selectAll('g.axisannotation.y > g');

      mouseSelection.attr({
          x: Math.min.apply(null, xRange),
          y: Math.min.apply(null, yRange),
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
        .on('mousemove', mousemoveRefresh(pathVerticalSelection, pathHorizontalSelection,
          xAnnotationSelection, yAnnotationSelection)
        );

      refresh(pathVerticalSelection, pathHorizontalSelection, xAnnotationSelection, yAnnotationSelection);
    };

    function mousemoveRefresh(pathVerticalSelection, pathHorizontalSelection,
                              xAnnotationSelection, yAnnotationSelection) {
      return function() {
        var coords = d3_mouse(this),
            x = p.xScale.invert(coords[0]),
            y = p.yScale.invert(coords[1]);

        refresh(pathVerticalSelection.datum(x),
          pathHorizontalSelection.datum(y),
          xAnnotationSelection.each(plot.annotation.update(xAnnotation, coords[0])),
          yAnnotationSelection.each(plot.annotation.update(yAnnotation, coords[1]))
        );

        dispatch.move([x, y]);
      };
    }

    function refresh(xPath, yPath, xAnnotationSelection, yAnnotationSelection) {
      var x = p.xScale,
          y = p.yScale;

      xPath.attr('d', verticalPathLine(x, verticalWireRange || y.range()));
      yPath.attr('d', horizontalPathLine(y, horizontalWireRange || x.range()));
      xAnnotationSelection.each(plot.annotation.refresh(xAnnotation));
      yAnnotationSelection.each(plot.annotation.refresh(yAnnotation));
    }

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

    // Mixin scale management and event listening
    plotMixin(crosshair, p)
      .xScale()
      .yScale()
      .on(dispatch);

    return crosshair;
  };
};

function display(g, style) {
  g.select('g.data.top').style('display', style);
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