'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        ohlcGenerator,
        lineWidthGenerator;

    function ohlc(g) {
      plot.appendPathsUpDownEqual(p.dataSelector(g).selection, p.accessor, 'ohlc');

      ohlc.refresh(g);
    }

    ohlc.refresh = function(g) {
      g.selectAll('path.ohlc').attr('d', ohlcGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      ohlcGenerator = plot.joinPath(ohlcPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function ohlcPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xPoint = x(accessor.d(d)),
            xValue = xPoint - width/2;

        return 'M ' + xValue + ' ' +
          open + ' l ' + (width/2) + ' 0 M ' + xPoint + ' ' + y(accessor.h(d)) + ' L ' +
          xPoint + ' ' + y(accessor.l(d)) + ' M ' + xPoint + ' ' + close + ' l ' + (width/2) + ' 0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(ohlc, p).plot(accessor_ohlc(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return ohlc;
  };
};