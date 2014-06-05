techanModule('plot', function(specBuilder) {
  'use strict';

  var mockInit = function(module) {
    return module();
  };

  specBuilder.require(require('../../../../src/plot'), function(instanceBuilder) {
    instanceBuilder.index('mocked', mockInit, function(bucket) {
      it('Then plot.candlestick should be defined', function() {
        expect(bucket.plot.candlestick).toBeDefined();
      });
    });
  });
});