'use strict';

module.exports = function(accessor_stochastic, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        kLine = plot.pathLine(),
        dLine = plot.pathLine();

    function stochastic(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'stochastic k');
      group.entry.append('path').attr('class', 'stochastic d');
      stochastic.refresh(g);
    }

    stochastic.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, kLine, dLine);
    };

    function binder() {
      kLine.init(p.accessor.d, p.xScale, p.accessor.k, p.yScale);
      dLine.init(p.accessor.d, p.xScale, p.accessor.sd, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(stochastic, p).plot(accessor_stochastic(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return stochastic;
  };
};

function refresh(selection, accessor, x, y, plot, kLine, dLine) {
  selection.select('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  selection.select('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  selection.select('path.stochastic.k').attr('d', kLine);
  selection.select('path.stochastic.d').attr('d', dLine);
}
