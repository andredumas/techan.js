techanModule('indicator', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module();
  };

  specBuilder.require(require('../../../../src/indicator'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(scope) {
      it('Then indicator.ema should be defined', function() {
        expect(scope.indicator.ema).toBeDefined();
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
    });
  });
});