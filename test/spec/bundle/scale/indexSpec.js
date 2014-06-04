describe('techan.scale', function() {
  'use strict';

  var mockD3 = {
    scale: {
      linear: function() {},
      ordinal: function() {}
    }
  };

  var scale = require('../../../../src/scale')(mockD3);

  it('.financetime should be defined', function() {
    expect(scale.financetime).toBeDefined();
  });
});