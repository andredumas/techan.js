techanModule('plot/rsi', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/rsi').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.rsi;
  };

  specBuilder.require(require('../../../../src/plot/rsi'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And rsi is initialised with defaults', function () {
        describe('And there is data to be plotted', function() {
          plotShouldRenderWithoutError(scope, data, domFixtures);
          plotMixinShouldBeSetup(scope);
        });

        describe('And there is no data to be plotted', function () {
          plotShouldRenderWithoutError(scope, [], domFixtures);
          plotMixinShouldBeSetup(scope);
        });

        describe('And there is 1 data point to be plotted', function () {
          plotShouldRenderWithoutError(scope, data.slice(0, 1), domFixtures);
          plotMixinShouldBeSetup(scope);
        });
      });
    });
  });
});