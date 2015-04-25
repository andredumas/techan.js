techanModule('plot/trendline', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/trendline'),
      domFixtures = require('../_fixtures/dom'),
      spies = {};

  var actualInit = function() {
    return techan.plot.trendline;
  };

  var mockDragInit = function(trendline) {
    spies.d3_event = jasmine.createSpy('d3_event');
    spies.d3_select = jasmine.createSpy('d3_select');

    var plot = require('../../../../src/plot/plot')(d3.svg.line, spies.d3_select),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    return trendline(d3.behavior.drag, spies.d3_event, spies.d3_select, d3.dispatch, techan.accessor.trendline, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/trendline'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And trendline is initialised with defaults', function () {
        plotMixinShouldBeSetup(scope);

        var plot,
            g;

        beforeEach(function () {
          plot = scope.plot;
          plot.xScale().domain([data[0].start.date, data[0].end.date]);
          g = domFixtures.g(data);
        });

        it('Then .on should be defined', function() {
          expect(plot.on).toBeDefined();
        });

        it('Then on default invoke, it should render without error', function() {
          plot(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });

        it('Then on refresh invoke, it should be refreshed only', function() {
          plot(g);
          plot.refresh(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });
      });
    });

    instanceBuilder.instance('mocked select and event', mockDragInit, function(scope) {
      var trendline,
          selection;

      beforeEach(function() {
        trendline = scope.trendline;

        selection = jasmine.createSpyObj('selection', ['selectAll', 'call', 'parentNode', 'attr', 'classed']);
        selection.selectAll.and.returnValue(selection);
        selection.parentNode.and.returnValue(selection);
        selection.attr.and.returnValue(selection);
        selection.classed.and.returnValue(selection);
        spies.d3_select.and.returnValue(selection);
      });

      describe('And default plot is invoked', function() {
        var g,
          interactionSelection,
          mouseenter,
          mouseleave,
          mousemove;

        beforeEach(function () {
          g = domFixtures.g(data);

          trendline(g);

          interactionSelection = g.select('g.interaction');
          mouseenter = interactionSelection.on('mouseenter');
          mouseleave = interactionSelection.on('mouseleave');
          mousemove = interactionSelection.on('mousemove');
        });

        // Simple test here, they are fully tested in supstance
        it('Then mouseenter should be defined', function () {
          expect(mouseenter).toBeDefined();
        });

        it('Then mouseleave should be defined', function () {
          expect(mouseleave).toBeDefined();
        });

        it('Then mousemove should be defined', function () {
          expect(mousemove).toBeDefined();
        });
      });

      describe('And drag is initialised with drag listeners', function() {
        var origin,
            drag,
            listeners,
            datum;

        beforeEach(function() {
          trendline.xScale().domain([data[0].start.date, data[0].end.date, new Date(2014, 2, 8)])
            .range([0.48, 3.52]);
          datum = {
            start: { date: trendline.xScale().domain()[0], value: 10 },
            end: { date: trendline.xScale().domain()[1], value: 15 }
          };

          trendline.drag(selection);

          listeners = jasmine.createSpyObj('listeners', ['drag', 'dragstart', 'dragend']);
          trendline.on('drag', listeners.drag);
          trendline.on('dragstart', listeners.dragstart);
          trendline.on('dragend', listeners.dragend);
        });

        function assertCommonDrag() {
          var dragstart,
              dragend;

          beforeEach(function() {
            var dragBehavior = selection.call.calls.argsFor(0)[0];
            dragstart = dragBehavior.on('dragstart');
            dragend = dragBehavior.on('dragend');
          });

          it('Then dragstart should be defined', function() {
            expect(dragstart).toBeDefined();
          });

          describe('And dragstart is invoked', function() {
            beforeEach(function() {
              dragstart.call(selection, 321);
            });

            it('Then should set dragging class', function() {
              expect(selection.classed).toHaveBeenCalledWith('dragging', true);
            });

            it('Then should dispatch the dragstart event', function() {
              expect(listeners.dragstart).toHaveBeenCalledWith(321);
            });
          });

          it('Then dragend should be defined', function() {
            expect(dragend).toBeDefined();
          });

          describe('And dragend is invoked', function() {
            beforeEach(function() {
              dragend.call(selection, 123);
            });

            it('Then should clear dragging class', function() {
              expect(selection.classed).toHaveBeenCalledWith('dragging', false);
            });

            it('Then should dispatch the dragend event', function() {
              expect(listeners.dragend).toHaveBeenCalledWith(123);
            });
          });
        }

        describe('And the interaction circle start is obtained', function() {
          beforeEach(function() {
            var dragBehavior = selection.call.calls.argsFor(0)[0];
            origin = dragBehavior.origin();
            drag = dragBehavior.on('drag');
          });

          it('Then drag origin should be defined', function() {
            expect(origin).toBeDefined();
          });

          it('Then origin invoke returns the correct start coordinate location', function() {
            expect(origin(data[0])).toEqual({ x:1, y:14.81} );
          });

          it('Then drag should be defined', function() {
            expect(drag).toBeDefined();
          });

          describe('And drag start is invoked with new coordinates', function() {
            var expectedDatum;

            beforeEach(function() {
              spies.d3_event.and.returnValue({ x:2, y:1 });
              expectedDatum = {
                start: { date: trendline.xScale().domain()[1], value: 1 },
                end: { date: trendline.xScale().domain()[1], value: 15 }
              };

              drag.call(selection, datum);
            });

            it('Then the model should be updated', function() {
              expect(datum).toEqual(expectedDatum);
            });

            it('Then a drag event should be dispatched', function() {
              expect(listeners.drag).toHaveBeenCalledWith(expectedDatum);
            });
          });

          it('Then drag start of range that inverts to invalid domain should result in value being updated only', function() {
            spies.d3_event.and.returnValue({ x:-1, y:1 });

            drag.call(selection, datum);
            expect(datum).toEqual({
              start: { date: trendline.xScale().domain()[0], value: 1 },
              end: { date: trendline.xScale().domain()[1], value: 15 } });
          });

          assertCommonDrag();
        });

        describe('And the interaction circle end is obtained', function() {
          beforeEach(function() {
            var dragBehavior = selection.call.calls.argsFor(1)[0];
            origin = dragBehavior.origin();
            drag = dragBehavior.on('drag');
          });

          it('Then drag should be defined', function() {
            expect(drag).toBeDefined();
          });

          it('Then drag origin should be defined', function() {
            expect(origin).toBeDefined();
          });

          describe('And drag end is invoked with new coordinates', function() {
            var expectedDatum;

            beforeEach(function() {
              spies.d3_event.and.returnValue({ x:1, y:1 });

              expectedDatum = {
                start: { date: trendline.xScale().domain()[0], value: 10 },
                end: { date: trendline.xScale().domain()[0], value: 1 }
              };

              drag.call(selection, datum);
            });

            it('Then the model should be updated', function() {
              expect(datum).toEqual(expectedDatum);
            });

            it('Then a drag event should be dispatched', function() {
              expect(listeners.drag).toHaveBeenCalledWith(expectedDatum);
            });
          });

          it('Then origin invoke returns the correct start coordinate location', function() {
            expect(origin(data[0])).toEqual({ x:2, y:15.54 });
          });

          assertCommonDrag();
        });

        describe('And the interaction body is obtained', function() {
          beforeEach(function() {
            var dragBehavior = selection.call.calls.argsFor(2)[0];
            origin = dragBehavior.origin();
            drag = dragBehavior.on('drag');
          });

          it('Then origin should be defined', function() {
            expect(origin).toBeDefined();
          });

          it('Then origin invoke returns the correct start coordinate location', function() {
            expect(origin(data[0])).toEqual({ x:0, y:0});
          });

          it('Then drag should be defined', function() {
            expect(drag).toBeDefined();
          });

          describe('And drag body is invoked with new coordinates', function() {
            var expectedDatum;

            beforeEach(function() {
              expectedDatum = {
                start: { date: trendline.xScale().domain()[1], value: 11 },
                end: { date: trendline.xScale().domain()[2], value: 16 }
              };

              // Must call origin first, there is state information stored for origin
              origin(datum);
              spies.d3_event.and.returnValue({ x:1, y:1 });

              drag.call(selection, datum);
            });

            it('Then the model should move the diagonally right', function() {
              expect(datum).toEqual(expectedDatum);
            });

            it('Then a drag event should be dispatched', function() {
              expect(listeners.drag).toHaveBeenCalledWith(expectedDatum);
            });
          });

          assertCommonDrag();
        });
      });
    });
  });
});