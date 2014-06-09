'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_ohlc, plot) {  // Injected dependencies
  function candlestick() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_ohlc();

    function candlestickPlot(g) {
      var dataSelection = plot.dataSelection(g, g.data, accessor.date),
          dataEntry = plot.dataEntry(g, g.data, accessor.date),
          volumeOpacityScale = d3_scale_linear().domain(d3_extent(g.data.map(accessor.volume))).range([0.2, 1]);

      function volumeOpacity(d) {
        return volumeOpacityScale(accessor.volume(d));
      }

      dataEntry.append('rect').attr({ class: 'candle body'});
      dataEntry.append('line').attr({ class: 'candle wick top' });
      dataEntry.append('line').attr({ class: 'candle wick bottom' });

      dataSelection.selectAll('rect.candle').style('opacity', volumeOpacity);
      dataSelection.selectAll('line.candle.top').style('stroke-opacity', volumeOpacity );
      dataSelection.selectAll('line.candle.bottom').style('stroke-opacity', volumeOpacity );
      dataSelection.selectAll('rect.candle, line.candle').classed(plot.classedUpDown(accessor));

      refresh();
    }

    candlestickPlot.refresh = function(g) {
      refresh(accessor, g, xScale, yScale);
    };

    candlestickPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return candlestickPlot;
    };

    candlestickPlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return candlestickPlot;
    };

    accessor.date = function(_) {
      accessor.date(_);
      return accessor;
    };

    accessor.open = function(_) {
      accessor.open(_);
      return accessor;
    };

    accessor.high = function(_) {
      accessor.high(_);
      return accessor;
    };

    accessor.low = function(_) {
      accessor.low(_);
      return accessor;
    };

    accessor.close = function(_) {
      accessor.close(_);
      return accessor;
    };

    accessor.volume = function(_) {
      accessor.volume(_);
      return accessor;
    };

    candlestickPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return candlestickPlot;
    };

    return candlestickPlot;
  }

  return candlestick;
};

function refresh(accessor, g, xScale, yScale) {
  g.selectAll('rect.candle').attr({
    width: xScale.rangeBand(),
    x: function(d) { return xScale(accessor.date(d)); },
    y: function(d) { return yScale(Math.max(accessor.close(d), accessor.open(d))); },
    height: function(d) { return Math.max(Math.abs(yScale(accessor.close(d)) - yScale(accessor.open(d))), 1); }
  });

  g.selectAll('line.candle.top').attr({
    x1: function(d) { return xScale.point(accessor.date(d)); },
    x2: function(d) { return xScale.point(accessor.date(d)); },
    y1: function(d) { return yScale(accessor.high(d)); },
    y2: function(d) { return yScale(Math.max(accessor.open(d), accessor.close(d))); }
  });

  g.selectAll('line.candle.bottom').attr({
    x1: function(d) { return xScale.point(accessor.date(d)); },
    x2: function(d) { return xScale.point(accessor.date(d)); },
    y1: function(d) { return yScale(Math.min(accessor.open(d), accessor.close(d))); },
    y2: function(d) { return yScale(accessor.low(d)); }
  });
}