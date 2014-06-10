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
      var startMillis = Date.now();
      dataEntry.append('rect').attr({ class: 'candle body'});
      dataEntry.append('line').attr({ class: 'candle wick top' });
      dataEntry.append('line').attr({ class: 'candle wick bottom' });

      dataSelection.selectAll('rect.candle').style('opacity', volumeOpacity);
      dataSelection.selectAll('line.candle.top').style('stroke-opacity', volumeOpacity );
      dataSelection.selectAll('line.candle.bottom').style('stroke-opacity', volumeOpacity );
      dataSelection.selectAll('rect.candle, line.candle').classed(plot.classedUpDown(accessor));

//      dataEntry.append('path').attr({ class: 'candle body' }).classed(plot.classedUpDown(accessor));
//      dataEntry.append('path').attr({ class: 'candle wick' }).classed(plot.classedUpDown(accessor));
//      dataSelection.selectAll('path').style('opacity', volumeOpacity);

      candlestickPlot.refresh(g);
      console.log("Render: " + (Date.now() - startMillis));
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

function point(xScale, x) {
  return xScale(x) + xScale.rangeBand()/2;
}

function refresh(g, ac, x, y) {
  candleLineRect(g, ac, x, y);
//  candlePath(g, ac, x, y);
}

function candleLineRect(g, ac, x, y) {
  g.selectAll('rect.candle').attr({
    height: function(d) { return Math.max(Math.abs(y(ac.close()(d)) - y(ac.open()(d))), 1); },
    width: x.rangeBand(),
    x: function(d) { return x(ac.date()(d)); },
    y: function(d) { return y(Math.max(ac.close()(d), ac.open()(d))); }
  });

  g.selectAll('line.candle.top').attr({
    x1: function(d) { return point(x, ac.date()(d)); },
    x2: function(d) { return point(x, ac.date()(d)); },
    y1: function(d) { return y(ac.high()(d)); },
    y2: function(d) { return y(Math.max(ac.open()(d), ac.close()(d))); }
  });

  g.selectAll('line.candle.bottom').attr({
    x1: function(d) { return point(x, ac.date()(d)); },
    x2: function(d) { return point(x, ac.date()(d)); },
    y1: function(d) { return y(Math.min(ac.open()(d), ac.close()(d))); },
    y2: function(d) { return y(ac.low()(d)); }
  });
}

function candlePath(g, ac, x, y) {
  g.selectAll('path.candle.body').attr({ d: candleBodyPath(ac, x, y) });
  g.selectAll('path.candle.wick').attr({ d: candleWickPath(ac, x, y) });
}

function candleBodyPath(accessor, xScale, yScale) {
  return function(d) {
    var path = [],
        x = xScale(accessor.date()(d)),
        rangeBand = xScale.rangeBand();

    // Draw body only if there is a body
    path.push('M', x, yScale(accessor.open()(d)));
    path.push('l', rangeBand, 0);

    if(accessor.open()(d) != accessor.close()(d)) {
      path.push('L', x + rangeBand, yScale(accessor.close()(d)));
      path.push('l', -rangeBand, 0);
      path.push('L', x, yScale(accessor.open()(d)));
    }

    return path.join(' ');
  };
}

function candleWickPath(accessor, xScale, yScale) {
  return function(d) {
    var path = [],
      x = xScale(accessor.date()(d)),
      rangeBand = xScale.rangeBand(),
      xPoint = x + rangeBand/2;

    // Top
    path.push('M', xPoint, yScale(accessor.high()(d)));
    path.push('L', xPoint, yScale(Math.max(accessor.open()(d), accessor.close()(d))));

    // Draw another cross wick if there is no body
    if(accessor.open()(d) == accessor.close()(d)) {
      path.push('M', x, yScale(accessor.open()(d)));
      path.push('l', rangeBand, 0);
    }
    // Bottom
    path.push('M', xPoint, yScale(Math.min(accessor.open()(d), accessor.close()(d))));
    path.push('L', xPoint, yScale(accessor.low()(d)));

    return path.join(' ');
  };
}