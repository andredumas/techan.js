describe('techan.scale.financetime', function() {
  'use strict';

  describe('with mocked dependencies', function() {
    var linear = function() {};
    var ordinal = function() {};
    var financetime = require('../../../src/scale/financetime')(linear, ordinal);

    it('.financetime should be defined', function() {
      expect(financetime).toBeDefined();
    });

    it('should be able to be constructed', function() {
      var value = financetime();
    });
  });

  describe('with actual dependencies', function() {
    var linear = d3.scale.linear;
    var ordinal = d3.scale.ordinal;
    var financetime = require('../../../src/scale/financetime')(linear, ordinal);

    it('.financetime should be defined', function() {
      expect(financetime).toBeDefined();
    });

    describe('and constructed', function() {
      var scale = null;

      beforeEach(function() {
        scale = financetime();
      });

      it('should be defined', function() {
        expect(scale).toBeDefined();
      });
    });
  });
});