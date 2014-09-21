function techanSpec(techan) {
  'use strict';

  return function() {
    it('Then techan should be defined', function () {
      expect(techan).toBeDefined();
    });

    it('Then techan.version should be defined', function () {
      expect(techan.version).toBeDefined();
    });

    it('Then techan.accessor should be defined', function () {
      expect(techan.accessor).toBeDefined();
    });

    it('Then techan.accessor.ohlc should be defined', function () {
      expect(techan.accessor.ohlc).toBeDefined();
    });

    it('Then techan.accessor.ohlc can be constructed', function () {
      expect(techan.accessor.ohlc()).toBeDefined();
    });

    it('Then techan.accessor.macd should be defined', function () {
      expect(techan.accessor.macd).toBeDefined();
    });

    it('Then techan.accessor.macd can be constructed', function () {
      expect(techan.accessor.macd()).toBeDefined();
    });

    it('Then techan.accessor.rsi should be defined', function () {
      expect(techan.accessor.rsi).toBeDefined();
    });

    it('Then techan.accessor.rsi can be constructed', function () {
      expect(techan.accessor.rsi()).toBeDefined();
    });

    it('Then techan.accessor.volume should be defined', function () {
      expect(techan.accessor.volume).toBeDefined();
    });

    it('Then techan.accessor.volume can be constructed', function () {
      expect(techan.accessor.volume()).toBeDefined();
    });

    it('Then techan.indicator should be defined', function () {
      expect(techan.indicator).toBeDefined();
    });

    it('Then techan.indicator.ema should be defined', function () {
      expect(techan.indicator.ema).toBeDefined();
    });

    it('Then techan.indicator.ema can be constructed', function () {
      expect(techan.indicator.ema()).toBeDefined();
    });

    it('Then techan.indicator.macd should be defined', function () {
      expect(techan.indicator.macd).toBeDefined();
    });

    it('Then techan.indicator.macd can be constructed', function () {
      expect(techan.indicator.macd()).toBeDefined();
    });

    it('Then techan.indicator.rsi should be defined', function () {
      expect(techan.indicator.rsi).toBeDefined();
    });

    it('Then techan.indicator.rsi can be constructed', function () {
      expect(techan.indicator.rsi()).toBeDefined();
    });

    it('Then techan.indicator.sma should be defined', function () {
      expect(techan.indicator.sma).toBeDefined();
    });

    it('Then techan.indicator.sma can be constructed', function () {
      expect(techan.indicator.sma()).toBeDefined();
    });

    it('Then techan.indicator.wilderma should be defined', function () {
      expect(techan.indicator.wilderma).toBeDefined();
    });

    it('Then techan.indicator.wilderma can be constructed', function () {
      expect(techan.indicator.wilderma()).toBeDefined();
    });

    it('Then techan.plot should be defined', function () {
      expect(techan.plot).toBeDefined();
    });

    it('Then techan.plot.axisannotation should be defined', function () {
      expect(techan.plot.axisannotation).toBeDefined();
    });

    it('Then techan.plot.axisannotation can be constructed', function () {
      expect(techan.plot.axisannotation()).toBeDefined();
    });

    it('Then techan.plot.candlestick should be defined', function () {
      expect(techan.plot.candlestick).toBeDefined();
    });

    it('Then techan.plot.candlestick can be constructed', function () {
      expect(techan.plot.candlestick()).toBeDefined();
    });

    it('Then techan.plot.crosshair should be defined', function () {
      expect(techan.plot.crosshair).toBeDefined();
    });

    it('Then techan.plot.crosshair can be constructed', function () {
      expect(techan.plot.crosshair()).toBeDefined();
    });

    it('Then techan.plot.close should be defined', function () {
      expect(techan.plot.close).toBeDefined();
    });

    it('Then techan.plot.close can be constructed', function () {
      expect(techan.plot.close()).toBeDefined();
    });

    it('Then techan.plot.ema should be defined', function () {
      expect(techan.plot.ema).toBeDefined();
    });

    it('Then techan.plot.ema can be constructed', function () {
      expect(techan.plot.ema()).toBeDefined();
    });

    it('Then techan.plot.macd should be defined', function () {
      expect(techan.plot.macd).toBeDefined();
    });

    it('Then techan.plot.macd can be constructed', function () {
      expect(techan.plot.macd()).toBeDefined();
    });

    it('Then techan.plot.momentum should be defined', function () {
      expect(techan.plot.momentum).toBeDefined();
    });

    it('Then techan.plot.momentum can be constructed', function () {
      expect(techan.plot.momentum()).toBeDefined();
    });

    it('Then techan.plot.moneyflow should be defined', function () {
      expect(techan.plot.moneyflow).toBeDefined();
    });

    it('Then techan.plot.moneyflow can be constructed', function () {
      expect(techan.plot.moneyflow()).toBeDefined();
    });

    it('Then techan.plot.sma should be defined', function () {
      expect(techan.plot.sma).toBeDefined();
    });

    it('Then techan.plot.sma can be constructed', function () {
      expect(techan.plot.sma()).toBeDefined();
    });

    it('Then techan.plot.ohlc should be defined', function () {
      expect(techan.plot.ohlc).toBeDefined();
    });

    it('Then techan.plot.ohlc can be constructed', function () {
      expect(techan.plot.ohlc()).toBeDefined();
    });

    it('Then techan.plot.rsi should be defined', function () {
      expect(techan.plot.rsi).toBeDefined();
    });

    it('Then techan.plot.rsi can be constructed', function () {
      expect(techan.plot.rsi()).toBeDefined();
    });

    it('Then techan.plot.supstance should be defined', function () {
      expect(techan.plot.supstance).toBeDefined();
    });

    it('Then techan.plot.supstance can be constructed', function () {
      expect(techan.plot.supstance()).toBeDefined();
    });

    it('Then techan.plot.trendline should be defined', function () {
      expect(techan.plot.trendline).toBeDefined();
    });

    it('Then techan.plot.trendline can be constructed', function () {
      expect(techan.plot.trendline()).toBeDefined();
    });

    it('Then techan.plot.volume should be defined', function () {
      expect(techan.plot.volume).toBeDefined();
    });

    it('Then techan.plot.volume can be constructed', function () {
      expect(techan.plot.volume()).toBeDefined();
    });

    it('Then techan.plot.wilderma should be defined', function () {
      expect(techan.plot.wilderma).toBeDefined();
    });

    it('Then techan.plot.wilderma can be constructed', function () {
      expect(techan.plot.wilderma()).toBeDefined();
    });

    it('Then techan.scale should be defined', function () {
      expect(techan.scale).toBeDefined();
    });

    it('Then techan.scale.financetime should be defined', function () {
      expect(techan.scale.financetime).toBeDefined();
    });

    it('Then techan.scale.financetime can be constructed', function () {
      expect(techan.scale.financetime()).toBeDefined();
    });

    it('Then techan.undefinedControl should be undefined', function() {
      expect(techan.undefinedControl).not.toBeDefined();
    });
  };
}