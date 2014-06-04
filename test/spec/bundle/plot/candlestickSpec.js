describe('techan.plot.candlestick', function() {
  'use strict';

  var mockLinear = function() {};
  var mockOrdinal = function() {};
  var candlestick = require('../../../../src/plot/candlestick')(mockLinear, mockOrdinal);

  it('should be defined', function() {
    expect(candlestick).toBeDefined();
  });

  it('should be able to be constructed', function() {
    var value = candlestick();
  });
});