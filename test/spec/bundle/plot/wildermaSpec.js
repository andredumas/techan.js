techanModule('plot/wilderma', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.plot.wilderma;
  };

  specBuilder.require(techan.plot.wilderma, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit);
  });
});