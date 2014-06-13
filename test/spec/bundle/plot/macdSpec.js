techanModule('plot/macd', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = macd;

  var actualInit = function() {
    return techan.plot.macd;
  };

  specBuilder.require(require('../../../../src/plot/macd'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And macd is initialised with defaults', function () {
        var macd,
            accessor,
            g;

        beforeEach(function () {
          macd = bucket.macd;
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

        it('Then the plot mixin methods should be defined', function () {
          expect(macd.xScale).toBeDefined();
          expect(macd.yScale).toBeDefined();
          expect(macd.accessor).toBeDefined();
        });
      });
    });
  });
});