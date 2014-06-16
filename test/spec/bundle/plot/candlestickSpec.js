techanModule('plot/candlestick', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('../_fixtures/data/ohlc').alternating.array,
      domFixtures = require('../_fixtures/dom');

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
          g = domFixtures.g(data);
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