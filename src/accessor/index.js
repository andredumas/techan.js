'use strict';

// Provide IDs for all accessors. Default to date, but at least provide an option
module.exports = function() {
  return {
    atrtrailingstop: require('./atrtrailingstop'),
    crosshair: require('./crosshair'),
    ichimoku: require('./ichimoku'),
    macd: require('./macd'),
    ohlc: require('./ohlc'),
    rsi: require('./rsi'),
    trendline: require('./trendline'),
    value: require('./value'),
    volume: require('./volume'),
    tick: require('./tick'),
    trade: require('./trade'),
    adx: require('./adx'),
    aroon: require('./aroon'),
    stochastic: require('./stochastic'),
    supstance: require('./supstance'),
    williams: require('./williams'),
    bollinger: require('./bollinger')
  };
};
