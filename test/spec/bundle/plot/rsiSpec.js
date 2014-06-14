techanModule('plot/rsi', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = rsi;

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
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, rsi should be rendered without error', function() {
          // TODO Assert the result/DOM
          rsi(g, data);
        });

        it('Then on refresh invoke, rsi should be refreshed only', function() {
          // TODO Assert the result/DOM
          rsi(g, data);
          rsi.refresh(g);
        });

        assertPlotMixin(scope);
      });
    });
  });
});