techanModule('plot/macd', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('../_fixtures/data/macd').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.macd;
  };

  specBuilder.require(require('../../../../src/plot/macd'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And macd is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures);
        plotMixinShouldBeSetup(scope);
      });
    });
  });
});