techanModule('plot/momentum', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.plot.momentum;
  };

  specBuilder.require(techan.plot.momentum, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit);
  });
});