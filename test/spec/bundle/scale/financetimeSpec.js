techanModule('scale/financetime', function(specBuilder) {
  'use strict';

  var mockInit = function(module) {
    var linear = function() {};
    var ordinal = function() {};

    return module(linear, ordinal);
  };

  var actualInit = function(module) {
    var linear = d3.scale.linear;
    var ordinal = d3.scale.ordinal;

    return module(linear, ordinal);
  };

  var data = ohlc.facebook.slice(0, 10).map(function(d) { return new Date(d[0]); });
  console.log(data);

  specBuilder.require(require('../../../../src/scale/financetime'), function(instanceBuilder) {
    instanceBuilder.instance('mocked', mockInit);
    instanceBuilder.instance('actual', actualInit, function(bucket) {
      var financetime = null;

      describe('And domain and range is initialised', function() {
        beforeEach(function() {
          financetime = bucket.financetime;
          financetime.domain(data).range([100, 110]);
        });

        it('Then domain should equal the domain set', function() {
          expect(financetime.domain()).toEqual(data);
        });

        it('Then range should return the range set', function() {
          expect(financetime.range()).toEqual([100, 110]);
        });

        xit('Then scale of first index should return min range', function() {
          expect(financetime(data[0])).toEqual(100);
        });

        /*
          Possibly convert from prototype to closure style object to support this
         */
        xit('Then scale of last index should return max range', function() {
          // TODO Module is not function itself
          expect(financetime(data[data.length-1])).toEqual(110);
        });

        it('Then invert of min range should return first domain', function() {
          // TODO Module is not function itself
          expect(financetime.invert(100)).toEqual(data[0]);
        });

        it('Then invert of max range should return last domain', function() {
          expect(financetime.invert(110)).toEqual(data[data.length-1]);
        });

        it('Then invert of value before range, should return first domain', function() {
          expect(financetime.invert(50)).toEqual(data[0]);
        });

        it('Then invert of value after range, should return last domain', function() {
          expect(financetime.invert(150)).toEqual(data[data.length-1]);
        });

        /*
          Under the bonnet (in zoom) d3 uses Array.map(scale.invert), which doesn't work to nice
          with 'this' (map passes undefined), which then in turn does not play nice with prototype.
          Might need to convert prototype to closure style objects.
         */
        xit('Then using invert as map function to map an array of a value greater than max range, should return last domain', function() {
          expect([150].map(financetime.invert)).toEqual([data[data.length-1]]);
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
            expect(cloned.range()).toEqual([100, 110]);
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