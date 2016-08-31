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
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 6);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          describe('And on obtaining the data element', function() {
            it('Then contains an up body', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path class="candle body up" d="M -0.32894736842105265 1 l 1 0 L 0.6710526315789473 1.1 l -1 0 L -0.32894736842105265 1"></path>');
            });

            it('Then contains an down body', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<path class="candle body down" d="M 0 1.1 l 1 0 L 1 1 l -1 0 L 0 1.1"></path>');
            });

            it('Then contains an equal body', function() {
              expect(childElements[2].outerHTML)
                .toEqual('<path class="candle body equal" d="M 0.32894736842105265 1 l 1 0"></path>');
            });

            it('Then contains an up wick', function() {
              expect(childElements[3].outerHTML)
                .toEqual('<path class="candle wick up" d="M 0.17105263157894737 1.5 L 0.17105263157894737 1 M 0.17105263157894737 1.1 L 0.17105263157894737 0.5" style="stroke-width: 0.25px;"></path>');
            });

            it('Then contains an down wick', function() {
              expect(childElements[4].outerHTML)
                .toEqual('<path class="candle wick down" d="M 0.5 1.5 L 0.5 1 M 0.5 1.1 L 0.5 0.5" style="stroke-width: 0.25px;"></path>');
            });

            it('Then contains an equal wick', function() {
              expect(childElements[5].outerHTML)
                .toEqual('<path class="candle wick equal" d="M 0.8289473684210527 1.5 L 0.8289473684210527 1 M 0.32894736842105265 1 l 1 0 M 0.8289473684210527 1 L 0.8289473684210527 0.5" style="stroke-width: 0.25px;"></path>');
            });
          });
        }
      });
    });
  });
});