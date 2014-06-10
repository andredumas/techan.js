techanModule('accessor', function(specBuilder) {
  'use strict';

  var mockInit = function(module) {
    return module();
  };

  specBuilder.require(require('../../../../src/accessor'), function(instanceBuilder) {
    instanceBuilder.index('mocked', mockInit, function(bucket) {
      it('Then accessor.ohlc should be defined', function() {
        expect(bucket.accessor.ohlc).toBeDefined();
      });

      it('Then accessor.volume should be defined', function() {
        expect(bucket.accessor.volume).toBeDefined();
      });
    });
  });
});