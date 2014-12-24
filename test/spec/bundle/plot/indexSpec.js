techanModule('plot', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module(d3);
  };

  specBuilder.require(require('../../../../src/plot'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(bucket) {
      it('Then plot.atr should be defined', function() {
        expect(bucket.plot.atr).toBeDefined();
      });

      it('Then plot.atrtrailingstop should be defined', function() {
        expect(bucket.plot.atrtrailingstop).toBeDefined();
      });

      it('Then plot.axisannotation should be defined', function() {
        expect(bucket.plot.axisannotation).toBeDefined();
      });

      it('Then plot.candlestick should be defined', function() {
        expect(bucket.plot.candlestick).toBeDefined();
      });

      it('Then plot.close should be defined', function() {
        expect(bucket.plot.close).toBeDefined();
      });

      it('Then plot.crosshair should be defined', function() {
        expect(bucket.plot.crosshair).toBeDefined();
      });

      it('Then plot.ema should be defined', function() {
        expect(bucket.plot.ema).toBeDefined();
      });

      it('Then plot.ichimoku should be defined', function() {
        expect(bucket.plot.ichimoku).toBeDefined();
      });

      it('Then plot.macd should be defined', function() {
        expect(bucket.plot.macd).toBeDefined();
      });

      it('Then plot.momentum should be defined', function() {
        expect(bucket.plot.momentum).toBeDefined();
      });

      it('Then plot.moneyflow should be defined', function() {
        expect(bucket.plot.moneyflow).toBeDefined();
      });

      it('Then plot.sma should be defined', function() {
        expect(bucket.plot.sma).toBeDefined();
      });

      it('Then plot.supstance should be defined', function() {
        expect(bucket.plot.supstance).toBeDefined();
      });

      it('Then plot.trendline should be defined', function() {
        expect(bucket.plot.trendline).toBeDefined();
      });

      it('Then plot.ohlc should be defined', function() {
        expect(bucket.plot.ohlc).toBeDefined();
      });

      it('Then plot.rsi should be defined', function() {
        expect(bucket.plot.rsi).toBeDefined();
      });

      it('Then plot.wilderma should be defined', function() {
        expect(bucket.plot.wilderma).toBeDefined();
      });

      it('Then plot.volume should be defined', function() {
        expect(bucket.plot.volume).toBeDefined();
      });
    });
  });
});