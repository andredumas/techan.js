techanModule('plot/macd', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = macd;

  var actualInit = function() {
    return techan.plot.macd;
  };

  specBuilder.require(require('../../../../src/plot/macd'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And macd is initialised with defaults', function () {
        var macd,
            g;

        beforeEach(function () {
          macd = scope.macd;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, macd should be rendered without error', function() {
          // TODO Assert the result/DOM
          macd(g, data);
        });

        it('Then on refresh invoke, macd should be refreshed only', function() {
          // TODO Assert the result/DOM
          macd(g, data);
          macd.refresh(g);
        });

        assertPlotMixin(scope);
      });
    });
  });
});