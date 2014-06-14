techanModule('scale', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module(d3);
  };

  specBuilder.require(require('../../../../src/scale'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(scope) {
      it('Then scale.financetime should be defined', function() {
        expect(scope.scale.financetime).toBeDefined();
      });

      it('Then scale.plot.percent should be defined', function() {
        expect(scope.scale.plot.percent).toBeDefined();
      });

      it('Then scale.plot.ohlc should be defined', function() {
        expect(scope.scale.plot.ohlc).toBeDefined();
      });

      it('Then scale.plot.volume should be defined', function() {
        expect(scope.scale.plot.volume).toBeDefined();
      });

      it('Then scale.plot.rsi should be defined', function() {
        expect(scope.scale.plot.rsi).toBeDefined();
      });

      it('Then scale.plot.path should be defined', function() {
        expect(scope.scale.plot.path).toBeDefined();
      });

      it('Then scale.plot.momentum should be defined', function() {
        expect(scope.scale.plot.momentum).toBeDefined();
      });

      it('Then scale.plot.moneyflow should be defined', function() {
        expect(scope.scale.plot.moneyflow).toBeDefined();
      });

      it('Then scale.plot.macd should be defined', function() {
        expect(scope.scale.plot.macd).toBeDefined();
      });

      it('Then scale.plot.movingaverage should be defined', function() {
        expect(scope.scale.plot.movingaverage).toBeDefined();
      });

      describe('And initialise the percent scale from a base scale', function() {
        var y,
            scale;

        beforeEach(function() {
          y = d3.scale.linear().domain([100, 200]).range([100, 0]);
          scale = scope.scale.plot.percent(y, 125);
        });

        it('Then the inverted domain reference value should be 0%', function() {
          expect(scale.invert(y(125))).toEqual(0);
        });

        it('Then the inverted min domain value should be -20%', function() {
          expect(scale.invert(y(100))).toEqual(-0.2);
        });

        it('Then the inverted max domain value should be 60%', function() {
          expect(scale.invert(y(200))).toEqual(0.6000000000000001);
        });
      });
    });
  });
});