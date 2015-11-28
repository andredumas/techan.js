'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        ohlcGenerator,
        lineWidthGenerator;

    function ohlc(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      plot.appendPathsUpDownEqual(group.selection, p.accessor, 'ohlc');

      ohlc.refresh(g);
    }

    ohlc.refresh = function(g) {
      g.selectAll('path.ohlc').attr('d', ohlcGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      ohlcGenerator = plot.joinPath(ohlcPath);
      lineWidthGenerator = plot.lineWidth(p.xScale, 1, 2);
    }

    function ohlcPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x),
        r = plot.r;

      return function(d) {
        var open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xPoint = x(accessor.d(d)),
            xValue = xPoint - width/2;

        return [
          'M', xValue, open,
          'l', width/2, 0,
          'M', xPoint, y(accessor.h(d)),
          'L', xPoint, y(accessor.l(d)),
          'M', xPoint, close,
          'l', width/2, 0
        ].join(' ');
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(ohlc, p).plot(accessor_ohlc(), binder).width(binder);

    return ohlc;
  };
};