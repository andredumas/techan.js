'use strict';

var scale = require('../scale'),
    accessor = require('../accessor'),
    plot = require('./plot');

module.exports = function(d3) {
  return {
    candlestick: require('./candlestick')(d3.scale.linear, d3.extent, scale.financetime, accessor.ohlc, plot)
  };
};