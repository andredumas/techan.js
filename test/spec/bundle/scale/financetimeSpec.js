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

        it('Then ticks should return a distributed range of ticks', function() {
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
            expect(cloned.range()).toEqual([100, 120]);
          });
        });

        describe('And a zoom applied', function() {
          var zoom;

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

            it('Then ticks should return offset tick values', function() {
              // TODO Filter out or adjust ticks that are not in the domain
              expect(financetime.ticks()).toEqual([
                new Date(2012,5,3),
                new Date(2012,5,5),
                new Date(2012,5,7),
                new Date(2012,5,9),
                new Date(2012,5,11),
                new Date(2012,5,13),
                new Date(2012,5,15),
                new Date(2012,5,17),
                new Date(2012,5,19),
                new Date(2012,5,21)
              ]);
            });

            xdescribe('And copied', function() {
              var cloned;

              beforeEach(function() {
                cloned = financetime.copy();
              });

              it('Then ticks should return same offset tick values', function() {
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

            xit('Should have 10 ticks equaling input offset to left', function() {
              expect(time.ticks()).toEqual(timeData);
            });
          });
        });
      });
    });
  });
});