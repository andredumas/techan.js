techanModule('plot/candlestick', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('../_fixtures/data/ohlc').alternating.array,
      invalidvolume = require('../_fixtures/data/ohlc').invalidvolume.array,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.candlestick;
  };

  specBuilder.require(require('../../../../src/plot/candlestick'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And candlestick is initialised with defaults', function () {
        var candlestick,
            g;

        plotShouldRenderWithoutError(scope, data, domFixtures);
        plotMixinShouldBeSetup(scope);

        beforeEach(function () {
          candlestick = scope.candlestick;
          candlestick.xScale().domain(data.map(function(d) { return d.date; }));
          g = domFixtures.g(data);
        });

        it('Then on default invoke, candlesticks should render up & down classes', function() {
          candlestick(g);
          expect(g[0][0].innerHTML).toContain('up');
          expect(g[0][0].innerHTML).toContain('down');
        });

        it('Then on refresh invoke, candlesticks should render up & down classes', function() {
          candlestick(g);
          candlestick.refresh(g);
          expect(g[0][0].innerHTML).toContain('up');
          expect(g[0][0].innerHTML).toContain('down');
        });
      });
    });
  });
});