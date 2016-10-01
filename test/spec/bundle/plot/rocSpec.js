techanModule('plot/roc', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/roc').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.roc;
  };

  specBuilder.require(techan.plot.roc, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And roc is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 2);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          it('Then contains a line', function() {
            expect(childElements[0].outerHTML)
              .toEqual('<path class="line" d="M0,22.220999999999997Z"></path>');
          });

          it('Then contains a zero line', function() {
            expect(childElements[1].outerHTML)
              .toEqual('<path class="zero" d="M 0 0 L 0 0"></path>');
          });
        }
      });
    });
  });
});