'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_ohlc, plot) {  // Injected dependencies
  return function() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_ohlc();

    function candlestickPlot(g, data) {
      var dataSelection = plot.dataSelection(g, data, accessor.date()),
          dataEntry = plot.dataEntry(dataSelection),
          volumeOpacityScale = d3_scale_linear().domain(d3_extent(data.map(accessor.volume()))).range([0.2, 1]);

      function volumeOpacity(d) {
        return volumeOpacityScale(accessor.volume()(d));
      }

      dataEntry.append('path').attr({ class: 'candle body' }).classed(plot.classedUpDown(accessor));
      dataEntry.append('path').attr({ class: 'candle wick' }).classed(plot.classedUpDown(accessor));
      dataSelection.selectAll('path').style('opacity', volumeOpacity);

      candlestickPlot.refresh(g);
    }

    candlestickPlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale);
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

    candlestickPlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return candlestickPlot;
    };

    candlestickPlot.date = function(_) {
      accessor.date(_);
      return accessor;
    };

    candlestickPlot.open = function(_) {
      accessor.open(_);
      return accessor;
    };

    candlestickPlot.high = function(_) {
      accessor.high(_);
      return accessor;
    };

    candlestickPlot.low = function(_) {
      accessor.low(_);
      return accessor;
    };

    candlestickPlot.close = function(_) {
      accessor.close(_);
      return accessor;
    };

    candlestickPlot.volume = function(_) {
      accessor.volume(_);
      return accessor;
    };

    candlestickPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return candlestickPlot;
    };

    return candlestickPlot;
  };
};

function refresh(g, ac, x, y) {
  candlePath(g, ac, x, y);
}

function candlePath(g, ac, x, y) {
  g.selectAll('path.candle.body').attr({ d: candleBodyPath(ac, x, y) });
  g.selectAll('path.candle.wick').attr({ d: candleWickPath(ac, x, y) });
}

function candleBodyPath(accessor, xScale, yScale) {
  return function(d) {
    var path = [],
        x = xScale(accessor.date()(d)),
        open = yScale(accessor.open()(d)),
        close = yScale(accessor.close()(d)),
        rangeBand = xScale.rangeBand();

    path.push('M', x, open);
    path.push('l', rangeBand, 0);

    // Draw body only if there is a body (there is no stroke, so will not appear anyway)
    if(open != close) {
      path.push('L', x + rangeBand, close);
      path.push('l', -rangeBand, 0);
      path.push('L', x, open);
    }

    return path.join(' ');
  };
}

function candleWickPath(accessor, xScale, yScale) {
  return function(d) {
    var path = [],
      x = xScale(accessor.date()(d)),
      open = yScale(accessor.open()(d)),
      close = yScale(accessor.close()(d)),
      rangeBand = xScale.rangeBand(),
      xPoint = x + rangeBand/2;

    // Top
    path.push('M', xPoint, yScale(accessor.high()(d)));
    path.push('L', xPoint, Math.min(open, close));

    // Draw another cross wick if there is no body
    if(open == close) {
      path.push('M', x, open);
      path.push('l', rangeBand, 0);
    }
    // Bottom
    path.push('M', xPoint, Math.max(open, close));
    path.push('L', xPoint, yScale(accessor.low()(d)));

    return path.join(' ');
  };
}