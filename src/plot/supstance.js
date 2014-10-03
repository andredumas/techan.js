'use strict';

module.exports = function(d3_behavior_drag, d3_event, d3_select, d3_dispatch, accessor_value, plot, plotMixin) {  // Injected dependencies
  function Supstance() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatch = d3_dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend');

    function supstance(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity);

      group.entry.append('g').attr('class', 'supstance')
        .append('path');

      var interaction = group.entry.append('g').attr('class', 'interaction').style({ opacity: 0, fill: 'none' })
        .call(plot.interaction.mousedispatch(dispatch));

      interaction.append('path').style('stroke-width', 16);

      supstance.refresh(g);
    }

    supstance.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    supstance.drag = function(g) {
      g.selectAll('.interaction path')
        .call(dragBody(dispatch, p.accessor, p.xScale, p.yScale));
    };

    // Mixin 'superclass' methods and variables
    plotMixin(supstance, p, accessor_value())
      .on(supstance, dispatch);

    return supstance;
  }

  function dragBody(dispatch, accessor, x, y) {
    var drag = d3_behavior_drag().origin(function(d) {
      return { x: 0, y: y(accessor.v(d)) };
    })
    .on('drag', function(d) {
      accessor.v(d, y.invert(d3_event().y));
      refresh(d3_select(this.parentNode.parentNode), accessor, x, y);
      dispatch.drag(d);
    });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  return Supstance;
};

function refresh(g, accessor, x, y) {
  g.selectAll('.supstance path').attr('d', supstancePath(accessor, x, y));
  g.selectAll('.interaction path').attr('d', supstancePath(accessor, x, y));
}

function supstancePath(accessor, x, y) {
  return function(d) {
    var path = [],
        range = x.range();

    path.push('M', range[0], y(accessor.v(d)));
    path.push('L', range[range.length-1], y(accessor.v(d)));

    return path.join(' ');
  };
}