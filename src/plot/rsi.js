'use strict';

module.exports = function(accessor_rsi, plot, plotMixin) {  // Injected dependencies
  function rsi() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function rsiPlot(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      group.entry.append('path').attr({ class: 'overbought' });
      group.entry.append('path').attr({ class: 'middle' });
      group.entry.append('path').attr({ class: 'oversold' });
      group.entry.append('path').attr({ class: 'rsi' });

      rsiPlot.refresh(g);
    }

    rsiPlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(rsiPlot, p, accessor_rsi());

    return rsiPlot;
  }

  return rsi;
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.overbought').attr({ d: plot.horizontalPathLine(x, accessor.ob, y) });
  g.selectAll('path.middle').attr({ d: plot.horizontalPathLine(x, accessor.m, y) });
  g.selectAll('path.oversold').attr({ d: plot.horizontalPathLine(x, accessor.os, y) });
  g.selectAll('path.rsi').attr({ d: plot.pathLine(accessor.d, x, accessor.r, y) });
}