techanModule('plot/macd', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = macd,
    mocks = {
      d3_scale_linear: function() {},
      d3_extent: function() {},
      techan_scale_financetime: function() {},
      techan_plot_plot: {}
    };

  var mockInit = function(module) {
    return module(mocks.d3_scale_linear, mocks.d3_extent,
      mocks.techan_scale_financetime, techan.accessor.macd, mocks.techan_plot_plot);
  };

  var actualInit = function(module) {
    var linear = d3.scale.linear,
        extent = d3.extent,
        plot = require('../../../../src/plot/plot')(d3);

    return module(linear, extent, techan.scale.financetime, techan.accessor.macd, plot);
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