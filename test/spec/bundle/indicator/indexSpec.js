techanModule('indicator', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module(d3);
  };

  specBuilder.require(require('../../../../src/indicator'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(scope) {
      it('Then indicator.atr should be defined', function() {
        expect(scope.indicator.atr).toBeDefined();
      });

      it('Then indicator.atrtrailingstop should be defined', function() {
        expect(scope.indicator.atrtrailingstop).toBeDefined();
      });

      it('Then indicator.ema should be defined', function() {
        expect(scope.indicator.ema).toBeDefined();
      });

      it('Then indicator.heikinashi should be defined', function() {
        expect(scope.indicator.heikinashi).toBeDefined();
      });

      it('Then indicator.ichimoku should be defined', function() {
        expect(scope.indicator.ichimoku).toBeDefined();
      });

      it('Then indicator.macd should be defined', function() {
        expect(scope.indicator.macd).toBeDefined();
      });

      it('Then indicator.rsi should be defined', function() {
        expect(scope.indicator.rsi).toBeDefined();
      });

      it('Then indicator.sma should be defined', function() {
        expect(scope.indicator.sma).toBeDefined();
      });

      it('Then indicator.wilderma should be defined', function() {
        expect(scope.indicator.wilderma).toBeDefined();
      });

      it('Then indicator.vwap should be defined', function() {
        expect(scope.indicator.vwap).toBeDefined();
      });
    });
  });
});
