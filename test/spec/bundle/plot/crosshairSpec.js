techanModule('plot/crosshair', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.crosshair;
  };

  specBuilder.require(require('../../../../src/plot/crosshair'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And crosshair is initialised with defaults', function () {
        var crosshair,
            g;

        beforeEach(function () {
          crosshair = scope.plot;
          g = domFixtures.g([50]);
        });

        it('Then on default invoke, it should render without error', function() {
          crosshair(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });

        it('Then on refresh invoke, it should be refreshed only', function() {
          crosshair(g);
          crosshair.refresh(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });
      });
    });
  });
});