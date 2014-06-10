techanModule('plot/candlestick', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var mockInit = function(module) {
    var mockD3 = {
      extent: function() {},
      scale: {
        linear: function() {}
      }
    };

    return module(mockD3);
  };

  var actualInit = function(module) {
    var linear = d3.scale.linear,
        ordinal = d3.scale.ordinal,
        plot = require('../../../../src/plot/plot');

    return module(linear, ordinal, techan.scale.financetime, techan.accessor.ohlc, plot);
  };

  specBuilder.require(require('../../../../src/plot/candlestick'), function(instanceBuilder) {
    //instanceBuilder.instance('no', mockInit);

    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And candlestick is initialised', function () {
        var candlestick,
            accessor;

        beforeEach(function () {
          accessor = techan.accessor.ohlc();
          candlestick = bucket.candlestick;
          candlestick.accessor(accessor);
        });

        it('Then accessor should equal set accessor', function () {
          expect(candlestick.accessor()).toEqual(accessor);
        });
      });
    });
  });
});