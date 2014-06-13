'use strict';

// TODO Could these be singletons? Generally will be accessing the same data and data structures at the same time
module.exports = function() {
  return {
    ohlc: require('./ohlc'),
    volume: require('./volume'),
    macd: require('./macd'),
    rsi: require('./rsi'),
    value: require('./value')
  };
};