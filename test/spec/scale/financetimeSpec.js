describe('techan.scale.financetime', function() {
  'use strict';

  var mockLinear = function() {};
  var mockOrdinal = function() {};
  var financetime = require('../../../src/scale/financetime')(mockLinear, mockOrdinal);

  it('.financetime should be defined', function() {
    expect(financetime).toBeDefined();
  });

  it('should be able to be constructed', function() {
    var value = financetime();
  });
});