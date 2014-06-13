techanModule('plot/movingaverage', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = movingaverage;

  var actualInit = function() {
    return techan.plot.movingaverage;
  };

  specBuilder.require(require('../../../../src/plot/movingaverage'), function(instanceBuilder) {
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

        it('Then the plot mixin methods should be defined', function () {
          expect(movingaverage.xScale).toBeDefined();
          expect(movingaverage.yScale).toBeDefined();
          expect(movingaverage.accessor).toBeDefined();
        });
      });
    });
  });
});