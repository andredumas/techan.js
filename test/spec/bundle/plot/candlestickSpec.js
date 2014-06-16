techanModule('plot/candlestick', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = ohlc.alternating.array;

  var actualInit = function() {
    return techan.plot.candlestick;
  };

  specBuilder.require(require('../../../../src/plot/candlestick'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And candlestick is initialised with defaults', function () {
        var candlestick,
            g;

        beforeEach(function () {
          candlestick = scope.candlestick;
          g = gFixture(data);
        });

        it('Then on default invoke, candlesticks should be rendered without error', function() {
          // TODO Assert the result/DOM
          candlestick(g);
        });

        it('Then on refresh invoke, candlesticks should be refreshed only', function() {
          candlestick(g);
          // TODO Assert the result/DOM
          candlestick.refresh(g);
        });

        assertPlotMixin(scope);
      });
    });
  });
});