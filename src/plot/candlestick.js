'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_ohlc, plot) {  // Injected dependencies
  return function() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_ohlc();

    function candlestickPlot(g, data) {
      var group = plot.groupSelect(g, data, accessor.date()),
          volumeOpacityScale = d3_scale_linear().domain(d3_extent(data.map(accessor.v))).range([0.2, 1]);

      function volumeOpacity(d) {
        return volumeOpacityScale(accessor.v(d));
      }

      // Two path's as wick and body can be styled slightly differently (stroke and fills)
      group.entry.append('path').attr({ class: 'candle body' }).classed(plot.classedUpDown(accessor));
      group.entry.append('path').attr({ class: 'candle wick' }).classed(plot.classedUpDown(accessor));
      group.selection.selectAll('path').style('opacity', volumeOpacity);

      candlestickPlot.refresh(g);
    }

    candlestickPlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale);
    };

    candlestickPlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return candlestickPlot;
    };

    candlestickPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return candlestickPlot;
    };

    candlestickPlot.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return candlestickPlot;
    };

    return candlestickPlot;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.candle.body').attr({ d: candleBodyPath(accessor, x, y) });
  g.selectAll('path.candle.wick').attr({ d: candleWickPath(accessor, x, y) });
}

function candleBodyPath(accessor, x, y) {
  return function(d) {
    var path = [],
        xValue = x(accessor.d(d)),
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.rangeBand();

    path.push('M', xValue, open);
    path.push('l', rangeBand, 0);

    // Draw body only if there is a body (there is no stroke, so will not appear anyway)
    if(open != close) {
      path.push('L', xValue + rangeBand, close);
      path.push('l', -rangeBand, 0);
      path.push('L', xValue, open);
    }

    return path.join(' ');
  };
}

function candleWickPath(accessor, x, y) {
  return function(d) {
    var path = [],
        xValue = x(accessor.d(d)),
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.rangeBand(),
        xPoint = xValue + rangeBand/2;

    // Top
    path.push('M', xPoint, y(accessor.h(d)));
    path.push('L', xPoint, Math.min(open, close));

    // Draw another cross wick if there is no body
    if(open == close) {
      path.push('M', xValue, open);
      path.push('l', rangeBand, 0);
    }
    // Bottom
    path.push('M', xPoint, Math.max(open, close));
    path.push('L', xPoint, y(accessor.l(d)));

    return path.join(' ');
  };
}