techanModule('plot/line', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = line,
      plot = require('../../../../src/plot/plot')(d3),
      plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

  var actualInit = function(module) {
    return module(techan.accessor.value, plot, plotMixin);
  };

  var actualZeroInit = function(module) {
    return module(techan.accessor.value, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/line'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And line is initialised with defaults', function () {
        var line,
            g;

        beforeEach(function () {
          line = scope.line;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, line should be rendered without error', function() {
          // TODO Assert the result/DOM
          line(g, data);
        });

        it('Then on refresh invoke, line should be refreshed only', function() {
          // TODO Assert the result/DOM
          line(g, data);
          line.refresh(g);
        });

        assertPlotMixin(scope);
      });
    });

    instanceBuilder.instance('actual', actualZeroInit, function(scope) {
      describe('And line is initialised with showZero true', function () {
        var line,
            g;

        beforeEach(function () {
          line = scope.line;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, line and zero line should be rendered without error', function() {
          // TODO Assert the result/DOM
          line(g, data);
        });

        it('Then on refresh invoke, line and zero line should be refreshed only', function() {
          // TODO Assert the result/DOM
          line(g, data);
          line.refresh(g);
        });

        assertPlotMixin(scope);
      });
    });

  });
});