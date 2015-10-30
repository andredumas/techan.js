techanModule('plot/tick', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/tick').data,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.tick;
  };

  specBuilder.require(require('../../../../src/plot/tick'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And tick is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures);
        plotMixinShouldBeSetup(scope);
      });
    });
  });
});