techanModule('plot/candlestick', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = ohlc.facebook.slice(0, 10),
      mocks = {
        d3_scale_linear: function() {},
        d3_extent: function() {},
        techan_plot_plot: {},
        techan_plot_plotmixin: function() {}
      };

  var mockInit = function(module) {
    return module(mocks.d3_scale_linear, mocks.d3_extent,
      techan.accessor.ohlc, mocks.techan_plot_plot, mocks.techan_plot_plotmixin);
  };

  var actualInit = function(module) {
    var linear = d3.scale.linear,
        extent = d3.extent,
        plot = require('../../../../src/plot/plot')(d3),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    return module(linear, extent, techan.accessor.ohlc, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/candlestick'), function(instanceBuilder) {
    instanceBuilder.instance('mocked', mockInit);

    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And candlestick is initialised with defaults', function () {
        var candlestick,
            g;

        beforeEach(function () {
          candlestick = bucket.candlestick;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, candlesticks should be rendered without error', function() {
          // TODO Assert the result/DOM
          candlestick(g, data);
        });

        it('Then on refresh invoke, candlesticks should be refreshed only', function() {
          candlestick(g, data);
          // TODO Assert the result/DOM
          candlestick.refresh(g);
        });

        describe('And accessor is a new ohlc', function() {
          var accessor;

          beforeEach(function () {
            accessor = techan.accessor.ohlc();
            candlestick.accessor(accessor);
          });

          it('Then the accessor should equal the set', function () {
            expect(candlestick.accessor()).toEqual(accessor);
          });
        });
      });
    });
  });
});