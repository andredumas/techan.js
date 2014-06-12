techanModule('plot/rsi', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = rsi,
      mocks = {
        d3_scale_linear: function() {},
        d3_extent: function() {},
        techan_scale_financetime: function() {},
        techan_plot_plot: {}
      };

  var mockInit = function(module) {
    return module(mocks.d3_scale_linear, mocks.d3_extent,
      mocks.techan_scale_financetime, techan.accessor.rsi, mocks.techan_plot_plot);
  };

  var actualInit = function(module) {
    var linear = d3.scale.linear,
        extent = d3.extent,
        plot = require('../../../../src/plot/plot')(d3);

    return module(linear, extent, techan.scale.financetime, techan.accessor.rsi, plot);
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