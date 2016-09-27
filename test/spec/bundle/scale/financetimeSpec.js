techanModule('scale/financetime', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      date = require('../_util/date');

  var actualInit = function() {
    return techan.scale.financetime;
  };

  var actualUtcInit = function() {
    return techan.scale.financetime.utc;
  };

  var data = require('../_fixtures/data/ohlc').facebook.slice(0, 10).map(function(d) { return d.date; }),
      timeData = require('../_fixtures/data/time').intraday;

  specBuilder.require(require('../../../../src/scale/financetime'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      var financetime;

      describe('And domain and range is initialised', function() {
        beforeEach(function() {
          financetime = scope.financetime;
          financetime.domain(data).range([48, 1052]);
        });

        it('Then domain should equal the domain set', function() {
          expect(financetime.domain()).toEqual(data);
        });

        it('Then range should return the range set', function() {
          expect(financetime.range()).toEqual([48, 1052]);
        });

        it('Then band should be default of 80%', function() {
          expect(financetime.band()).toEqual(80);
        });

        it('Then scale of undefined should not throw error and result in value just outside of the greater range extent (+undefined === NaN)', function() {
          expect(financetime(undefined)).toEqual(1100);
        });

        it('Then scale of null should not throw error and result in value just outside of the lesser extent (+null === 0)', function() {
          expect(financetime(null)).toEqual(0);
        });

        it('Then scale of first index should return min widened range', function() {
          expect(Math.round(financetime(data[0])*1000)/1000).toEqual(100);
        });

        it('Then scale of last index should return max widened range', function() {
          expect(financetime(data[data.length-1])).toEqual(1000);
        });

        it('Then scale of first index plus offset of data length should return max range', function() {
          expect(financetime(data[0], data.length-1)).toEqual(1000);
        });

        it('Then scale of a value less than minimum should return less than minimum range', function() {
          expect(financetime(+data[0] - 100)).toEqual(0); // just a bit less, should round down
        });

        it('Then scale of a value greater than maximum should return greater than maximum range', function() {
          expect(financetime(+data[data.length-1] + 10)).toEqual(1100); // Just a bit more, should round up
        });

        it('Then scale of a value between domain min/max but not exact value should return nearest range', function() {
          expect(financetime(+data[3]+100)).toEqual(500);
        });

        it('Then invert of just over min range should return the first domain', function() {
          expect(financetime.invert(101)).toEqual(data[0]);
        });

        it('Then invert of just under max range should return the last domain', function() {
          expect(financetime.invert(1020)).toEqual(data[data.length-1]);
        });

        it('Then invertToIndex of just over min range should return the first domain index', function() {
          expect(financetime.invertToIndex(101)).toEqual(0);
        });

        it('Then invertToIndex of less than min range should return a negative index', function() {
          expect(financetime.invertToIndex(40)).toEqual(-1);
        });

        it('Then invertToIndex of just under max range should return the last domain index', function() {
          expect(financetime.invertToIndex(1020)).toEqual(data.length-1);
        });

        it('Then invertToIndex of greater max range should return relative domain index', function() {
          expect(financetime.invertToIndex(1060)).toEqual(10);
        });

        it('Then invert(financetime(x)) should equal x for each in domain', function() {
            data.forEach(function(x) {
              expect(financetime.invert(financetime(x))).toEqual(x);
            });
        });

        it('Then invert of value before range, should return null', function() {
          expect(financetime.invert(40)).toBeNull();
        });

        it('Then invert of value after range, should return null', function() {
          expect(financetime.invert(1100)).toBeNull();
        });

        it('Then using invert as Array.prototyp.map(invert) of a value about half of range, should return mid domain', function() {
          expect([600].map(financetime.invert)).toEqual([data[5]]);
        });

        describe('And outerPadding set to none', function() {
          beforeEach(function() {
            financetime.outerPadding(0);
          });

          it('Then outerPadding should be 0', function() {
            expect(financetime.outerPadding()).toEqual(0);
          });

          it('Then scale of first index should return min range', function() {
            expect(financetime(data[0])).toEqual(48);
          });

          it('Then scale of last index should return max range', function() {
            expect(financetime(data[data.length-1])).toEqual(1052);
          });

          describe('And copied', function() {
            var cloned;

            beforeEach(function() {
              cloned = financetime.copy();
            });

            it('Then outerPadding should be 0', function() {
              expect(cloned.outerPadding()).toEqual(0);
            });

            it('Then scale of first index should return min range', function() {
              expect(cloned(data[0])).toEqual(48);
            });

            it('Then zoomable obtained with domain invoked without error', function() {
              expect(cloned.zoomable().domain).not.toThrowError();
            });
          });

          describe('And padding set to none', function() {
            beforeEach(function() {
              financetime.padding(0);
            });

            it('Then padding should be 0', function() {
              expect(financetime.padding()).toEqual(0);
            });

            it('Then band should be approximately 100%', function() {
              expect(financetime.band()).toEqual(111.55555555555556); // (1052-48)/9
            });

            describe('And copied', function() {
              var cloned;

              beforeEach(function() {
                cloned = financetime.copy();
              });

              it('Then padding should be 0', function() {
                expect(cloned.padding()).toEqual(0);
              });

              it('Then band should be approximately of 100%', function() {
                expect(financetime.band()).toEqual(111.55555555555556); // (1052-48)/9
              });
            });
          });
        });

        it('Then ticks should return a distributed range of ticks', function() {
          expect(financetime.ticks()).toEqual([
            new Date(2012, 4, 18),
            new Date(2012, 4, 21), // Irregular but continuous. Skipping where there is no domain (like weekends and holidays)
            new Date(2012, 4, 22),
            new Date(2012, 4, 23),
            new Date(2012, 4, 24),
            new Date(2012, 4, 25),
            new Date(2012, 4, 29),
            new Date(2012, 4, 30),
            new Date(2012, 4, 31),
            new Date(2012, 5, 1)
          ]);
        });

        it('Then ticks with specified tick count returns approximately that number', function() {
          expect(financetime.ticks(3)).toEqual([
            new Date(2012,4,21),
            new Date(2012,4,29)
          ]);
        });

        it('Then ticks with specified interval and step count returns that number', function() {
          expect(financetime.ticks(d3.timeDay, 2)).toEqual([
            new Date(2012,4,21),
            new Date(2012,4,23),
            new Date(2012,4,25),
            new Date(2012,4,29),
            new Date(2012,4,31),
            new Date(2012,5,1)
          ]);
        });

        describe('And closestTicks is true', function() {
          beforeEach(function() {
            financetime.closestTicks(true);
          });

          it('Then ticks with specified interval and step count returns that number', function() {
            expect(financetime.ticks(d3.timeDay, 2)).toEqual([
              new Date(2012,4,18),
              new Date(2012,4,21),
              new Date(2012,4,23),
              new Date(2012,4,25),
              new Date(2012,4,29),
              new Date(2012,4,31),
              new Date(2012,5,1)
            ]);
          });
        });

        it('Then default tickFormat should be yearly', function() {
          expect(financetime.tickFormat()(new Date(2012,0,20))).toEqual('2012');
        });

        it('Then default tickFormat after ticks invoke should be day', function() {
          financetime.ticks();
          expect(financetime.tickFormat()(new Date(2012,0,20))).toEqual('Jan 20');
          expect(financetime.tickFormat()(new Date(2012,3,3))).toEqual('Apr  3');
        });

        describe('And copied', function() {
          var cloned;

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
            expect(cloned.range()).toEqual([48, 1052]);
          });

          it('Then ticks should return a distributed range of ticks', function() {
            expect(cloned.ticks()).toEqual(financetime.ticks());
          });
        });

        describe('And a zoomable obtained', function() {
          var zoomable;

          beforeEach(function() {
            financetime = scope.financetime;
            zoomable = financetime.zoomable();
          });

          describe('And heavily scaled/zoomed in between values', function() {
            beforeEach(function() {
              zoomable.domain([5.1, 5.8]);
            });

            it('Then domain should return empty', function() {
              expect(financetime.domain()).toEqual([]);
            });

            it('Then ticks should return empty', function() {
              expect(financetime.ticks()).toEqual([]);
            });
          });

          describe('And heavily scaled/zoomed in on value', function() {
            beforeEach(function() {
              zoomable.domain([4.8, 5.1]);
            });

            it('Then domain should return a single value', function() {
              expect(financetime.domain()).toEqual([new Date(2012,4,25)]);
            });

            it('Then ticks should return a single value', function() {
              expect(financetime.ticks()).toEqual([new Date(2012,4,25)]);
            });
          });

          describe('And heavily scaled/zoomed out', function() {
            beforeEach(function() {
              // Simulate a heavy zoom out
              zoomable.domain([-100, 100]);
            });

            it('Then domain should return the full set of domain', function() {
              expect(financetime.domain()).toEqual(data);
            });

            it('Then ticks should return full ticks as if not zoomed', function() {
              expect(financetime.ticks()).toEqual([
                new Date(2012, 4, 18),
                new Date(2012, 4, 21),
                new Date(2012, 4, 22),
                new Date(2012, 4, 23),
                new Date(2012, 4, 24),
                new Date(2012, 4, 25),
                new Date(2012, 4, 29),
                new Date(2012, 4, 30),
                new Date(2012, 4, 31),
                new Date(2012, 5, 1)
              ]);
            });
          });

          describe('And heavily translated', function() {
            beforeEach(function() {
              zoomable.domain([8, 100]);
            });

            it('Then domain should return the stretched set of domain', function() {
              expect(financetime.domain()).toEqual([
                new Date(2012, 4, 31),
                new Date(2012, 5, 1)
              ]);
            });

            it('Then ticks should return stretched set of ticks', function() {
              expect(financetime.ticks()).toEqual([
                new Date(2012, 4, 31),
                new Date(2012, 5, 1)
              ]);
            });
          });

          describe('And zoomable is not clamped', function() {
            beforeEach(function() {
              zoomable.clamp(false);
            });

            describe('And heavily scaled/zoomed out', function() {
              beforeEach(function() {
                // Simulate a heavy zoom out
                zoomable.domain([-1000, 1000]);
              });

              it('Then domain should return the full set of domain', function() {
                expect(financetime.domain()).toEqual(data);
              });

              // FIXME Not returning anything
              xit('Then ticks should return a single rounded', function() {
                expect(financetime.ticks()).toEqual([new Date(2012,5,1)]);
              });
            });

            describe('And heavily translated', function() {
              beforeEach(function() {
                zoomable.domain([8, 100]);
              });

              it('Then domain should return a stretched set of domain', function() {
                expect(financetime.domain()).toEqual([
                  new Date(2012, 4, 31),
                  new Date(2012, 5, 1)
                ]);
              });

              xit('Then ticks should return a stretched set of ticks', function() {
                expect(financetime.ticks()).toEqual([
                  new Date(2012, 4, 31),
                  new Date(2012, 5, 1)
                ]);
              });
            });
          });

          describe('And translated left', function() {
            var baselineScale;

            beforeEach(function() {
              var transform = d3.zoomTransform(this);
              baselineScale = d3.scaleLinear()
                .domain([-0.52, 9.52]) // Adjusted index domain taking to account the extra padding
                .range(financetime.range());

              baselineScale.domain(transform.translate(-10, 0).scale(1.5).rescaleX(baselineScale).domain());
              zoomable.domain(transform.translate(-10, 0).scale(1.5).rescaleX(zoomable).domain());
            });

            it('Then baseline scale range should return the range set', function() {
              expect(baselineScale.range()).toEqual([48, 1052]);
            });

            it('Then range should return the range set', function() {
              expect(financetime.range()).toEqual([48, 1052]);
            });

            it('Then baseline scale of first index should return min zoomed range', function() {
              expect(baselineScale(0)).toEqual(140.00000000000003);
            });

            it('Then scale of first index should return min range', function() {
              expect(Math.round(financetime(data[0])*1000)/1000).toEqual(127.103);
            });

            it('Then baseline scale of last index should return max zoomed range', function() {
              expect(baselineScale(data.length-1)).toEqual(1490.0000000000002);
            });

            it('Then scale of last index should return max range', function() {
              expect(Math.round(financetime(data[data.length-1])*1000)/1000).toEqual(1496.194);
            });

            it('Then domain should return visible domain', function() {
              expect(financetime.domain()).toEqual(data.slice(0, 7));
            });

            it('Then ticks with 0 tick count returns an empty tick array', function() {
              expect(financetime.ticks(0)).toEqual([]);
            });

            it('Then ticks should return offset tick values', function() {
              expect(financetime.ticks()).toEqual([
                new Date(2012,4,18),
                new Date(2012,4,21),
                new Date(2012,4,22),
                new Date(2012,4,23),
                new Date(2012,4,24),
                new Date(2012,4,25),
                new Date(2012,4,29)
              ]);
            });

            it('Then ticks with specified tick count returns approximately that number', function() {
              expect(financetime.ticks(3)).toEqual([
                new Date(2012,4,21),
                new Date(2012,4,29)
              ]);
            });

            it('Then ticks with specified interval and step count returns that number', function() {
              expect(financetime.ticks(d3.timeDay, 2)).toEqual([
                new Date(2012,4,21),
                new Date(2012,4,23),
                new Date(2012,4,25),
                new Date(2012,4,29)
              ]);
            });

            describe('And closestTicks is true', function() {
              beforeEach(function() {
                financetime.closestTicks(true);
              });

              it('Then ticks with specified interval and step count returns that number', function() {
                expect(financetime.ticks(d3.timeDay, 2)).toEqual([
                  new Date(2012,4,18),
                  new Date(2012,4,21),
                  new Date(2012,4,23),
                  new Date(2012,4,25),
                  new Date(2012,4,29)
                ]);
              });
            });

            describe('And copied', function() {
              var cloned;

              beforeEach(function() {
                cloned = financetime.copy();
              });

              it('Then scale of first index should return min range', function() {
                expect(Math.round(cloned(data[0])*1000)/1000).toEqual(127.103);
              });

              it('Then scale of last index should return max range', function() {
                expect(Math.round(cloned(data[data.length-1])*1000)/1000).toEqual(1496.194);
              });

              it('Then domain should return visible domain', function() {
                expect(financetime.domain()).toEqual(data.slice(0, 7));
              });

              it('Then ticks should return same offset tick values', function() {
                expect(cloned.ticks()).toEqual(financetime.ticks());
              });
            });
          });
        });

        describe('And initialised with 1 item', function() {
          beforeEach(function() {
            financetime.domain([new Date(0)]);
          });

          it('Then ticks should return a single tick', function() {
            expect(financetime.ticks()).toEqual([
              new Date(0)
            ]);
          });

          describe('And ticks invoked (for tickFormat state)', function() {
            beforeEach(function() {
              financetime.ticks();
            });

            it('Then tickFormat should be generic format', function() {
              expect(financetime.tickFormat()(new Date(1000))).toEqual(':01');
              expect(financetime.tickFormat()(new Date(2014, 1, 24))).toEqual('Feb 24');
            });
          });
        });

        describe('And initialised with intraday data', function() {
          beforeEach(function() {
            financetime.domain(timeData);
          });

          it('Then ticks should return a distributed range of ticks', function() {
            expect(financetime.ticks()).toEqual([
              new Date(0),
              new Date(1000),
              new Date(2000),
              new Date(3000),
              new Date(4000),
              new Date(5000),
              new Date(6000),
              new Date(7000),
              new Date(8000),
              new Date(9000)
            ]);
          });

          describe('And ticks invoked (for tickFormat state)', function() {
            beforeEach(function() {
              financetime.ticks();
            });

            it('Then tickFormat should be intraday format', function() {
              expect(financetime.tickFormat()(new Date(1000))).toEqual(':01');
              expect(financetime.tickFormat()(new Date(2014, 1, 24, 9, 35))).toEqual('09:35');
              expect(financetime.tickFormat()(new Date(2014, 1, 1, 0, 0, 0, 0))).toEqual('12 AM');
            });
          });

          describe('And zoomable obtained And clamp disabled', function() {
            var zoomable;

            beforeEach(function() {
              zoomable = financetime.zoomable();
              zoomable.clamp(false);
            });

            describe('And zoomed out', function() {
              beforeEach(function() {
                zoomable.domain([-100, 100]);
              });

              it('Then domain should return the full set of domain', function() {
                expect(financetime.domain()).toEqual(timeData);
              });

              it('Then ticks should return a single rounded', function() {
                expect(financetime.ticks()).toEqual([timeData[0]]);
              });
            });

            describe('And heavily zoomed out', function() {
              beforeEach(function() {
                zoomable.domain([-1000, 1000]);
              });

              it('Then domain should return the full set of domain', function() {
                expect(financetime.domain()).toEqual(timeData);
              });

              // Not if is a valid scenario to have small data set, zoom heavily and generate ticks
              //xit('Then ticks should return a single rounded', function() {
              //  expect(financetime.ticks()).toEqual([timeData[0]]);
              //});
              // Just make sure it executes without error rather than have a result for now
              it('Then ticks should execute without error', function() {
                expect(financetime.ticks).not.toThrow();
              });
            });
          });
        });

        describe('(SCRATCHPAD) And domain and range is initialised with symmetric data', function() {
          var index,
              time,
              transform;

          beforeEach(function() {
            index = d3.scaleLinear().domain([0, timeData.length-1]).range([0, 1000]);
            time = d3.scaleTime().domain([timeData[0], timeData[timeData.length-1]]).range([0, 1000]);
            transform = d3.zoomTransform(this);
          });

          it('Should have domain set correctly', function() {
            expect(index.domain()).toEqual([0, 9]);
            expect(time.domain()).toEqual([new Date(0), new Date(9000)]);
          });

          it('Should have 10 ticks equaling input data', function() {
            expect(time.ticks()).toEqual(timeData);
          });

          describe('And zoom applied to translate both scales to left', function() {
            beforeEach(function() {
              // Move across to get symmetrical number on the domain
              index.domain(transform.translate(-111.11111111111111, 0).rescaleX(index).domain());
              time.domain(transform.translate(-111.11111111111111, 0).rescaleX(time).domain());
            });

            it('Should move proportionately resulting in round number domain', function() {
              expect(index.domain()).toEqual([1, 10]);
            });

            it('Should have index domain scale correctly applied to time domain ', function() {
              expect(time.domain()).toEqual([new Date(1000), new Date(10000)]);
            });
          });

          describe('And zoom applied to translate index scale to the left', function() {
            var indexToTime;

            beforeEach(function() {
              indexToTime = d3.scaleLinear()
                .domain(index.domain())
                .range(time.domain().map(function(d) { return d.getTime(); }));

              // Move across to get symmetrical number on the domain
              index.domain(transform.translate(-111.11111111111111, 0).rescaleX(index).domain());
            });

            it('Should move proportionately resulting in round number domain', function() {
              expect(index.domain()).toEqual([1, 10]);
            });

            it('Should have index domain scale correctly applied to time domain ', function() {
              time.domain(index.domain().map(indexToTime));
              expect(time.domain()).toEqual([new Date(1000), new Date(10000)]);
            });

            it('Should have 10 ticks equaling input offset to left', function() {
              expect(time.ticks()).toEqual(timeData);
            });
          });
        });
      });
    });

    instanceBuilder.instance('actual (utc)', actualUtcInit, function(scope) {
      var financetime;

      describe('And domain and range is initialised', function() {
        beforeEach(function() {
          financetime = scope.financetime;
          financetime.domain(data).range([48, 1052]);
        });

        it('Then domain should equal the domain set', function() {
          expect(financetime.domain()).toEqual(data);
        });

        it('Then default tickFormat after ticks invoke should be day', function() {
          financetime.ticks();
          expect(financetime.tickFormat()(date.parseZonedIso8601('2012-01-20T00:00:00+1100'))).toEqual('Jan 19');
          expect(financetime.tickFormat()(date.parseZonedIso8601('2012-04-03T00:00:00+1100'))).toEqual('Apr  2');
        });

        describe('And initialised with 1 item', function() {
          beforeEach(function() {
            financetime.domain([new Date(0)]);
          });

          describe('And ticks invoked (for tickFormat state)', function() {
            beforeEach(function() {
              financetime.ticks();
            });

            it('Then tickFormat should be generic format', function() {
              expect(financetime.tickFormat()(new Date(1000))).toEqual(':01');
              expect(financetime.tickFormat()(date.parseZonedIso8601('2014-01-24T00:00:00+1100'))).toEqual('01 PM');
            });
          });
        });


        describe('And initialised with intraday data', function() {
          beforeEach(function() {
            financetime.domain(timeData);
          });

          describe('And ticks invoked (for tickFormat state)', function() {
            beforeEach(function() {
              financetime.ticks();
            });

            it('Then tickFormat should be intraday format', function() {
              expect(financetime.tickFormat()(new Date(1000))).toEqual(':01');
              expect(financetime.tickFormat()(date.parseZonedIso8601('2014-01-24T09:35:00+1100'))).toEqual('10:35');
              expect(financetime.tickFormat()(date.parseZonedIso8601('2014-01-01T00:00:00+1100'))).toEqual('01 PM');
            });
          });
        });
      });
    });
  });
});
