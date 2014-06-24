techanModule('plot/ema', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.plot.ema;
  };

  specBuilder.require(techan.plot.ema, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit);
  });
});