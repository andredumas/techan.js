techanModule('plot/macd', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = macd,
    mocks = {
      techan_plot_plot: {},
      techan_plot_plotmixin: function() {}
    };

  var mockInit = function(module) {
    return module(techan.accessor.macd, mocks.techan_plot_plot, mocks.techan_plot_plotmixin);
  };

  var actualInit = function(module) {
    var plot = require('../../../../src/plot/plot')(d3),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    return module(techan.accessor.macd, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/macd'), function(instanceBuilder) {
    instanceBuilder.instance('mocked', mockInit);

    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And macd is initialised with defaults', function () {
        var macd,
            accessor,
            g;

        beforeEach(function () {
          macd = bucket.macd;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, macd should be rendered without error', function() {
          // TODO Assert the result/DOM
          macd(g, data);
        });

        it('Then on refresh invoke, macd should be refreshed only', function() {
          // TODO Assert the result/DOM
          macd(g, data);
          macd.refresh(g);
        });

        it('Then the accessor should equal a newly set macd accessor', function () {
          accessor = techan.accessor.macd();
          macd.accessor(accessor);

          expect(macd.accessor()).toEqual(accessor);
        });
      });
    });
  });
});