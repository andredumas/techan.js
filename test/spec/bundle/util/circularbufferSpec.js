techanModule('util/circularbuffer', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module(d3);
  };

  specBuilder.require(require('../../../../src/util/circularbuffer'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(bucket) {
      it('And circularbuffer should be defined', function() {
        expect(bucket.circularbuffer).toBeDefined();
      });

      describe('And constructed with size of 3', function() {
        var cb;

        beforeEach(function() {
          cb = bucket.circularbuffer(3);
        });

        it('Then has a size of 3', function() {
          expect(cb.size()).toEqual(3);
        });

        it('Then samples is empty', function() {
          expect(cb.samples()).toEqual([]);
        });

        it('Then primed is false', function() {
          expect(cb.primed()).toEqual(false);
        });

        it('Then head is undefined', function() {
          expect(cb.head()).toBeUndefined();
        });

        it('Then last is undefined', function() {
          expect(cb.last()).toBeUndefined();
        });

        it('Then get(0) is undefined', function() {
          expect(cb.get(0)).toBeUndefined();
        });

        describe('And an item is pushed', function() {
          beforeEach(function() {
            cb.push(30);
          });

          it('Then has a size of 3', function() {
            expect(cb.size()).toEqual(3);
          });

          it('Then samples contains a single item', function() {
            expect(cb.samples()).toEqual([30]);
          });

          it('Then primed is false', function() {
            expect(cb.primed()).toEqual(false);
          });

          it('Then head is the item that was pushed', function() {
            expect(cb.head()).toEqual(30);
          });

          it('Then last is the item that was pushed', function() {
            expect(cb.last()).toEqual(30);
          });

          it('Then get(0) is the item that was pushed', function() {
            expect(cb.get(0)).toEqual(30);
          });

          describe('And a second item is pushed', function() {
            beforeEach(function() {
              cb.push(40);
            });

            it('Then has a size of 3', function() {
              expect(cb.size()).toEqual(3);
            });

            it('Then samples contains 2 items', function() {
              expect(cb.samples()).toEqual([30, 40]);
            });

            it('Then primed is false', function() {
              expect(cb.primed()).toEqual(false);
            });

            it('Then head is the last item that was pushed', function() {
              expect(cb.head()).toEqual(40);
            });

            it('Then last is the first item that was pushed', function() {
              expect(cb.last()).toEqual(30);
            });

            it('Then get(0) is the last item that was pushed', function() {
              expect(cb.get(0)).toEqual(40);
            });

            describe('And a third item is pushed', function() {
              beforeEach(function() {
                cb.push(50);
              });

              it('Then has a size of 3', function() {
                expect(cb.size()).toEqual(3);
              });

              it('Then samples contains a  all items', function() {
                expect(cb.samples()).toEqual([30, 40, 50]);
              });

              it('Then primed is false', function() {
                expect(cb.primed()).toEqual(true);
              });

              it('Then head is the last item that was pushed', function() {
                expect(cb.head()).toEqual(50);
              });

              it('Then last is the first item that was pushed', function() {
                expect(cb.last()).toEqual(30);
              });

              it('Then get(0) is the last item that was pushed', function() {
                expect(cb.get(0)).toEqual(50);
              });

              it('Then get(1) is the second item that was pushed', function() {
                expect(cb.get(1)).toEqual(40);
              });

              describe('And a forth item is pushed', function() {
                beforeEach(function() {
                  cb.push(60);
                });

                it('Then has a size of 3', function() {
                  expect(cb.size()).toEqual(3);
                });

                it('Then samples contains a single item', function() {
                  expect(cb.samples()).toEqual([60, 40, 50]);
                });

                it('Then primed is false', function() {
                  expect(cb.primed()).toEqual(true);
                });

                it('Then head is the last item that was pushed', function() {
                  expect(cb.head()).toEqual(60);
                });

                it('Then last is the second item that was pushed (the first has been dropped)', function() {
                  expect(cb.last()).toEqual(40);
                });

                it('Then get(0) is the last item that was pushed', function() {
                  expect(cb.get(0)).toEqual(60);
                });

                it('Then get(1) is the second item that was pushed', function() {
                  expect(cb.get(1)).toEqual(50);
                });
              });
            });
          });
        });
      });
    });
  });
});