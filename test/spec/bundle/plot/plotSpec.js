techanModule('plot/plot', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom'),
      data = require('../_fixtures/data/ohlc').alternating.array;

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

      describe('And appendUpDownEqual invoked with default alternating (up,down,even) ohlc fixture', function() {
        var g,
            parent;

        beforeEach(function() {
          g = domFixtures.g([data]);
          plot.appendPathsUpDownEqual(g, techan.accessor.ohlc(), "grouping-test");
          parent = g[0][0];
        });

        it('Then 3 nodes should be appended', function() {
          expect(parent.childNodes.length).toEqual(3);
        });

        it('Then the first child element should be path.test.up', function() {
          expect(parent.childNodes[0].nodeName.toLowerCase()).toEqual('path');
          expect(parent.childNodes[0].className).toEqual('grouping-test up');
        });
        it('Then the second child element should be path.test.down', function() {
          expect(parent.childNodes[1].nodeName.toLowerCase()).toEqual('path');
          expect(parent.childNodes[1].className).toEqual('grouping-test down');
        });

        it('Then the third child element should be path.test.equal', function() {
          expect(parent.childNodes[2].nodeName.toLowerCase()).toEqual('path');
          expect(parent.childNodes[2].className).toEqual('grouping-test equal');
        });
      });

      describe('And scale is a d3 time scale', function() {
        var x;

        beforeEach(function() {
          x = d3.time.scale();
        });

        it('Then barWidth should return the default width', function() {
          expect(plot.barWidth(x)).toBe(3);
        });
      });
    });
  });
});