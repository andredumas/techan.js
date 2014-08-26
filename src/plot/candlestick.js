'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        volumeOpacity = false;

    function candlestick(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity, p.accessor.d);

      // Two path's as wick and body can be styled slightly differently (stroke and fills)
      group.entry.append('path').attr('class', 'candle body').classed(plot.classedUpDown(p.accessor));
      group.entry.append('path').attr('class', 'candle wick').classed(plot.classedUpDown(p.accessor));

      candlestick.refresh(g);
    }

    candlestick.refresh = function(g) {
      if(volumeOpacity) opacity(g, d3_scale_linear, d3_extent, p.accessor.v);
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    candlestick.volumeOpacity = function(_) {
      if (!arguments.length) return volumeOpacity;
      volumeOpacity = _;
      return candlestick;
    };

    // Mixin 'superclass' methods and variables
    plotMixin(candlestick, p, accessor_ohlc());

    return candlestick;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.candle.body').attr('d', bodyPath(accessor, x, y));
  g.selectAll('path.candle.wick').attr('d', wickPath(accessor, x, y));
}

function bodyPath(accessor, x, y) {
  return function(d) {
    var path = [],
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.band(),
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

function wickPath(accessor, x, y) {
  return function(d) {
    var path = [],
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.band(),
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

function opacity(g, d3_scale_linear, d3_extent, accessor_volume) {
  var selection = g.selectAll('g.data'),
      volumeOpacityScale = d3_scale_linear()
        .domain(d3_extent(selection.data().map(accessor_volume).filter(function(d) { return !isNaN(d); })))
        .range([0.2, 1]);

  selection.selectAll('path.candle').style('opacity', function(d) {
    var volume = accessor_volume(d);
    return isNaN(volume) ? null : volumeOpacityScale(volume);
  });
}