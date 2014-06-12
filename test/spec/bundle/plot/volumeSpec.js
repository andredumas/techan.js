techanModule('plot/volume', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = ohlc.facebook.slice(0, 10),
      mocks = {
        d3_scale_linear: function() {},
        d3_extent: function() {},
        techan_scale_financetime: function() {},
        techan_plot_plot: {}
      };

  var mockInit = function(module) {
    return module(mocks.d3_scale_linear, mocks.d3_extent,
      mocks.techan_scale_financetime, techan.accessor.ohlc, mocks.techan_plot_plot);
  };

  var actualInit = function(module) {
    var linear = d3.scale.linear,
        extent = d3.extent,
        plot = require('../../../../src/plot/plot')(d3);

    return module(linear, extent, techan.scale.financetime, techan.accessor.volume, plot);
  };

  specBuilder.require(require('../../../../src/plot/volume'), function(instanceBuilder) {
    instanceBuilder.instance('mocked', mockInit);

    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And volume is initialised with defaults', function () {
        var volume,
            accessor,
            g;

        beforeEach(function () {
          volume = bucket.volume;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, volume should be rendered without error', function() {
          // TODO Assert the result/DOM
          volume(g, data);
        });

        xit('Then on default invoke, should not render up/down classes', function() {});

        it('Then on refresh invoke, volume should be refreshed only', function() {
          // TODO Assert the result/DOM
          volume(g, data);
          volume.refresh(g);
        });

        describe('And accessor is ohlc', function() {
          beforeEach(function() {
            accessor = techan.accessor.ohlc();
            volume.accessor(accessor);
          });

          it('Then the accessor should equal the set ohlc accessor', function () {
            expect(volume.accessor()).toEqual(accessor);
          });

          xit('Then on default invoke, up/down classes should be rendered', function() {});
        });
      });
    });
  });
});