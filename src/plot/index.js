'use strict';

module.exports = function(d3) {
  var scale = require('../scale')(d3),
      accessor = require('../accessor')(),
      plot = require('./plot')(d3),
      plotMixin = require('./plotmixin')(d3.scale.linear, scale.financetime),
      line = require('./line');

  return {
    candlestick: require('./candlestick')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    ema: line(accessor.value, plot, plotMixin),
    ohlc: require('./ohlc')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    close: line(accessor.ohlc, plot, plotMixin),
    volume: require('./volume')(accessor.volume, plot, plotMixin),
    rsi: require('./rsi')(accessor.rsi, plot, plotMixin),
    macd: require('./macd')(accessor.macd, plot, plotMixin),
    momentum: line(accessor.value, plot, plotMixin, true),
    moneyflow: line(accessor.value, plot, plotMixin, true),
    sma: line(accessor.value, plot, plotMixin),
    trendline: require('./trendline')(accessor.trendline, plot, plotMixin)
  };
};