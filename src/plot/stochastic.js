'use strict';

module.exports = function(accessor_stochastic, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        stochUpLine = plot.pathLine(),
        stochDownLine = plot.pathLine();

    function stochastic(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'stochastic up');
      group.entry.append('path').attr('class', 'stochastic down');
      stochastic.refresh(g);
    }

    stochastic.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, stochUpLine,
              stochDownLine);
    };

    function binder() {
      stochUpLine.init(p.accessor.d, p.xScale, p.accessor.k, p.yScale);
      stochDownLine.init(p.accessor.d, p.xScale, p.accessor.sd, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(stochastic, p).plot(accessor_stochastic(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return stochastic;
  };
};

function refresh(selection, accessor, x, y, plot, stochUpLine, stochDownLine) {
  selection.select('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  selection.select('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  selection.select('path.stochastic.up').attr('d', stochUpLine);
  selection.select('path.stochastic.down').attr('d', stochDownLine);
}
