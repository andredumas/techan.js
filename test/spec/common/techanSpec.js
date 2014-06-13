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

    it('Then techan.analysis should be defined', function () {
      expect(techan.analysis).toBeDefined();
    });

    it('Then techan.analysis.supstance should be defined', function () {
      expect(techan.analysis.supstance).toBeDefined();
    });

    it('Then techan.plot should be defined', function () {
      expect(techan.plot).toBeDefined();
    });

    it('Then techan.plot.candlestick should be defined', function () {
      expect(techan.plot.candlestick).toBeDefined();
    });

    it('Then techan.plot.candlestick can be constructed', function () {
      expect(techan.plot.candlestick()).toBeDefined();
    });

    it('Then techan.plot.close should be defined', function () {
      expect(techan.plot.close).toBeDefined();
    });

    it('Then techan.plot.close can be constructed', function () {
      expect(techan.plot.close()).toBeDefined();
    });

    it('Then techan.plot.macd should be defined', function () {
      expect(techan.plot.macd).toBeDefined();
    });

    it('Then techan.plot.macd can be constructed', function () {
      expect(techan.plot.macd()).toBeDefined();
    });

    it('Then techan.plot.movingaverage should be defined', function () {
      expect(techan.plot.movingaverage).toBeDefined();
    });

    it('Then techan.plot.movingaverage can be constructed', function () {
      expect(techan.plot.movingaverage()).toBeDefined();
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

    it('Then techan.plot.volume should be defined', function () {
      expect(techan.plot.volume).toBeDefined();
    });

    it('Then techan.plot.volume can be constructed', function () {
      expect(techan.plot.volume()).toBeDefined();
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