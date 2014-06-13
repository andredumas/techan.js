'use strict';

module.exports = function(d3) {
  var scale = require('../scale')(d3),
      accessor = require('../accessor')(),
      plot = require('./plot')(d3),
      plotMixin = require('./plotmixin')(d3.scale.linear, scale.financetime),
      line = require('./line');

  return {
    candlestick: require('./candlestick')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    ohlc: require('./ohlc')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    close: line(accessor.ohlc, plot, plotMixin, 'close'),
    volume: require('./volume')(accessor.volume, plot, plotMixin),
    rsi: require('./rsi')(accessor.rsi, plot, plotMixin),
    macd: require('./macd')(accessor.macd, plot, plotMixin),
    movingaverage: line(accessor.value, plot, plotMixin, 'movingaverage')
  };
};