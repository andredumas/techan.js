techanModule('plot/atrtrailingstop', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('../_fixtures/data/atrtrailingstop').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.atrtrailingstop;
  };

  specBuilder.require(require('../../../../src/plot/atrtrailingstop'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And atrtrailingstop is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 2);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          describe('And on obtaining the data element', function() {
            it('Then contains an up', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path class="up" d="M0.2549019607843137,2Z"></path>');
            });

            it('Then contains a down', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<path class="down" d="M0.7450980392156863,3Z"></path>');
            });
          });
        }
      });
    });
  });
});