techanModule('plot/candlestick', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = ohlc.facebook.slice(0, 2);

  var actualInit = function() {
    return techan.plot.candlestick;
  };

  specBuilder.require(require('../../../../src/plot/candlestick'), function(instanceBuilder) {
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

        it('Then the plot mixin methods should be defined', function () {
          expect(candlestick.xScale).toBeDefined();
          expect(candlestick.yScale).toBeDefined();
          expect(candlestick.accessor).toBeDefined();
        });
      });
    });
  });
});