'use strict';

module.exports = function(d3) {
  var scale = require('../scale')(d3),
      accessor = require('../accessor')(),
      plot = require('./plot')(d3.line, d3.area, d3.curveMonotoneX, d3.select),
      d3_functor = require('../util')().functor,
      plotMixin = require('./plotmixin')(d3.scaleLinear, d3_functor, scale.financetime, plot.dataSelector, plot.barWidth),
      candlestick = require('./candlestick')(d3.scaleLinear, d3.extent, accessor.ohlc, plot, plotMixin),
      line = require('./line'),
      axisannotation = require('./axisannotation')(d3.axisTop, d3.scaleLinear, accessor.value, plot, plotMixin),
      svg = require('../svg')(d3);

  return {
    adx: require('./adx')(accessor.adx, plot, plotMixin),
    aroon: require('./aroon')(accessor.aroon, plot, plotMixin),
    atr: line(accessor.value, plot, plotMixin),
    atrtrailingstop: require('./atrtrailingstop')(accessor.atrtrailingstop, plot, plotMixin),
    axisannotation: axisannotation,
    bollinger: require('./bollinger')(accessor.bollinger, plot, plotMixin),
    candlestick: candlestick,
    close: line(accessor.ohlc, plot, plotMixin),
    crosshair: require('./crosshair')(d3.select, d3_event, d3.mouse, d3.dispatch, accessor.crosshair, plot, plotMixin),
    ema: line(accessor.value, plot, plotMixin),
    heikinashi: candlestick,
    ichimoku: require('./ichimoku')(d3.area, d3.curveMonotoneX, accessor.ichimoku, plot, plotMixin),
    macd: require('./macd')(accessor.macd, plot, plotMixin),
    momentum: line(accessor.value, plot, plotMixin, true),
    moneyflow: line(accessor.value, plot, plotMixin, true),
    ohlc: require('./ohlc')(d3.scaleLinear, d3.extent, accessor.ohlc, plot, plotMixin),
    roc: line(accessor.value, plot, plotMixin, true),
    rsi: require('./rsi')(accessor.rsi, plot, plotMixin),
    sma: line(accessor.value, plot, plotMixin),
    sroc: line(accessor.value, plot, plotMixin, true),
    stochastic: require('./stochastic')(accessor.stochastic, plot, plotMixin),
    supstance: require('./supstance')(d3.drag, d3_event, d3.select, d3.dispatch, accessor.supstance, plot, plotMixin),
    tick: require('./tick')(d3.scaleLinear, d3.extent, accessor.tick, plot, plotMixin),
    tradearrow: require('./tradearrow')(d3.select, d3_functor, d3.mouse, d3.dispatch, accessor.trade, plot, plotMixin, svg.arrow),
    trendline: require('./trendline')(d3.drag, d3_event, d3.select, d3.dispatch, accessor.trendline, plot, plotMixin),
    volume: require('./volume')(accessor.volume, plot, plotMixin),
    vwap: line(accessor.value, plot, plotMixin),
    wilderma: line(accessor.value, plot, plotMixin),
    williams: require('./williams')(accessor.williams, plot, plotMixin)
  };
};

function d3_event() {
  return d3.event;
}
