'use strict';

module.exports = function(accessor_value, plot, plotMixin) {  // Injected dependencies
  function movingaverage() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function movingaveragePlot(g, data) {
      var group = plot.groupSelect(g, [data], p.accessor.date());

      group.entry.append('path').attr({ class: 'movingaverage' });

      movingaveragePlot.refresh(g);
    }

    movingaveragePlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(movingaveragePlot, p, accessor_value());

    return movingaveragePlot;
  }

  return movingaverage;
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.movingaverage').attr({ d: plot.pathLine(accessor.d, x, accessor.v, y) });
}