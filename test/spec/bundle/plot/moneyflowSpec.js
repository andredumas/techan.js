techanModule('plot/moneyflow', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.plot.moneyflow;
  };

  specBuilder.require(techan.plot.moneyflow, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit);
  });
});