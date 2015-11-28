'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        bodyPathGenerator,
        wickGenerator,
        wickWidthGenerator;

    function candlestick(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

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
      wickWidthGenerator = plot.lineWidth(p.xScale, 1, 4);
    }

    function bodyPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var path = [],
            open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xValue = x(accessor.d(d)) - width/2;

        path.push(
          'M', xValue, open,
          'l', width, 0
        );

        // Draw body only if there is a body (there is no stroke, so will not appear anyway)
        if(open != close) {
          path.push(
            'L', xValue + width, close,
            'l', -width, 0,
            'L', xValue, open
          );
        }

        return path.join(' ');
      };
    }

    function wickPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x);

      return function(d) {
        var path = [],
            open = y(accessor.o(d)),
            close = y(accessor.c(d)),
            xPoint = x(accessor.d(d)),
            xValue = xPoint - width/2;

        // Top
        path.push(
          'M', xPoint, y(accessor.h(d)),
          'L', xPoint, Math.min(open, close)
        );

        // Draw another cross wick if there is no body
        if(open == close) {
          path.push(
            'M', xValue, open,
            'l', width, 0
          );
        }
        // Bottom
        path.push(
          'M', xPoint, Math.max(open, close),
          'L', xPoint, y(accessor.l(d))
        );

        return path.join(' ');
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(candlestick, p).plot(accessor_ohlc(), binder).width(binder);

    return candlestick;
  };
};