techanModule('plot/ema', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.plot.atr;
  };

  specBuilder.require(techan.plot.atr, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit);
  });
});