techanModule('plot/sma', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.plot.sma;
  };

  specBuilder.require(techan.plot.sma, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit);
  });
});