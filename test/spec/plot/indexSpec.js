describe('techan.plot', function() {
  'use strict';

  var plot = require('../../../src/plot')();

  it('.candlestick should be defined', function() {
    expect(plot.candlestick).toBeDefined();
  });
});