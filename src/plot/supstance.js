'use strict';

module.exports = function(d3_behavior_drag, d3_event, d3_select, accessor_value, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function supstance(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity);

      group.entry.append('path').attr('class', 'supstance');

      group.entry.append('g').attr('class', 'interaction').style({ opacity: 0, fill: 'none' })
        .append('path').style('stroke-width', 16);

      supstance.refresh(g);
    }

    supstance.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    supstance.drag = function(g) {
      g.selectAll('.interaction path')
        .call(dragBody(d3_behavior_drag, d3_event, d3_select, p.accessor, p.xScale, p.yScale));
    };

    // Mixin 'superclass' methods and variables
    plotMixin(supstance, p, accessor_value());

    return supstance;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.supstance').attr('d', supstancePath(accessor, x, y));
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

function dragBody(d3_behavior_drag, d3_event, d3_select, accessor, x, y) {
  return d3_behavior_drag()
    .origin(function(d) {
      // TODO Fire listeners
      return { x: 0, y: y(accessor.v(d)) };
    })
    .on('drag', function(d) {
      accessor.v(d, y.invert(d3_event().y));
      refresh(d3_select(this.parentNode.parentNode), accessor, x, y);
      // TODO Fire listeners
    });
}