techanModule('plot/ema', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/movingaverage').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.ema;
  };

  specBuilder.require(techan.plot.ema, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And ema is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 1);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          describe('And on obtaining the data element', function() {
            it('Then contains a line', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path class="line" d="M0,22.220999999999997Z"></path>');
            });
          });
        }
      });
    });
  });
});