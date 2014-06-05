techanModule('scale', function(specBuilder) {
  'use strict';

  var mockInit = function(module) {
    var mockD3 = {
      scale: {
        linear: function() {},
        ordinal: function() {}
      }
    };

    return module(mockD3);
  };

  specBuilder.require(require('../../../../src/scale'), function(instanceBuilder) {
    instanceBuilder.index('mocked', mockInit, function(bucket) {
      it('Then scale.financetime should be defined', function() {
        expect(bucket.scale.financetime).toBeDefined();
      });
    });
  });
});