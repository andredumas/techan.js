techanModule('plot/ohlc', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = ohlc.alternating.array;

  var actualInit = function() {
    return techan.plot.ohlc;
  };

  specBuilder.require(require('../../../../src/plot/ohlc'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And ohlc is initialised with defaults', function () {
        var ohlc,
            g;

        beforeEach(function () {
          ohlc = scope.ohlc;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, ohlc should be rendered without error', function() {
          // TODO Assert the result/DOM
          ohlc(g, data);
        });

        it('Then on refresh invoke, ohlc should be refreshed only', function() {
          ohlc(g, data);
          // TODO Assert the result/DOM
          ohlc.refresh(g);
        });

        assertPlotMixin(scope);
      });
    });
  });
});