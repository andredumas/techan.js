techanModule('plot/supstance', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = require('./../_fixtures/data/supstance'),
    domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.supstance;
  };

  specBuilder.require(require('../../../../src/plot/supstance'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And supstance is initialised with defaults', function () {
        plotMixinShouldBeSetup(scope);

        var plot,
            g;

        beforeEach(function () {
          plot = scope.plot;
          plot.xScale().domain([data[0].start, data[0].end]);
          g = domFixtures.g([data]);
        });

        it('Then on default invoke, it should render without error', function() {
          plot(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });

        it('Then on refresh invoke, it should be refreshed only', function() {
          plot(g);
          plot.refresh(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });
      });
    });
  });
});