'use strict';

module.exports = function(d3) {
  var scale = require('../scale')(d3),
      accessor = require('../accessor')(),
      plot = require('./plot')(d3),
      plotMixin = require('./plotmixin')(d3.scale.linear, scale.financetime),
      line = require('./line'),
      axisannotation = require('./axisannotation')(d3.svg.axis, plot);

  return {
    axisannotation: axisannotation,
    candlestick: require('./candlestick')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    crosshair: require('./crosshair')(d3.select, d3_event, d3.mouse, axisannotation),
    ema: line(accessor.value, plot, plotMixin),
    ohlc: require('./ohlc')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    close: line(accessor.ohlc, plot, plotMixin),
    volume: require('./volume')(accessor.volume, plot, plotMixin),
    rsi: require('./rsi')(accessor.rsi, plot, plotMixin),
    macd: require('./macd')(accessor.macd, plot, plotMixin),
    momentum: line(accessor.value, plot, plotMixin, true),
    moneyflow: line(accessor.value, plot, plotMixin, true),
    sma: line(accessor.value, plot, plotMixin),
    supstance: require('./supstance')(d3.behavior.drag, d3_event, d3.select, accessor.value, plot, plotMixin),
    trendline: require('./trendline')(d3.behavior.drag, d3_event, d3.select, accessor.trendline, plot, plotMixin)
  };
};

function d3_event() {
  return d3.event;
}