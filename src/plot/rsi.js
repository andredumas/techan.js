'use strict';

module.exports = function(accessor_rsi, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function rsi(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'middle');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'rsi');

      rsi.refresh(g);
    }

    rsi.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(rsi, p, accessor_rsi());

    return rsi;
  };
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  g.selectAll('path.middle').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.m, y));
  g.selectAll('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  g.selectAll('path.rsi').attr('d', plot.pathLine(accessor.d, x, accessor.r, y));
}