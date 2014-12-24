'use strict';

// TODO Could these be singletons? Generally will be accessing the same data and data structures at the same time
// TODO Provide IDs for all accessors. Default to date, but at least provide an option
module.exports = function() {
  return {
    atrtrailingstop: require('./atrtrailingstop'),
    ichimoku: require('./ichimoku'),
    macd: require('./macd'),
    ohlc: require('./ohlc'),
    rsi: require('./rsi'),
    trendline: require('./trendline'),
    value: require('./value'),
    volume: require('./volume')
  };
};