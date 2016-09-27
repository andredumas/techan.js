techanModule('plot/macd', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('../_fixtures/data/macd').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.macd;
  };

  specBuilder.require(require('../../../../src/plot/macd'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And macd is initialised with defaults', function () {
        describe('And there is data to be plotted', function() {
          plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 4);
          plotMixinShouldBeSetup(scope);

          function assertDom(scope) {
            var childElements;

            beforeEach(function() {
              childElements = scope.childElements;
            });

            describe('And on obtaining the data element', function() {
              it('Then contains an difference', function() {
                expect(childElements[0].outerHTML)
                  .toEqual('<path class="difference" d="M -0.32894736842105265 0 l 0 -0.16 l 1 0 l 0 0.16 M 0 0 l 0 -0.02 l 1 0 l 0 0.02 M 0.32894736842105265 0 l 0 0.1 l 1 0 l 0 -0.1"></path>');
              });

              it('Then contains an zero', function() {
                expect(childElements[1].outerHTML)
                  .toEqual('<path class="zero" d="M 0.17105263157894737 0 L 0.8289473684210527 0"></path>');
              });

              it('Then contains an macd', function() {
                expect(childElements[2].outerHTML)
                  .toEqual('<path class="macd" d="M0.17105263157894737,0.11C0.2807017543859649,-0.0050000000000000044,0.39035087719298245,-0.12,0.5,-0.12C0.6096491228070176,-0.12,0.7192982456140351,-0.075,0.8289473684210527,-0.03"></path>');
              });

              it('Then contains an signal', function() {
                expect(childElements[3].outerHTML)
                  .toEqual('<path class="signal" d="M0.17105263157894737,0.27C0.2807017543859649,0.10333333333333333,0.39035087719298245,-0.06333333333333332,0.5,-0.09C0.6096491228070176,-0.11666666666666667,0.7192982456140351,-0.12333333333333334,0.8289473684210527,-0.13"></path>');
              });
            });
          }
        });

        describe('And there is no data to be plotted', function () {
          plotShouldRenderWithoutError(scope, [], domFixtures);
          plotMixinShouldBeSetup(scope);
        });

        describe('And there is 1 data point to be plotted', function () {
          plotShouldRenderWithoutError(scope, data.slice(0, 1), domFixtures);
          plotMixinShouldBeSetup(scope);
        });
      });
    });
  });
});