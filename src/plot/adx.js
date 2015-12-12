'use strict';

module.exports = function(accessor_adx, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        adxLine = plot.pathLine(),
        plusDiLine = plot.pathLine(),
        minusDiLine = plot.pathLine();

    function adx(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      group.entry.append('path').attr('class', 'adx');
      group.entry.append('path').attr('class', 'plusDi');
      group.entry.append('path').attr('class', 'minusDi');

      adx.refresh(g);
    }

    adx.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot, adxLine, plusDiLine,
              minusDiLine);
    };

    function binder() {
      adxLine.init(p.accessor.d, p.xScale, p.accessor.adx, p.yScale);
      plusDiLine.init(p.accessor.d, p.xScale, p.accessor.plusDi, p.yScale);
      minusDiLine.init(p.accessor.d, p.xScale, p.accessor.minusDi, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(adx, p).plot(accessor_adx(), binder);
    binder();

    return adx;
  };
};

function refresh(g, accessor, x, y, plot, adxLine, plusDiLine, minusDiLine) {
  g.selectAll('path.adx').attr('d', adxLine);
  g.selectAll('path.plusDi').attr('d', plusDiLine);
  g.selectAll('path.minusDi').attr('d', minusDiLine);
}
