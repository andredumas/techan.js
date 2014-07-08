techanModule('scale/financetime', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function() {
    return techan.scale.financetime;
  };

  var data = require('../_fixtures/data/ohlc').facebook.slice(0, 10).map(function(d) { return d.date; }),
      timeData = require('../_fixtures/data/time').input;

  specBuilder.require(require('../../../../src/scale/financetime'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      var financetime = null;

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

        it('Then band should correct band', function() {
          expect(financetime.band()).toEqual(80);
        });

        it('Then scale of first index should return min range', function() {
          expect(financetime(data[0])).toEqual(100);
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

        it('Then invertToIndex of less than min range should return null', function() {
          expect(financetime.invertToIndex(40)).toBeNull();
        });

        it('Then invertToIndex of just under max range should return the last domain index', function() {
          expect(financetime.invertToIndex(1020)).toEqual(data.length-1);
        });

        it('Then invertToIndex of greater max range should return null', function() {
          expect(financetime.invertToIndex(1060)).toBeNull();
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
          expect(financetime.invert(40)).toBeNull();
        });

        it('Then invert of value after range, should return null', function() {
          expect(financetime.invert(1100)).toBeNull();
        });

        it('Then using invert as Array.prototyp.map(invert) of a value about half of range, should return mid domain', function() {
          expect([600].map(financetime.invert)).toEqual([data[5]]);
        });

        xit('Then ticks should return a distributed range of ticks', function() {
          expect(financetime.ticks()).toEqual([
            new Date(2012, 4, 19),
            new Date(2012, 4, 20),
            new Date(2012, 4, 21),
            new Date(2012, 4, 22),
            new Date(2012, 4, 23),
            new Date(2012, 4, 24),
            new Date(2012, 4, 25),
            new Date(2012, 4, 26),
            new Date(2012, 4, 27),
            new Date(2012, 4, 28),
            new Date(2012, 4, 29),
            new Date(2012, 4, 30),
            new Date(2012, 4, 31),
            new Date(2012, 5, 1)
          ]);
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

          xit('Then ticks should return a distributed range of ticks', function() {
            expect(cloned.ticks()).toEqual(financetime.ticks());
          });
        });

        describe('And a zoom applied', function() {
          var zoom,
              baselineScale;

          beforeEach(function() {
            zoom = d3.behavior.zoom();
            financetime = scope.financetime;
            zoom.x(financetime.zoomable());
            baselineScale = d3.scale.linear()
              .domain([-0.52, 9.52]) // Adjusted index domain taking to account the extra padding
              .range(financetime.range());
          });

          describe('And translated left', function() {
            beforeEach(function() {
              d3.behavior.zoom().x(baselineScale)
                  .scale(1.5).translate([-10, 0]);
              zoom.scale(1.5).translate([-10, 0]);
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
              expect(financetime(data[0])).toEqual(127.10303030303034);
            });

            it('Then baseline scale of last index should return max zoomed range', function() {
              expect(baselineScale(data.length-1)).toEqual(1490.0000000000002);
            });

            it('Then scale of last index should return max range', function() {
              expect(financetime(data[data.length-1])).toEqual(1496.19393939394);
            });

            xit('Then ticks should return offset tick values', function() {
              // TODO Filter out or adjust ticks that are not in the domain
              expect(financetime.ticks()).toEqual([
                new Date(2012,4,19),
                new Date(2012,4,20),
                new Date(2012,4,21),
                new Date(2012,4,22),
                new Date(2012,4,23),
                new Date(2012,4,24),
                new Date(2012,4,25),
                new Date(2012,4,26),
                new Date(2012,4,27)
              ]);
            });

            describe('And copied', function() {
              var cloned;

              beforeEach(function() {
                cloned = financetime.copy();
              });

              it('Then scale of first index should return min range', function() {
                expect(cloned(data[0])).toEqual(127.10303030303034);
              });

              it('Then scale of last index should return max range', function() {
                expect(cloned(data[data.length-1])).toEqual(1496.19393939394);
              });

              xit('Then ticks should return same offset tick values', function() {
                expect(cloned.ticks()).toEqual(financetime.ticks());
              });
            });
          });
        });

        describe('(SCRATCHPAD) And domain and range is initialised with symmetric data', function() {
          var index,
              time,
              zoomIndex,
              zoomTime;

          beforeEach(function() {
            index = d3.scale.linear().domain([0, timeData.length-1]).range([0, 1000]);
            time = d3.time.scale().domain([timeData[0], timeData[timeData.length-1]]).range([0, 1000]);
            zoomIndex = d3.behavior.zoom().x(index);
            zoomTime = d3.behavior.zoom().x(time);
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
              zoomIndex.translate([-111.11111111111111, 0]);
              zoomTime.translate([-111.11111111111111, 0]);
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
              indexToTime = d3.scale.linear()
                .domain(index.domain())
                .range(time.domain().map(function(d) { return d.getTime(); }));

              // Move across to get symmetrical number on the domain
              zoomIndex.translate([-111.11111111111111, 0]);
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
  });
});