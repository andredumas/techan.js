'use strict';

module.exports = function(d3) {
  var scale = require('../scale')(d3),
      accessor = require('../accessor')(),
      plot = require('./plot')(d3.svg.line, d3.select),
      plotMixin = require('./plotmixin')(d3.scale.linear, d3.functor, scale.financetime, plot.barWidth),
      line = require('./line'),
      axisannotation = require('./axisannotation')(d3.svg.axis, accessor.value, plot, plotMixin),
      svg = require('../svg')(d3);

  return {
    tradearrow: require('./tradearrow')(d3.select, d3.functor, d3.mouse, d3.dispatch, accessor.trade, plot, plotMixin, svg.arrow),
    atr: line(accessor.value, plot, plotMixin),
    atrtrailingstop: require('./atrtrailingstop')(accessor.atrtrailingstop, plot, plotMixin),
    axisannotation: axisannotation,
    candlestick: require('./candlestick')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    crosshair: require('./crosshair')(d3.select, d3_event, d3.mouse, d3.dispatch, plot, plotMixin),
    ema: line(accessor.value, plot, plotMixin),
    ichimoku: require('./ichimoku')(d3.svg.area, accessor.ichimoku, plot, plotMixin),
    ohlc: require('./ohlc')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    tick: require('./tick')(d3.scale.linear, d3.extent, accessor.tick, plot, plotMixin),
    close: line(accessor.ohlc, plot, plotMixin),
    volume: require('./volume')(accessor.volume, plot, plotMixin),
    rsi: require('./rsi')(accessor.rsi, plot, plotMixin),
    macd: require('./macd')(accessor.macd, plot, plotMixin),
    momentum: line(accessor.value, plot, plotMixin, true),
    moneyflow: line(accessor.value, plot, plotMixin, true),
    sma: line(accessor.value, plot, plotMixin),
    supstance: require('./supstance')(d3.behavior.drag, d3_event, d3.select, d3.dispatch, accessor.value, plot, plotMixin),
    trendline: require('./trendline')(d3.behavior.drag, d3_event, d3.select, d3.dispatch, accessor.trendline, plot, plotMixin),
    wilderma: line(accessor.value, plot, plotMixin),
    adx: require('./adx')(accessor.adx, plot, plotMixin),
    aroon: require('./aroon')(accessor.aroon, plot, plotMixin),
    stochastic: require('./stochastic')(accessor.stochastic, plot, plotMixin),
    williams: require('./williams')(accessor.williams, plot, plotMixin),
    bollinger: require('./bollinger')(accessor.bollinger, plot, plotMixin),
    vwap: line(accessor.value, plot, plotMixin)
  };
};

function d3_event() {
  return d3.event;
}
