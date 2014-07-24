techanModule('plot/axisannotation', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.axisannotation;
  };

  specBuilder.require(require('../../../../src/plot/axisannotation'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And axisannotation is initialised with defaults', function () {
        var axisannotation,
            g;

        beforeEach(function () {
          axisannotation = scope.plot;
          g = domFixtures.g([50]);
        });

        it('Then on default invoke, it should render without error', function() {
          axisannotation(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });

        it('Then on refresh invoke, it should be refreshed only', function() {
          axisannotation(g);
          axisannotation.refresh(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });
      });
    });
  });
});