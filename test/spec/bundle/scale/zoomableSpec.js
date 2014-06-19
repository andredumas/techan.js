techanModule('scale/zoomable', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    return module;
  };

  var data = require('../_fixtures/data/ohlc').facebook.slice(0, 10).map(function(d) { return d.date; });

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

          describe('And translated by 50 left', function() {
            beforeEach(function() {
              zoom.translate([-50, 0]);
            });

            it('Then scale of first index should return scaled min range', function() {
              expect(linear(0)).toEqual(1.0204081632653061);
            });

            it('Then scale of last index should return max range', function() {
              expect(linear(10)).toEqual(1);
            });

            it('Then invert of min range should return scaled first domain', function() {
              expect(linear.invert(1.0204081632653061)).toEqual(0);
            });

            it('Then invert of max range should return last domain', function() {
              expect(linear.invert(1)).toEqual(10);
            });

            it('Then the callback is invoked', function() {
              expect(zoomedCallback).toHaveBeenCalled();
            });
          });

          describe('And scaled by 2', function() {
            beforeEach(function() {
              zoom.scale(2);
            });

            it('Then scale of first index should return min range', function() {
              expect(linear(0)).toEqual(0);
            });

            it('Then scale of last index should return 2 max range', function() {
              expect(linear(10)).toEqual(2);
            });

            it('Then invert of min range should return first domain', function() {
              expect(linear.invert(0)).toEqual(0);
            });

            it('Then invert of max range should return 2 last domain', function() {
              expect(linear.invert(2)).toEqual(10);
            });
          });
        });
      });
    });
  });
});