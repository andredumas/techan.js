'use strict';

// TODO Could these be singletons? Generally will be accessing the same data and data structures at the same time
module.exports = function() {
  return {
    ichimoku: require('./ichimoku'),
    macd: require('./macd'),
    ohlc: require('./ohlc'),
    rsi: require('./rsi'),
    trendline: require('./trendline'),
    value: require('./value'),
    volume: require('./volume')
  };
};