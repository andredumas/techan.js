techanModule('plot/volume', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = ohlc.facebook.slice(0, 10),
      mocks = {
        techan_plot_plot: {},
        techan_plot_plotmixin: function() {}
      };

  var mockInit = function(module) {
    return module(techan.accessor.ohlc, mocks.techan_plot_plot, mocks.techan_plot_plotmixin);
  };

  var actualInit = function(module) {
    var plot = require('../../../../src/plot/plot')(d3),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    return module(techan.accessor.volume, plot, plotMixin);
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