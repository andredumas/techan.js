techanModule('plot/volume', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('../_fixtures/data/ohlc').alternating.array,
      invalidvolume = require('../_fixtures/data/ohlc').invalidvolume.array,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.volume;
  };

  specBuilder.require(require('../../../../src/plot/volume'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And volume is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 1);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          it('Then contains a single volume', function() {
            expect(childElements[0].outerHTML)
              .toEqual('<path class="volume" d="M -0.32894736842105265 0 l 0 10 l 1 0 l 0 -10 M 0 0 l 0 100 l 1 0 l 0 -100 M 0.32894736842105265 0 l 0 1 l 1 0 l 0 -1"></path>');
          });

          describe('And data is updated (cleared) and redrawn', function() {
            var g;

            beforeEach(function() {
              g = scope.g;
              g.datum([]);
              scope.plot(g);
            });

            it('Then contain an empty volume path', function() {
              expect(g.node().innerHTML).toBe('<g class="data"><path class="volume"></path></g>');
            });
          });
        }

        describe('And data contains invalid volume entry', function() {
          plotShouldRenderWithoutError(scope, invalidvolume, domFixtures);
          plotMixinShouldBeSetup(scope);
        });
      });

      describe('And volume is initialised with ohlc accessor', function () {
        beforeEach(function() {
          scope.volume.accessor(techan.accessor.ohlc());
        });

        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 3);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          it('Then contains a up', function() {
            expect(childElements[0].outerHTML)
              .toEqual('<path class="volume up" d="M -0.32894736842105265 0 l 0 10 l 1 0 l 0 -10"></path>');
          });

          it('Then contains a down', function() {
            expect(childElements[1].outerHTML)
              .toEqual('<path class="volume down" d="M 0 0 l 0 100 l 1 0 l 0 -100"></path>');
          });

          it('Then contains a equal', function() {
            expect(childElements[2].outerHTML)
              .toEqual('<path class="volume equal" d="M 0.32894736842105265 0 l 0 1 l 1 0 l 0 -1"></path>');
          });
        }
      });
    });
  });
});