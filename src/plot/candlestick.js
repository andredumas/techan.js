'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        bodyPathGenerator,
        wickGenerator,
        wickWidthGenerator;

    function candlestick(g) {
      var group = p.dataSelector(g);

      // 3x2 path's as wick and body can be styled slightly differently (stroke and fills)
      plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'body']);
      plot.appendPathsUpDownEqual(group.selection, p.accessor, ['candle', 'wick']);

      candlestick.refresh(g);
    }

    candlestick.refresh = function(g) {
      g.selectAll('path.candle.body').attr('d', bodyPathGenerator);
      g.selectAll('path.candle.wick').attr('d', wickGenerator).style('stroke-width', wickWidthGenerator);
    };

    function binder() {
      bodyPathGenerator = plot.joinPath(bodyPath);
      wickGenerator = plot.joinPath(wickPath);
      wickWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 4);
    }

    function bodyPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xValue = x(accessor.d(d)) - width/2,
            path = 'M ' + xValue + ' ' + open + ' l ' + width + ' ' + 0;

        // Draw body only if there is a body (there is no stroke, so will not appear anyway)
        if(open != close) {
          path += ' L ' + (xValue + width) + ' ' + close + ' l ' + -width + ' ' + 0 + ' L ' + xValue  + ' ' + open;
        }

        return path;
      };
    }

    function wickPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x);

      return function(d) {
        var open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xPoint = x(accessor.d(d)),
            xValue = xPoint - width/2,
            path = 'M ' + xPoint + ' ' + y(accessor.h(d)) +' L ' + xPoint + ' '+ Math.min(open, close); // Top

        // Draw another cross wick if there is no body
        if(open == close) {
          path += ' M ' + xValue + ' ' + open + ' l ' + width + ' ' + 0;
        }
        // Bottom
        return path + ' M ' + xPoint + ' ' + Math.max(open, close) + ' L ' + xPoint + ' ' + y(accessor.l(d));
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(candlestick, p).plot(accessor_ohlc(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return candlestick;
  };
};