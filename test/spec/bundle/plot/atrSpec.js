techanModule('plot/atr', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/atr').plot,
      domFixtures = require('../_fixtures/dom');


  var actualInit = function() {
    return techan.plot.atr;
  };

  specBuilder.require(techan.plot.atr, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And atr is initialised with defaults', function () {
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
                .toEqual('<path class="line" d="M0.17105263157894737,1C0.2807017543859649,1.5,0.39035087719298245,2,0.5,2C0.6096491228070176,2,0.7192982456140351,1.25,0.8289473684210527,0.5"></path>');
            });
          });
        }
      });
    });
  });
});