techanModule('plot/vwap', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.plot.vwap;
  };

  specBuilder.require(techan.plot.vwap, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit);
  });
});
