techanModule('plot/volume', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = ohlc.facebook.slice(0, 2);

  var actualInit = function() {
    return techan.plot.volume;
  };

  specBuilder.require(require('../../../../src/plot/volume'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And volume is initialised with defaults', function () {
        var volume,
            accessor,
            g;

        beforeEach(function () {
          volume = bucket.volume;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, volume should be rendered without error', function() {
          // TODO Assert the result/DOM
          volume(g, data);
        });

        xit('Then on default invoke, should not render up/down classes', function() {});

        it('Then on refresh invoke, volume should be refreshed only', function() {
          // TODO Assert the result/DOM
          volume(g, data);
          volume.refresh(g);
        });

        it('Then the plot mixin methods should be defined', function () {
          expect(volume.xScale).toBeDefined();
          expect(volume.yScale).toBeDefined();
          expect(volume.accessor).toBeDefined();
        });

        describe('And accessor is ohlc', function() {
          beforeEach(function() {
            accessor = techan.accessor.ohlc();
            volume.accessor(accessor);
          });

          it('Then the accessor should equal the set ohlc accessor', function () {
            expect(volume.accessor()).toEqual(accessor);
          });

          xit('Then on default invoke, up/down classes should be rendered', function() {});
        });
      });
    });
  });
});