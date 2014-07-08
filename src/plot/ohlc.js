'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {};  // Container for private, direct access mixed in variables

    function ohlcPlot(g) {
      plot.groupSelect(g, plot.dataMapper.unity, p.accessor.d)
        .entry.append('path').attr({ class: 'ohlc' }).classed(plot.classedUpDown(p.accessor));

      ohlcPlot.refresh(g);
    }

    ohlcPlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(ohlcPlot, p, accessor_ohlc());

    return ohlcPlot;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.ohlc').attr({ d: ohlcPath(accessor, x, y) });
}

function ohlcPath(accessor, x, y) {
  return function(d) {
    var path = [],
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.band(),
        xPoint = x(accessor.d(d)),
        xValue = xPoint - rangeBand/2;

    path.push('M', xValue, open);
    path.push('l', rangeBand/2, 0);

    path.push('M', xPoint, y(accessor.h(d)));
    path.push('L', xPoint, y(accessor.l(d)));

    path.push('M', xPoint, close);
    path.push('l', rangeBand/2, 0);

    return path.join(' ');
  };
}