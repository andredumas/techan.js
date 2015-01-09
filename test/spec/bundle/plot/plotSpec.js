techanModule('plot/plot', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    return module(d3.scale.linear, d3.select);
  };

  specBuilder.require(require('../../../../src/plot/plot'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(scope) {
      var plot,
          x;

      beforeEach(function() {
        plot = scope.plot;
        x = techan.scale.financetime();
      });

      describe('And scale has a small domain and large range', function() {
        beforeEach(function() {
          x.range([0, 1000]);
        });

        it('Then barWidth should be scale band width', function() {
          expect(plot.barWidth(x)).toBe(x.band());
        });


        it('Then lineWidth should return default maximum line width', function() {
          expect(plot.lineWidth(x)()).toBe(1);
        });

        it('Then lineWidth should return passed maximum line width', function() {
          expect(plot.lineWidth(x, 2)()).toBe(2);
        });
      });

      describe('And scale has a large domain and small range', function() {
        beforeEach(function() {
          x.domain([new Date(0), new Date(1), new Date(2), new Date(3), new Date(4), new Date(5), new Date(6), new Date(7)])
            .range([0, 0.00001]);
        });

        it('Then barWidth should not be scale band', function() {
          expect(plot.barWidth(x)).not.toBe(x.band());
        });

        it('Then barWidth should return minimum width', function() {
          expect(plot.barWidth(x)).toBe(1);
        });

        it('Then lineWidth should return default minimum band divided by default divisor', function() {
          expect(plot.lineWidth(x, 3)()).toBe(1);
        });

        it('Then lineWidth should return minimum band divided by divisor', function() {
          expect(plot.lineWidth(x, 2, 2)()).toBe(0.5);
        });
      });
    });

    // TODO Test group logic...
  });
});