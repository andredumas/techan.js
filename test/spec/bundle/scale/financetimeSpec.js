techanModule('scale/financetime', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    var linear = d3.scale.linear,
        ordinal = d3.scale.ordinal,
        rebind = d3.rebind;

    return module(linear, ordinal, rebind);
  };

  var data = ohlc.facebook.slice(0, 10).map(function(d) { return d.date; });

  specBuilder.require(require('../../../../src/scale/financetime'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(bucket) {
      var financetime = null;

      describe('And domain and range is initialised', function() {
        beforeEach(function() {
          financetime = bucket.financetime;
          financetime.domain(data).range([100, 120]);
        });

        it('Then domain should equal the domain set', function() {
          expect(financetime.domain()).toEqual(data);
        });

        it('Then range should return the range set', function() {
          expect(financetime.range()).toEqual([100, 120]);
        });

        it('Then scale of first index should return min range', function() {
          expect(financetime(data[0])).toEqual(105);
        });

        it('Then invert of max range should return last domain', function() {
          expect(financetime.invert(114)).toEqual(data[data.length-1]);
        });

        it('Then linear(linear.invert(y)) should equal y for each in ordinal range', function() {
          financetime.ordinal().range().forEach(function(y) {
            expect(financetime(financetime.invert(y))).toEqual(y);
          });
        });

        it('Then linear.invert(linear(x)) should equal x for each in domain', function() {
            data.forEach(function(x) {
              expect(financetime.invert(financetime(x))).toEqual(x);
            });
        });

        it('Then invert of value before range, should return first domain', function() {
          expect(financetime.invert(50)).toEqual(data[0]);
        });

        it('Then invert of value after range, should return last domain', function() {
          expect(financetime.invert(150)).toEqual(data[data.length-1]);
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
            financetime = bucket.financetime;
            zoom.x(financetime);
          });

          describe('And translated by 50 left', function() {
            beforeEach(function() {
              zoom.translate([-50, 0]);
            });

            xit('Then scale of first index should return min range', function() {
              expect(financetime(data[0])).toEqual(50);
            });

            xit('Then scale of last index should return max range', function() {
              expect(financetime(data[data.length-1])).toEqual(60);
            });

            xit('Then invert of min range should return first domain', function() {
              expect(financetime.invert(50)).toEqual(data[0]);
            });

            xit('Then invert of max range should return last domain', function() {
              expect(financetime.invert(60)).toEqual(data[data.length-1]);
            });
          });

          describe('And scaled by 2', function() {
            beforeEach(function() {
              zoom.scale(2);
            });

            xit('Then scale of first index should return min range', function() {
              expect(financetime(data[0])).toEqual(50);
            });

            xit('Then scale of last index should return max range', function() {
              expect(financetime(data[data.length-1])).toEqual(140);
            });

            xit('Then invert of min range should return first domain', function() {
              expect(financetime.invert(50)).toEqual(data[0]);
            });

            xit('Then invert of max range should return last domain', function() {
              expect(financetime.invert(140)).toEqual(data[data.length-1]);
            });
          });
        });
      });
    });
  });
});