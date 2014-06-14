techanModule('plot', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module(d3);
  };

  specBuilder.require(require('../../../../src/plot'), function(instanceBuilder) {
    instanceBuilder.index('mocked', actualInit, function(bucket) {
      it('Then plot.candlestick should be defined', function() {
        expect(bucket.plot.candlestick).toBeDefined();
      });

      it('Then plot.close should be defined', function() {
        expect(bucket.plot.close).toBeDefined();
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

      it('Then plot.movingaverage should be defined', function() {
        expect(bucket.plot.movingaverage).toBeDefined();
      });

      it('Then plot.ohlc should be defined', function() {
        expect(bucket.plot.ohlc).toBeDefined();
      });

      it('Then plot.rsi should be defined', function() {
        expect(bucket.plot.rsi).toBeDefined();
      });

      it('Then plot.volume should be defined', function() {
        expect(bucket.plot.volume).toBeDefined();
      });
    });
  });
});