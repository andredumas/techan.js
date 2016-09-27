techanModule('plot/line', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/line'),
      plot = require('../../../../src/plot/plot')(d3.line, d3.area, d3.curveMonotoneX),
      plotMixin = require('../../../../src/plot/plotmixin')(d3.scaleLinear, require('../../../../src/util')().functor, techan.scale.financetime, plot.dataSelector),
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
        describe('And there is data to be plotted', function() {
          plotMixinShouldBeSetup(scope);
          plotShouldRenderWithoutError(scope, data, domFixtures);
        });

        describe('And there is no data to be plotted', function () {
          plotMixinShouldBeSetup(scope);
          plotShouldRenderWithoutError(scope, [], domFixtures);
        });

        describe('And there is 1 data point to be plotted', function () {
          plotMixinShouldBeSetup(scope);
          plotShouldRenderWithoutError(scope, data.slice(0, 1), domFixtures);
        });
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