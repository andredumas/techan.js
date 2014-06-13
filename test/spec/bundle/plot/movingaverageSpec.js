techanModule('plot/movingaverage', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = movingaverage,
    mocks = {
      techan_plot_plot: {},
      techan_plot_plotmixin: function() {}
    };

  var mockInit = function(module) {
    return module(techan.accessor.value, mocks.techan_plot_plot, mocks.techan_plot_plotmixin);
  };

  var actualInit = function(module) {
    var plot = require('../../../../src/plot/plot')(d3),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    return module(techan.accessor.value, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/movingaverage'), function(instanceBuilder) {
    instanceBuilder.instance('mocked', mockInit);

    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And movingaverage is initialised with defaults', function () {
        var movingaverage,
            accessor,
            g;

        beforeEach(function () {
          movingaverage = bucket.movingaverage;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, moving average should be rendered without error', function() {
          // TODO Assert the result/DOM
          movingaverage(g, data);
        });

        it('Then on refresh invoke, moving average should be refreshed only', function() {
          // TODO Assert the result/DOM
          movingaverage(g, data);
          movingaverage.refresh(g);
        });

        it('Then the accessor should equal a newly set moving average accessor', function () {
          accessor = techan.accessor.value();
          movingaverage.accessor(accessor);

          expect(movingaverage.accessor()).toEqual(accessor);
        });
      });
    });
  });
});