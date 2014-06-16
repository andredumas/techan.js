techanModule('plot/volume', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = ohlc.facebook.slice(0, 2);

  var actualInit = function() {
    return techan.plot.volume;
  };

  specBuilder.require(require('../../../../src/plot/volume'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And volume is initialised with defaults', function () {
        var volume,
            accessor,
            g;

        beforeEach(function () {
          volume = scope.volume;
          g = gFixture(data);
        });

        it('Then on default invoke, volume should be rendered without error', function() {
          // TODO Assert the result/DOM
          volume(g);
        });

        xit('Then on default invoke, should not render up/down classes', function() {});

        it('Then on refresh invoke, volume should be refreshed only', function() {
          // TODO Assert the result/DOM
          volume(g);
          volume.refresh(g);
        });

        assertPlotMixin(scope);

        describe('And accessor is ohlc', function() {
          beforeEach(function() {
            accessor = techan.accessor.ohlc();
            volume.accessor(accessor);
          });

          xit('Then on default invoke, up/down classes should be rendered', function() {});
        });
      });
    });
  });
});