techanModule('scale/zoomable', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    return module;
  };

  specBuilder.require(require('../../../../src/scale/zoomable'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      var zoomable,
          linear;

      describe('And initialised with a scale and callback', function() {
        var zoomedCallback;

        beforeEach(function() {
          zoomedCallback = jasmine.createSpy('zoomedCallback');
          linear = d3.scaleLinear().domain([0,10]);
          zoomable = scope.zoomable(linear, zoomedCallback, { domain: linear.domain() });
        });

        it('Then the default scale function should behave like the underlying linear scale', function() {
          expect(zoomable(4)).toEqual(linear(4));
        });

        it('Then returns the domain when reading the domain', function() {
          expect(zoomable.domain()).toEqual([0, 10]);
        });

        it('Then throws an exception when writing the range', function() {
          expect(function() {
            zoomable.range([]);
          }).toThrow();
        });

        it('Then scale of first index should return scaled min range', function() {
          expect(linear(0)).toEqual(0);
        });

        it('Then scale of last index should return max range', function() {
          expect(linear(10)).toEqual(1);
        });

        it('Then the range should be default', function() {
          expect(linear.range()).toEqual([0, 1]);
        });

        it('Then setting domain outside of undlerying linear indexes should clamp', function() {
          expect(zoomable.domain([-1, 11]).domain()).toEqual([0, 10]);
        });

        describe('And copied', function() {
          var cloned;

          beforeEach(function() {
            cloned = zoomable.copy();
          });

          it('Then should not be equal to source', function() {
            expect(cloned).not.toEqual(zoomable);
          });

          it('Then setting domain outside of undlerying linear indexes should clamp', function() {
            expect(cloned.domain([-1, 11]).domain()).toEqual([0, 10]);
          });
        });

        describe('And a zoom applied', function() {
          var transform;

          beforeEach(function() {
            transform = d3.zoomTransform(this);
          });

          describe('And translated to the left', function() {
            beforeEach(function() {
              zoomable.domain(transform.translate(-11, 0).rescaleX(zoomable).domain());
            });

            it('Then scale of first index should return scaled min range', function() {
              expect(linear(0)).toEqual(1.1);
            });

            it('Then scale of last index should return max range', function() {
              expect(linear(10)).toEqual(1);
            });

            it('Then the callback is invoked', function() {
              expect(zoomedCallback).toHaveBeenCalled();
            });
          });

          describe('And scaled by 2', function() {
            beforeEach(function() {
              zoomable.domain(transform.translate(-1, 0).scale(2).rescaleX(zoomable).domain());
            });

            it('Then scale of first index should return min range', function() {
              expect(linear(0)).toEqual(-1);
            });

            it('Then scale of last index should return 2 max range', function() {
              expect(linear(10)).toEqual(1);
            });
          });
        });

        describe('And domain clamp is disabled', function() {
          beforeEach(function() {
            zoomable.clamp(false);
          });

          it('Then setting domain outside of undlerying linear indexes wont clamp', function() {
            expect(zoomable.domain([-1, 11]).domain()).toEqual([-1, 11]);
          });
        });
      });
    });
  });
});