techanModule('plot/ohlc', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/ohlc').alternating.array,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.ohlc;
  };

  specBuilder.require(require('../../../../src/plot/ohlc'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And ohlc is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures);
        plotMixinShouldBeSetup(scope);
      });
    });
  });
});