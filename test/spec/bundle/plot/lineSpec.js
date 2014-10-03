techanModule('plot/line', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/line'),
      plot = require('../../../../src/plot/plot')(d3.svg.line),
      plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime),
      domFixtures = require('../_fixtures/dom');

  var actualInit = function(module) {
    return module(techan.accessor.value, plot, plotMixin);
  };

  var actualZeroInit = function(module) {
    return module(techan.accessor.value, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/line'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And line is initialised with defaults', function () {
        plotMixinShouldBeSetup(scope);
        plotShouldRenderWithoutError(scope, data, domFixtures);
      });
    });

    instanceBuilder.instance('actual', actualZeroInit, function(scope) {
      describe('And line is initialised with showZero true', function () {
        plotMixinShouldBeSetup(scope);
        plotShouldRenderWithoutError(scope, data, domFixtures);
      });
    });

  });
});