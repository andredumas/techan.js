techanModule('svg', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module(d3);
  };

  specBuilder.require(require('../../../../src/svg'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(bucket) {
      it('Then svg.arrow should be defined', function() {
        expect(bucket.svg.arrow).toBeDefined();
      });
    });
  });
});