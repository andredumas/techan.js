techanModule('plot/ohlc', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/ohlc').alternating.array,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.ohlc;
  };

  specBuilder.require(require('../../../../src/plot/ohlc'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And ohlc is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 3);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          describe('And on obtaining the data element', function() {
            it('Then contains an up', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path class="ohlc up" d="M -0.32894736842105265 1 l 0.5 0 M 0.17105263157894737 1.5 L 0.17105263157894737 0.5 M 0.17105263157894737 1.1 l 0.5 0" style="stroke-width: 0.5px;"></path>');
            });

            it('Then contains an down', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<path class="ohlc down" d="M 0 1.1 l 0.5 0 M 0.5 1.5 L 0.5 0.5 M 0.5 1 l 0.5 0" style="stroke-width: 0.5px;"></path>');
            });

            it('Then contains an equal', function() {
              expect(childElements[2].outerHTML)
                .toEqual('<path class="ohlc equal" d="M 0.32894736842105265 1 l 0.5 0 M 0.8289473684210527 1.5 L 0.8289473684210527 0.5 M 0.8289473684210527 1 l 0.5 0" style="stroke-width: 0.5px;"></path>');
            });
          });
        }
      });
    });
  });
});