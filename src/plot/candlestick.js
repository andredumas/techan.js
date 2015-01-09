'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        bodyPathGenerator,
        wickGenerator,
        wickWidthGenerator;

    function candlestick(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d),
          upDownEqual = plot.groupUpDownEqual(g.datum(), p.accessor);

      // 3x2 path's as wick and body can be styled slightly differently (stroke and fills)
      plot.appendUpDownEqual(group.selection, p.accessor, ['candle', 'body'], upDownEqual);
      plot.appendUpDownEqual(group.selection, p.accessor, ['candle', 'wick'], upDownEqual);

      candlestick.refresh(g);
    }

    candlestick.refresh = function(g) {
      g.selectAll('path.candle.body').attr('d', bodyPathGenerator);
      g.selectAll('path.candle.wick').attr('d', wickGenerator).style('stroke-width', wickWidthGenerator);
    };

    function binder() {
      bodyPathGenerator = plot.joinPath(p.accessor, p.xScale, p.yScale, bodyPath);
      wickGenerator = plot.joinPath(p.accessor, p.xScale, p.yScale, wickPath);
      wickWidthGenerator = plot.lineWidth(p.xScale, 1, 4);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(candlestick, p).plot(accessor_ohlc(), binder);

    return candlestick;
  };
};

function bodyPath(accessor, x, y, barWidth) {
  return function(d) {
    var path = [],
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = barWidth(x),
        xValue = x(accessor.d(d)) - rangeBand/2;

    path.push(
        'M', xValue, open,
        'l', rangeBand, 0
      );

    // Draw body only if there is a body (there is no stroke, so will not appear anyway)
    if(open != close) {
      path.push(
          'L', xValue + rangeBand, close,
          'l', -rangeBand, 0,
          'L', xValue, open
        );
    }

    return path.join(' ');
  };
}

function wickPath(accessor, x, y, barWidth) {
  return function(d) {
    var path = [],
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = barWidth(x),
        xPoint = x(accessor.d(d)),
        xValue = xPoint - rangeBand/2;

    // Top
    path.push(
        'M', xPoint, y(accessor.h(d)),
        'L', xPoint, Math.min(open, close)
      );

    // Draw another cross wick if there is no body
    if(open == close) {
      path.push(
          'M', xValue, open,
          'l', rangeBand, 0
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