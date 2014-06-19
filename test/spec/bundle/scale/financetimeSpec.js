techanModule('scale/financetime', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.scale.financetime;
  };

  var data = require('../_fixtures/data/ohlc').facebook.slice(0, 10).map(function(d) { return d.date; });

  specBuilder.require(require('../../../../src/scale/financetime'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      var financetime = null;

      describe('And domain and range is initialised', function() {
        beforeEach(function() {
          financetime = scope.financetime;
          financetime.domain(data).range([100, 120]);
        });

        it('Then domain should equal the domain set', function() {
          expect(financetime.domain()).toEqual(data);
        });

        it('Then range should return the range set', function() {
          expect(financetime.range()).toEqual([100, 120]);
        });

        it('Then rangeExtent should return the full visible range set inclusive of range bands', function() {
          expect(financetime.rangeBounds()).toEqual([98.84444444444445, 121.15555555555555]);
        });

        it('Then scale of first index should return min range', function() {
          expect(financetime(data[0])).toEqual(101.03585657370517);
        });

        it('Then invert of just over min range should return the first domain', function() {
          expect(financetime.invert(101)).toEqual(data[0]);
        });

        it('Then invert of just under max range should return the last domain', function() {
          expect(financetime.invert(119)).toEqual(data[data.length-1]);
        });

        it('Then invertToIndex of just over min range should return the first domain index', function() {
          expect(financetime.invertToIndex(101)).toEqual(0);
        });

        it('Then invertToIndex of less than min range should return null', function() {
          expect(financetime.invertToIndex(90)).toBeNull();
        });

        it('Then invertToIndex of just under max range should return the last domain index', function() {
          expect(financetime.invertToIndex(119)).toEqual(data.length-1);
        });

        it('Then invertToIndex of greater max range should return null', function() {
          expect(financetime.invertToIndex(130)).toBeNull();
        });

        xit('Then linear(linear.invert(y)) should equal y for each in ordinal range', function() {
          financetime.range().forEach(function(y) {
            expect(financetime(financetime.invert(y))).toEqual(y);
          });
        });

        it('Then invert(financetime(x)) should equal x for each in domain', function() {
            data.forEach(function(x) {
              expect(financetime.invert(financetime(x))).toEqual(x);
            });
        });

        it('Then invert of value before range, should return null', function() {
          expect(financetime.invert(50)).toBeNull();
        });

        it('Then invert of value after range, should return null', function() {
          expect(financetime.invert(150)).toBeNull();
        });

        it('Then using invert as Array.prototyp.map(invert) of a value greater than max range, should return last domain', function() {
          expect([110].map(financetime.invert)).toEqual([data[5]]);
        });

        describe('And copied', function() {
          var cloned = null;

          beforeEach(function() {
            cloned = financetime.copy();
          });

          it('Then should not be equal to source', function() {
            expect(cloned).not.toEqual(financetime);
          });

          it('Then domain should equal the domain set', function() {
            expect(cloned.domain()).toEqual(data);
          });

          it('Then range should return the range set', function() {
            expect(cloned.range()).toEqual([100, 120]);
          });
        });

        describe('And a zoom applied', function() {
          var zoom = null;

          beforeEach(function() {
            zoom = d3.behavior.zoom();
            financetime = scope.financetime;
            zoom.x(financetime.zoomable());
          });

          describe('And translated by 50 left', function() {
            beforeEach(function() {
              zoom.translate([-50, 0]);
            });

            it('Then scale of first index should return min range', function() {
              expect(financetime(data[0])).toEqual(132.64276228419655);
            });

            it('Then scale of last index should return max range', function() {
              expect(financetime(data[data.length-1])).toEqual(120.69057104913679);
            });
          });
        });
      });
    });
  });
});