techanModule('plot/rsi', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = rsi,
      mocks = {
        techan_plot_plot: {},
        techan_plot_plotmixin: function() {}
      };

  var mockInit = function(module) {
    return module(techan.accessor.rsi, mocks.techan_plot_plot, mocks.techan_plot_plotmixin);
  };

  var actualInit = function(module) {
    var plot = require('../../../../src/plot/plot')(d3),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    return module(techan.accessor.rsi, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/rsi'), function(instanceBuilder) {
    instanceBuilder.instance('mocked', mockInit);

    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And rsi is initialised with defaults', function () {
        var rsi,
            accessor,
            g;

        beforeEach(function () {
          rsi = bucket.rsi;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, rsi should be rendered without error', function() {
          // TODO Assert the result/DOM
          rsi(g, data);
        });

        it('Then on refresh invoke, rsi should be refreshed only', function() {
          // TODO Assert the result/DOM
          rsi(g, data);
          rsi.refresh(g);
        });

        it('Then the accessor should equal a newly set rsi accessor', function () {
          accessor = techan.accessor.rsi();
          rsi.accessor(accessor);

          expect(rsi.accessor()).toEqual(accessor);
        });
      });
    });
  });
});