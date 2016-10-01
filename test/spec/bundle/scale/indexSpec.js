techanModule('scale', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    return module(d3);
  };

  var dataData = require('../_fixtures/data/ohlc').facebook.slice(0, 10).map(function(d) { return d.date; }),
      atrData = require('../_fixtures/data/atr').expected,
      atrtrailingstopData = require('../_fixtures/data/atrtrailingstop').plot,
      ichimokuData = require('../_fixtures/data/ichimoku').expected,
      trendlineData = require('../_fixtures/data/trendline');

  function optionalAccessorTest(name, object, accessor, d) {
    d = d || dataData;

    it('Then ' + name + ' should be defined', function() {
      expect(object()).toBeDefined();
    });

    it('Then ' + name + ' without accessor, should be invoked without error', function() {
      expect(object()(d)).toBeDefined();
    });

    it('Then ' + name + ' with accessor, should be invoked without error', function() {
      expect(object()(d, accessor)).toBeDefined();
    });
  }

  specBuilder.require(require('../../../../src/scale'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(scope) {
      it('Then scale.financetime should be defined', function() {
        expect(scope.scale.financetime).toBeDefined();
      });

      optionalAccessorTest('scale.plot.adx', function() {
        return scope.scale.plot.adx;
      }, techan.accessor.adx());

      optionalAccessorTest('scale.plot.aroon', function() {
        return scope.scale.plot.aroon;
      }, techan.accessor.aroon());

      optionalAccessorTest('scale.plot.atr', function() {
        return scope.scale.plot.atr;
      }, techan.accessor.value());

      describe('And atr invoked using defaults', function() {
        it('Then the domain should be correct and widened without nulls', function() {
          expect(scope.scale.plot.atr(atrData).domain()).toEqual([1.8833083807820301, 2.20402476564293]);
        });
      });

      optionalAccessorTest('scale.plot.atrtrailingstop', function() {
        return scope.scale.plot.atrtrailingstop;
      }, techan.accessor.atrtrailingstop());

      describe('And atrtrailingstop invoked using defaults', function() {
        it('Then the domain should be correct and widened without nulls', function() {
          expect(scope.scale.plot.atrtrailingstop(atrtrailingstopData).domain()).toEqual([1.96, 3.04]);
        });
      });

      optionalAccessorTest('scale.plot.bollinger', function() {
        return scope.scale.plot.bollinger;
      }, techan.accessor.bollinger());

      optionalAccessorTest('scale.plot.candlestick', function() {
        return scope.scale.plot.candlestick;
      }, techan.accessor.ohlc());

      optionalAccessorTest('scale.plot.close', function() {
        return scope.scale.plot.close;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.heikinashi', function() {
        return scope.scale.plot.heikinashi;
      }, techan.accessor.ohlc());

      optionalAccessorTest('scale.plot.ichimoku', function() {
        return scope.scale.plot.ichimoku;
      }, techan.accessor.ichimoku(), ichimokuData);

      describe('And ichimoku invoked using defaults', function() {
        it('Then the domain should be correct and widened without nulls', function() {
          expect(scope.scale.plot.ichimoku(ichimokuData).domain()).toEqual([43.18, 137.82]);
        });
      });

      optionalAccessorTest('scale.plot.macd', function() {
        return scope.scale.plot.macd;
      }, techan.accessor.macd());

      optionalAccessorTest('scale.plot.momentum', function() {
        return scope.scale.plot.momentum;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.moneyflow', function() {
        return scope.scale.plot.moneyflow;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.ohlc', function() {
        return scope.scale.plot.ohlc;
      }, techan.accessor.ohlc());

      it('Then scale.plot.percent should be defined', function() {
        expect(scope.scale.plot.percent).toBeDefined();
      });

      describe('And initialise the percent scale using default reference', function() {
        var y,
          scale;

        beforeEach(function() {
          y = d3.scaleLinear().domain([100, 200]).range([100, 0]);
          scale = scope.scale.plot.percent(y);
        });

        it('Then the inverted domain reference value should be 0%', function() {
          expect(scale.invert(y(100))).toEqual(0);
        });

        it('Then the inverted 80% of reference domain value should be -20%', function() {
          expect(scale.invert(y(80))).toEqual(-0.19999999999999996);
        });

        it('Then the inverted max domain value should be 100%', function() {
          expect(scale.invert(y(200))).toEqual(1);
        });
      });

      describe('And initialise the percent scale with reference value', function() {
        var y,
          scale;

        beforeEach(function() {
          y = d3.scaleLinear().domain([100, 200]).range([100, 0]);
          scale = scope.scale.plot.percent(y, 125);
        });

        it('Then the inverted domain reference value should be 0%', function() {
          expect(Math.round(scale.invert(y(125))*1000)/1000).toBe(0);
        });

        it('Then the inverted min domain value should be -20%', function() {
          expect(scale.invert(y(100))).toEqual( -0.20000000000000007);
        });

        it('Then the inverted max domain value should be 60%', function() {
          expect(scale.invert(y(200))).toEqual(0.6);
        });
      });

      optionalAccessorTest('scale.plot.roc', function() {
        return scope.scale.plot.roc;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.rsi', function() {
        return scope.scale.plot.rsi;
      }, techan.accessor.rsi());

      optionalAccessorTest('scale.plot.sma', function() {
        return scope.scale.plot.sma;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.sroc', function() {
        return scope.scale.plot.sroc;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.stochastic', function() {
        return scope.scale.plot.stochastic;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.supstance', function() {
        return scope.scale.plot.supstance;
      }, techan.accessor.supstance());

      optionalAccessorTest('scale.plot.time', function() {
        return scope.scale.plot.time;
      }, techan.accessor.ohlc());

      optionalAccessorTest('scale.plot.tradearrow', function() {
        return scope.scale.plot.tradearrow;
      }, techan.accessor.trade());

      optionalAccessorTest('scale.plot.trendline', function() {
        return scope.scale.plot.trendline;
      }, techan.accessor.trendline(), trendlineData);

      optionalAccessorTest('scale.plot.volume', function() {
        return scope.scale.plot.volume;
      }, techan.accessor.ohlc().v);

      optionalAccessorTest('scale.plot.vwap', function() {
        return scope.scale.plot.vwap;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.wilderma', function() {
        return scope.scale.plot.wilderma;
      }, techan.accessor.value());

      optionalAccessorTest('scale.plot.williams', function() {
        return scope.scale.plot.williams;
      }, techan.accessor.value());
    });
  });
});
