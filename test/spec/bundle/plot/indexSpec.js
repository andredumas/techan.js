techanModule('plot', function(specBuilder) {
  'use strict';

  var mockInit = function(module) {
    var mockD3 = {
      extent: function() {},
      scale: {
        linear: function() {}
      }
    };

    return module(mockD3);
  };

  specBuilder.require(require('../../../../src/plot'), function(instanceBuilder) {
    instanceBuilder.index('mocked', mockInit, function(bucket) {
      it('Then plot.candlestick should be defined', function() {
        expect(bucket.plot.candlestick).toBeDefined();
      });
    });
  });
});