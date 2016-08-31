techanModule('plot/tick', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/tick').data,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.tick;
  };

  specBuilder.require(require('../../../../src/plot/tick'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And tick is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 1);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          describe('And on obtaining the data element', function() {
            it('Then contains a tick', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path class="tick" d="M -0.32894736842105265 0.72235 l 1 0 M 0.17105263157894737 0.72235 L 0.17105263157894737 0.72219 M -0.32894736842105265 0.72219 l 1 0 M 0 0.72232 l 1 0 M 0.5 0.72232 L 0.5 0.72215 M 0 0.72215 l 1 0 M 0.32894736842105265 0.72228 l 1 0 M 0.8289473684210527 0.72228 L 0.8289473684210527 0.72212 M 0.32894736842105265 0.72212 l 1 0" style="stroke-width: 0.5px;"></path>');
            });
          });
        }
      });
    });
  });
});