describe('Given the standalone module entry point, techan', function() {
  'use strict';

  var techan = require('../../src/techan.js');

  it('should be defined', function () {
    expect(techan).toBeDefined();
  });

  it('.version should be defined', function () {
    expect(techan.version).toBeDefined();
  });

  describe('.analysis', function() {
    it('should be defined', function () {
      expect(techan.analysis).toBeDefined();
    });

    it('.supstance should be defined', function() {
      expect(techan.analysis.supstance).toBeDefined();
    });
  });

  describe('.plot', function() {
    it('should be defined', function () {
      expect(techan.plot).toBeDefined();
    });

    it('.candlestick should be defined', function() {
      expect(techan.plot.candlestick).toBeDefined();
    });
  });

  describe('.scale', function() {
    it('should be defined', function() {
      expect(techan.scale).toBeDefined();
    });

    it('.financetime should be defined', function() {
      expect(techan.scale.financetime).toBeDefined();
    });
  });
});