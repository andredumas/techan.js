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
        var rsi,
            g;

        beforeEach(function () {
          rsi = scope.rsi;
          g = domFixtures.g([data]);
        });

        it('Then on default invoke, rsi should be rendered without error', function() {
          // TODO Assert the result/DOM
          rsi(g);
        });

        it('Then on refresh invoke, rsi should be refreshed only', function() {
          // TODO Assert the result/DOM
          rsi(g);
          rsi.refresh(g);
        });

        assertPlotMixin(scope);
      });
    });
  });
});