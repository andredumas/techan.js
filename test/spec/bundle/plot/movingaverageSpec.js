techanModule('plot/movingaverage', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.plot.movingaverage;
  };

  specBuilder.require(techan.plot.movingaverage, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit);
  });
});