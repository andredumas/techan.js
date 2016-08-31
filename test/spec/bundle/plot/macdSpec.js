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
                  .toEqual('<path class="macd" d="M0.17105263157894737,0.11C0.2078753022018314,0.08425358870047948,0.3951011021015904,-0.09767751452721843,0.5,-0.12S0.7779409894852836,-0.043955345276826416,0.8289473684210527,-0.03"></path>');
              });

              it('Then contains an signal', function() {
                expect(childElements[3].outerHTML)
                  .toEqual('<path class="signal" d="M0.17105263157894737,0.27C0.19599883807419377,0.24269887161160236,0.4027899367127911,-0.05522642147903155,0.5,-0.09S0.7744019934076678,-0.12609765117551738,0.8289473684210527,-0.13"></path>');
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