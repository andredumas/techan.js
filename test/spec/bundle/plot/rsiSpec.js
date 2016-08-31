techanModule('plot/rsi', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/rsi').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.rsi;
  };

  specBuilder.require(require('../../../../src/plot/rsi'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And rsi is initialised with defaults', function () {
        describe('And there is data to be plotted', function() {
          plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 4);
          plotMixinShouldBeSetup(scope);

          function assertDom(scope) {
            var childElements;

            beforeEach(function() {
              childElements = scope.childElements;
            });

            describe('And on obtaining the data element', function() {
              it('Then contains an overbought', function() {
                expect(childElements[0].outerHTML)
                  .toEqual('<path class="overbought" d="M 0.17105263157894737 70 L 0.8289473684210527 70"></path>');
              });

              it('Then contains an middle', function() {
                expect(childElements[1].outerHTML)
                  .toEqual('<path class="middle" d="M 0.17105263157894737 0 L 0.8289473684210527 0"></path>');
              });

              it('Then contains an oversold', function() {
                expect(childElements[2].outerHTML)
                  .toEqual('<path class="oversold" d="M 0.17105263157894737 30 L 0.8289473684210527 30"></path>');
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