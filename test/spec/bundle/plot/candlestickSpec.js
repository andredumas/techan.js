techanModule('plot/candlestick', function(specBuilder) {
  'use strict';

  var mockInit = function(module) {
    return module();
  };
  specBuilder.require(require('../../../../src/plot/candlestick'), function(instanceBuilder) {
    instanceBuilder.instance('no', mockInit);
  });
});