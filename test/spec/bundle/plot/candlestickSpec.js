techanModule('plot/candlestick', function(specBuilder) {
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
  specBuilder.require(require('../../../../src/plot/candlestick'), function(instanceBuilder) {
    //instanceBuilder.instance('no', mockInit);
  });
});