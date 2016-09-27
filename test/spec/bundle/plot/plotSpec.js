techanModule('plot/plot', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom'),
      data = require('../_fixtures/data/ohlc').alternating.array;

  var actualInit = function(module) {
    return module(d3.line, d3.area, d3.select);
  };

  specBuilder.require(require('../../../../src/plot/plot'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(scope) {
      var plot,
          x;

      beforeEach(function() {
        plot = scope.plot;
        x = techan.scale.financetime();
      });

      describe('And I have the DataSelector', function() {
        var DataSelector;

        beforeEach(function() {
          DataSelector = plot.dataSelector;
        });

        it('Then is defined', function() {
          expect(DataSelector).toBeDefined();
        });
        it('Then mappers are defined', function() {
          expect(DataSelector.mapper).toBeDefined();
          expect(DataSelector.mapper.unity).toBeDefined();
          expect(DataSelector.mapper.array).toBeDefined();
        });

        describe('And constructed with scope, data on the root element and selection made', function() {
          var dataSelector,
              dataSelection,
              g;

          beforeEach(function() {
            dataSelector = DataSelector(DataSelector.mapper.unity).scope('ascope');
            g = domFixtures.g([1, 2]);
            spyOn(g, 'selectAll').and.callThrough();
            dataSelection = dataSelector(g);
          });

          it('Then correct classes must be placed on the select', function() {
            expect(g.selectAll).toHaveBeenCalledWith('g.data.scope-ascope');
          });

          it('Then have selection defined', function() {
            expect(dataSelection.selection).toBeDefined();
          });

          it('Then have entry defined', function() {
            expect(dataSelection.entry).toBeDefined();
          });

          it('Then selection should have 2 new elements', function() {
            expect(dataSelection.selection.nodes().length).toBe(2);
          });

          it('Then a correct basic structure created', function() {
            expect(g.node().outerHTML).toEqual('<g class="root"><g class="data scope-ascope"></g><g class="data scope-ascope"></g></g>');
          });

          describe('And on data removal', function() {
            beforeEach(function() {
              g.datum([1]);
              dataSelection = dataSelector(g);
            });

            it('Then selection should have 1 new element', function() {
              expect(dataSelection.selection.nodes().length).toBe(1);
            });

            it('Then a correct basic structure updated', function() {
              expect(g.node().outerHTML).toEqual('<g class="root"><g class="data scope-ascope"></g></g>');
            });
          });
        });
      });

      describe('And I have a path generator that returns a path', function() {
        function pathGenerator() {
          return function(d) {
            return 'L 123 M 1 Z';
          };
        }

        it('Then joinPath will join the paths together to a single string', function() {
          // Don't care about values in the data array
          expect(plot.joinPath(pathGenerator)([undefined, undefined, undefined])).toEqual('L 123 M 1 Z L 123 M 1 Z L 123 M 1 Z');
        });
      });

      describe('And scale has a small domain and large range', function() {
        beforeEach(function() {
          x.range([0, 1000]);
        });

        it('Then barWidth should be scale band width', function() {
          expect(plot.barWidth(x)).toBe(x.band());
        });


        it('Then scaledStrokeWidth should return default maximum line width', function() {
          expect(plot.scaledStrokeWidth(x)()).toBe('1px');
        });

        it('Then scaledStrokeWidth should return passed maximum line width', function() {
          expect(plot.scaledStrokeWidth(x, 2)()).toBe('2px');
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

        it('Then scaledStrokeWidth should return default minimum band divided by default divisor', function() {
          expect(plot.scaledStrokeWidth(x, 3)()).toBe('1px');
        });

        it('Then scaledStrokeWidth should return minimum band divided by divisor', function() {
          expect(plot.scaledStrokeWidth(x, 2, 2)()).toBe('0.5px');
        });
      });

      describe('And appendUpDownEqual invoked with default alternating (up,down,even) ohlc fixture', function() {
        var g,
            parent;

        beforeEach(function() {
          g = domFixtures.g([data]);
          plot.appendPathsUpDownEqual(g, techan.accessor.ohlc(), "grouping-test");
          parent = g.node();
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
          x = d3.scaleTime();
        });

        it('Then barWidth should return the default width', function() {
          expect(plot.barWidth(x)).toBe(3);
        });
      });
    });
  });
});