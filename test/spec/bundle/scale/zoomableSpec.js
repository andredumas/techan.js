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
          linear = d3.scale.linear().domain([0,10]);
          zoomable = scope.zoomable(linear, zoomedCallback);
        });

        it('Then throws an exception when reading the domain', function() {
          expect(zoomable.domain).toThrow();
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

        describe('And copied', function() {
          var cloned;

          beforeEach(function() {
            cloned = zoomable.copy();
          });

          it('Then should not be equal to source', function() {
            expect(cloned).not.toEqual(zoomable);
          });
        });

        describe('And a zoom applied', function() {
          var zoom = null;

          beforeEach(function() {
            zoom = d3.behavior.zoom();
            zoom.x(zoomable);
          });

          describe('And translated to the left', function() {
            beforeEach(function() {
              zoom.translate([-11, 0]);
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
              zoom.scale(2).translate([-1,0]);
            });

            it('Then scale of first index should return min range', function() {
              expect(linear(0)).toEqual(-1);
            });

            it('Then scale of last index should return 2 max range', function() {
              expect(linear(10)).toEqual(1);
            });
          });
        });
      });
    });
  });
});