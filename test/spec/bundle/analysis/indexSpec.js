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
    instanceBuilder.index('mocked', mockInit, function(scope) {
      it('Then analysis.supstance should be defined', function() {
        expect(scope.analysis.supstance).toBeDefined();
      });
    });
  });
});