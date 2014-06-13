techanModule('accessor', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module();
  };

  specBuilder.require(require('../../../../src/accessor'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(bucket) {
      it('Then accessor.macd should be defined', function() {
        expect(bucket.accessor.macd).toBeDefined();
      });

      it('Then accessor.ohlc should be defined', function() {
        expect(bucket.accessor.ohlc).toBeDefined();
      });

      it('Then accessor.rsi should be defined', function() {
        expect(bucket.accessor.rsi).toBeDefined();
      });

      it('Then accessor.value should be defined', function() {
        expect(bucket.accessor.value).toBeDefined();
      });

      it('Then accessor.volume should be defined', function() {
        expect(bucket.accessor.volume).toBeDefined();
      });
    });
  });
});