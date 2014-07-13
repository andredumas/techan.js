techanModule('scale', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    return module(d3);
  };

  var data = require('../_fixtures/data/ohlc').facebook.slice(0, 10).map(function(d) { return d.date; });

  function optionalAccessorTest(name, object, accessor) {
    it('Then ' + name + ' should be defined', function() {
      expect(object()).toBeDefined();
    });

    it('Then ' + name + ' without accessor, should be invoked without error', function() {
      expect(object()(data)).toBeDefined();
    });

    it('Then ' + name + ' with accessor, should be invoked without error', function() {
      expect(object()(data, accessor)).toBeDefined();
    });
  }

  specBuilder.require(require('../../../../src/scale'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(scope) {
      it('Then scale.financetime should be defined', function() {
        expect(scope.scale.financetime).toBeDefined();
      });

      optionalAccessorTest('scale.plot.time', function() {
        return scope.scale.plot.time;
      }, techan.accessor.ohlc());

      optionalAccessorTest('scale.plot.ohlc', function() {
        return scope.scale.plot.ohlc;
      }, techan.accessor.ohlc());

      optionalAccessorTest('scale.plot.volume', function() {
        return scope.scale.plot.volume;
      }, techan.accessor.ohlc().v);

      optionalAccessorTest('scale.plot.rsi', function() {
        return scope.scale.plot.rsi;
      }, techan.accessor.rsi());

      optionalAccessorTest('scale.plot.momentum', function() {
        return scope.scale.plot.momentum;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.moneyflow', function() {
        return scope.scale.plot.moneyflow;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.macd', function() {
        return scope.scale.plot.macd;
      }, techan.accessor.macd());

      optionalAccessorTest('scale.plot.movingaverage', function() {
        return scope.scale.plot.movingaverage;
      }, techan.accessor.value());

      it('Then scale.plot.percent should be defined', function() {
        expect(scope.scale.plot.percent).toBeDefined();
      });

      describe('And initialise the percent scale using default reference', function() {
        var y,
          scale;

        beforeEach(function() {
          y = d3.scale.linear().domain([100, 200]).range([100, 0]);
          scale = scope.scale.plot.percent(y);
        });

        it('Then the inverted domain reference value should be 0%', function() {
          expect(scale.invert(y(100))).toEqual(0);
        });

        it('Then the inverted 80% of reference domain value should be -20%', function() {
          expect(scale.invert(y(80))).toEqual(-0.2);
        });

        it('Then the inverted max domain value should be 100%', function() {
          expect(scale.invert(y(200))).toEqual(1);
        });
      });

      describe('And initialise the percent scale with reference value', function() {
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