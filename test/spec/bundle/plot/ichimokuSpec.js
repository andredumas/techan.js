techanModule('plot/ichimoku', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/ichimoku').plot,
      plot = require('../../../../src/plot/plot')(d3.svg.line),
      plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime),
      domFixtures = require('../_fixtures/dom');

  var actualInit = function(module) {
    return module(d3.svg.area, techan.accessor.ichimoku, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/ichimoku'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And ichimoku is initialised with defaults', function () {
        plotMixinShouldBeSetup(scope);
        plotShouldRenderWithoutError(scope, data, domFixtures);
      });
    });
  });
});