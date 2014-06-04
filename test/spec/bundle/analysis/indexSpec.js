describe('techan.analysis', function() {
  'use strict';

  var mockD3 = {
    scale: {
      linear: function() {}
    }
  };

  var analysis = require('../../../../src/analysis')(mockD3);

  it('.supstance should be defined', function() {
    expect(analysis.supstance).toBeDefined(mockD3);
  });
});