techanModule('scale', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module(d3);
  };

  specBuilder.require(require('../../../../src/scale'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(bucket) {
      it('Then scale.financetime should be defined', function() {
        expect(bucket.scale.financetime).toBeDefined();
      });

      it('Then scale.plot.percent should be defined', function() {
        expect(bucket.scale.plot.percent).toBeDefined();
      });

      it('Then scale.plot.ohlc should be defined', function() {
        expect(bucket.scale.plot.ohlc).toBeDefined();
      });

      it('Then scale.plot.volume should be defined', function() {
        expect(bucket.scale.plot.volume).toBeDefined();
      });

      it('Then scale.plot.rsi should be defined', function() {
        expect(bucket.scale.plot.rsi).toBeDefined();
      });

      it('Then scale.plot.path should be defined', function() {
        expect(bucket.scale.plot.path).toBeDefined();
      });

      it('Then scale.plot.momentum should be defined', function() {
        expect(bucket.scale.plot.momentum).toBeDefined();
      });

      it('Then scale.plot.moneyflow should be defined', function() {
        expect(bucket.scale.plot.moneyflow).toBeDefined();
      });

      it('Then scale.plot.macd should be defined', function() {
        expect(bucket.scale.plot.macd).toBeDefined();
      });

      it('Then scale.plot.movingaverage should be defined', function() {
        expect(bucket.scale.plot.movingaverage).toBeDefined();
      });
    });
  });
});