'use strict';

module.exports = function() {
  var indicatorMixin = require('./indicatormixin')(),
      accessor = require('../accessor')(),
      ema = require('./ema')(indicatorMixin, accessor.ohlc);

  return {
    ema: ema,
    macd: require('./macd')(indicatorMixin, accessor.ohlc, ema),
    rsi: require('./rsi')(indicatorMixin, accessor.ohlc, ema),
    sma: require('./sma')(indicatorMixin, accessor.ohlc)
  };
};