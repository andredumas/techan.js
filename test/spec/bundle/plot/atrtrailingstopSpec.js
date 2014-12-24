techanModule('plot/atrtrailingstop', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('../_fixtures/data/atrtrailingstop').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.atrtrailingstop;
  };

  specBuilder.require(require('../../../../src/plot/atrtrailingstop'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And atrtrailingstop is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures);
        plotMixinShouldBeSetup(scope);
      });
    });
  });
});