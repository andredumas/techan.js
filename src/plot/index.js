'use strict';

module.exports = function(d3) {
  var scale = require('../scale')(d3),
      accessor = require('../accessor')(),
      plot = require('./plot')();

  return {
    candlestick: require('./candlestick')(d3.scale.linear, d3.extent, scale.financetime, accessor.ohlc, plot),
    volume: require('./volume')(d3.scale.linear, d3.extent, scale.financetime, accessor.volume, plot)
  };
};