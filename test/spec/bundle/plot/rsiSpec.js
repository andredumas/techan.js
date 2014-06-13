techanModule('plot/rsi', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = rsi;

  var actualInit = function() {
    return techan.plot.rsi;
  };

  specBuilder.require(require('../../../../src/plot/rsi'), function(instanceBuilder) {
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

        it('Then the plot mixin methods should be defined', function () {
          expect(rsi.xScale).toBeDefined();
          expect(rsi.yScale).toBeDefined();
          expect(rsi.accessor).toBeDefined();
        });
      });
    });
  });
});