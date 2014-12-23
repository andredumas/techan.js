'use strict';

module.exports = function(d3_behavior_drag, d3_event, d3_select, d3_dispatch, accessor_value, plot, plotMixin) {  // Injected dependencies
  function Supstance() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatch = d3_dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend'),
        annotation = [];

    function supstance(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity);

      group.entry.append('g').attr('class', 'supstance')
        .append('path');

      plot.annotation.append(group.entry, annotation, 'y', p.accessor, p.yScale);

      var interaction = group.entry.append('g').attr('class', 'interaction').style({ opacity: 0, fill: 'none' })
        .call(plot.interaction.mousedispatch(dispatch));

      interaction.append('path').style('stroke-width', 16);

      supstance.refresh(g);
    }

    supstance.refresh = function(g) {
      refresh(g, plot, p.accessor, p.xScale, p.yScale, g.selectAll('.axisannotation.y > g'), annotation);
    };

    supstance.drag = function(g) {
      g.selectAll('.interaction path')
        .call(dragBody(dispatch, p.accessor, p.xScale, p.yScale, annotation));
    };

    supstance.annotation = function(_) {
      if(!arguments.length) return annotation;
      annotation = _ instanceof Array ? _ : [_];
      return supstance;
    };

    // Mixin 'superclass' methods and variables
    plotMixin(supstance, p)
      .plot(accessor_value())
      .on(dispatch);

    return supstance;
  }

  function dragBody(dispatch, accessor, x, y, annotation) {
    var drag = d3_behavior_drag().origin(function(d) {
      return { x: 0, y: y(accessor(d)) };
    })
    .on('drag', function(d) {
      var value = y.invert(d3_event().y),
          g = d3_select(this.parentNode.parentNode), // Go up to the selected items parent only (not the list of items)
          annotationSelection = g.selectAll('.axisannotation.y > g');

      accessor.v(d, value);
      annotationSelection.each(plot.annotation.update(annotation, d3_event().y));
      refresh(g, plot, accessor, x, y, annotationSelection, annotation);
      dispatch.drag(d);
    });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  return Supstance;
};

function refresh(g, plot, accessor, x, y, annotationSelection, annotation) {
  g.selectAll('.supstance path').attr('d', supstancePath(accessor, x, y));
  g.selectAll('.interaction path').attr('d', supstancePath(accessor, x, y));
  annotationSelection.each(plot.annotation.refresh(annotation));
}

function supstancePath(accessor, x, y) {
  return function(d) {
    var path = [],
        range = x.range();

    path.push('M', range[0], y(accessor(d)));
    path.push('L', range[range.length-1], y(accessor(d)));

    return path.join(' ');
  };
}