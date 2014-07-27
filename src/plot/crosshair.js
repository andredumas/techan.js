'use strict';

module.exports = function(d3_select, d3_event, d3_mouse) {  // Injected dependencies
  return function() { // Closure function
    var xAnnotation = [],
        yAnnotation = [],
        verticalRange,
        horizontalRange;

    function crosshair(g) {
      // TODO Let the user pass the x and y ranges to support lines that extend past the scales
      if(!xAnnotation.length || !yAnnotation.length) return;

      var xRange = verticalRange || xAnnotation[0].axis().scale().range(),
          yRange = horizontalRange || yAnnotation[0].axis().scale().range(),
          group = g.selectAll('g.data').data([undefined]),
          groupEnter = group.enter().append('g').attr('class', 'data').style('display', 'none');

      groupEnter.append('path').attr('class', 'horizontal');
      groupEnter.append('path').attr('class', 'vertical');

      appendAnnotation(group, groupEnter, d3_select, ['axisannotation', 'x'], xAnnotation);
      appendAnnotation(group, groupEnter, d3_select, ['axisannotation', 'y'], yAnnotation);

      var mouseSelection = g.selectAll('rect').data([undefined]);
      mouseSelection.enter().append('rect').style({ fill: 'none', 'pointer-events': 'all'});

      mouseSelection.attr({
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
            group.selectAll('g.axisannotation.y > g').each(updateAnnotationValue(yAnnotation, coords[1]))
          );
        });

      crosshair.refresh(g);
    }

    crosshair.refresh = function(g) {
      if(!xAnnotation.length || !yAnnotation.length) return;
      refresh(d3_select, xAnnotation, yAnnotation,
        g.select('path.vertical'), g.select('path.horizontal'),
        g.selectAll('g.axisannotation.x > g'), g.selectAll('g.axisannotation.y > g')
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

    return crosshair;
  };
};

function refresh(d3_select, xAnnotation, yAnnotation, xPath, yPath, xAnnotationSelection, yAnnotationSelection) {
  var x = xAnnotation[0].axis().scale(),
      y = yAnnotation[0].axis().scale();

  xPath.attr('d', verticalPathLine(x, y));
  yPath.attr('d', horizontalPathLine(x, y));
  xAnnotationSelection.each(refreshAnnotation(d3_select, xAnnotation));
  yAnnotationSelection.each(refreshAnnotation(d3_select, yAnnotation));
}

function horizontalPathLine(x, y) {
  return function(d) {
    if(isNaN(d)) return "M 0 0";
    var value = y(d),
        range = x.range();
    return ['M', range[0], value, 'L', range[range.length-1], value].join(' ');
  };
}

function verticalPathLine(x, y) {
  return function(d) {
    if(isNaN(d)) return "M 0 0";
    var value = x(d),
        range = y.range();
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
  annotationSelection.enter().append('g').each(function(d, i) { annotation[i](d3_select(this)); });
}

function refreshAnnotation(d3_select, annotation) {
  return function(d, i) {
    annotation[i].refresh(d3_select(this));
  };
}