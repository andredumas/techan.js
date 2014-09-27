techanModule('plot/volume', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('../_fixtures/data/ohlc').alternating.array,
      invalidvolume = require('../_fixtures/data/ohlc').invalidvolume.array,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.volume;
  };

  specBuilder.require(require('../../../../src/plot/volume'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And volume is initialised with defaults', function () {
        var volume,
            accessor,
            g;

        plotShouldRenderWithoutError(scope, data, domFixtures);
        plotMixinShouldBeSetup(scope);

        beforeEach(function () {
          volume = scope.volume;
          volume.xScale().domain(data.map(function(d) { return d.date; }));
          g = domFixtures.g(data);
        });

        it('Then on default invoke, should not render up/down classes', function() {
          volume(g);
          expect(g[0][0].innerHTML).not.toContain('up');
          expect(g[0][0].innerHTML).not.toContain('down');
        });

        describe('And accessor is ohlc', function() {
          beforeEach(function() {
            accessor = techan.accessor.ohlc();
            volume.accessor(accessor);
          });

          it('Then on default invoke, up/down classes should be rendered', function() {
            volume(g);
            volume.refresh(g);
            expect(g[0][0].innerHTML).toContain('up');
            expect(g[0][0].innerHTML).toContain('down');
          });
        });

        describe('And data contains invalid volume entry', function() {
          plotShouldRenderWithoutError(scope, invalidvolume, domFixtures);
          plotMixinShouldBeSetup(scope);
        });
      });
    });
  });
});