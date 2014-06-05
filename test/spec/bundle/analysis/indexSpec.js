techanModule('analysis', function(specBuilder) {
  'use strict';

  var mockInit = function(module) {
    var mockD3 = {
      scale: {
        linear: function() {}
      }
    };

    return module(mockD3);
  };

  specBuilder.require(require('../../../../src/analysis'), function(instanceBuilder) {
    instanceBuilder.index('mocked', mockInit, function(bucket) {
      it('Then analysis.supstance should be defined', function() {
        expect(bucket.analysis.supstance).toBeDefined();
      });
    });
  });
});