techanModule('plot/supstance', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/supstance'),
      domFixtures = require('../_fixtures/dom'),
      spies = {};

  var actualInit = function() {
    return techan.plot.supstance;
  };

  var mockEventInit = function(supstance) {
    spies.d3_event = jasmine.createSpy('d3_event');
    spies.d3_select = jasmine.createSpy('d3_select');

    var plot = require('../../../../src/plot/plot')(d3.svg.line, spies.d3_select),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    return supstance(d3.behavior.drag, spies.d3_event, spies.d3_select, d3.dispatch, techan.accessor.value, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/supstance'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And supstance is initialised with defaults', function () {
        plotMixinShouldBeSetup(scope);

        var plot,
            g;

        beforeEach(function () {
          plot = scope.plot;
          plot.xScale().domain([data[0].start, data[0].end]);
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

      describe('And supstance is initialised with annotation', function () {
        plotMixinShouldBeSetup(scope);

        var plot,
          g;

        beforeEach(function () {
          plot = scope.plot;
          plot.xScale().domain([data[0].start, data[0].end]);
          plot.annotation(techan.plot.axisannotation());
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

    instanceBuilder.instance('mocked select and event', mockEventInit, function(scope) {
      var supstance,
          selection,
          annotation;

      beforeEach(function() {
        supstance = scope.supstance;
        // This is painful and not asserting anything other than successful execution. Needs improvement
        annotation = function() {}; // Base annotation mock
        var annotationObject = jasmine.createSpyObj('annotation', ['accessor', 'axis', 'scale', 'invert', 'refresh']);
        annotation.axis = annotationObject.axis;
        annotation.scale = annotationObject.scale;
        annotation.accessor = annotationObject.accessor;
        annotation.invert = annotationObject.invert;
        annotation.refresh = annotationObject.refresh;
        annotationObject.axis.and.returnValue(annotation);
        annotationObject.scale.and.returnValue(annotation);
        annotationObject.accessor.and.returnValue(function() {});
        supstance.annotation(annotation);

        selection = jasmine.createSpyObj('selection', ['selectAll', 'call', 'parentNode', 'attr', 'classed', 'each']);
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

        beforeEach(function() {
          g = domFixtures.g(data);

          supstance(g);

          interactionSelection = g.select('g.interaction');
          mouseenter = interactionSelection.on('mouseenter');
          mouseleave = interactionSelection.on('mouseleave');
          mousemove = interactionSelection.on('mousemove');
        });

        it('Then mouseenter should be defined', function() {
          expect(mouseenter).toBeDefined();
        });

        it('Then mouseleave should be defined', function() {
          expect(mouseleave).toBeDefined();
        });

        it('Then mousemove should be defined', function() {
          expect(mousemove).toBeDefined();
        });

        describe('And mouse listeners set', function() {
          var listeners;

          beforeEach(function() {
            listeners = jasmine.createSpyObj('listeners', ['mouseenter', 'mouseout', 'mousemove']);
            supstance.on('mouseenter', listeners.mouseenter);
            supstance.on('mouseout', listeners.mouseout);
            supstance.on('mousemove', listeners.mousemove);
          });

          describe('And mouseenter is invoked', function() {
            beforeEach(function() {
              mouseenter.call(interactionSelection.node(), 213);
            });

            it('Then should set mouseover class', function() {
              expect(selection.classed).toHaveBeenCalledWith('mouseover', true);
            });

            it('Then should dispatch the mouseenter event', function() {
              expect(listeners.mouseenter).toHaveBeenCalledWith(213);
            });
          });

          describe('And the mouseover class is set', function() {
            beforeEach(function() {
              g.select('g.data').classed('mouseover', true);
              spies.d3_select.and.returnValue(g.select('g.data'));
            });

            describe('And mouseleave is invoked', function() {
              beforeEach(function() {
                mouseleave.call(interactionSelection.node(), 321);
              });

              it('Then the mouseover class should be cleared', function() {
                expect(g.select('g.data').classed('mouseover')).toBe(false);
              });

              it('Then the mouseout event should be dispatched', function() {
                expect(listeners.mouseout).toHaveBeenCalledWith(321);
              });
            });

            describe('And dragging class is set', function() {
              beforeEach(function() {
                g.select('g.data').classed('dragging', true);
              });

              describe('And mouseleave is invoked', function() {
                beforeEach(function() {
                  mouseleave.call(interactionSelection.node(), 321);
                });

                it('Then the mouseover class should still be set', function() {
                  expect(g.select('g.data').classed('mouseover')).toBe(true);
                });

                it('Then the mouseover event should not be dispatched', function() {
                  expect(listeners.mouseout).not.toHaveBeenCalled();
                });
              });
            });
          });

          describe('And mousemove is invoked', function() {
            beforeEach(function() {
              mousemove(123);
            });

            it('Then should dispatch the mousemove event', function() {
              expect(listeners.mousemove).toHaveBeenCalledWith(123);
            });
          });
        });
      });

      describe('And drag is initialised', function() {
        var origin,
            drag,
            dragstart,
            dragend;

        beforeEach(function() {
          spies.d3_event.and.returnValue({ x:0, y:16 });

          supstance.drag(selection);

          var dragBehavior = selection.call.calls.argsFor(0)[0];
          origin = dragBehavior.origin();
          drag = dragBehavior.on('drag');
          dragstart = dragBehavior.on('dragstart');
          dragend = dragBehavior.on('dragend');
        });

        it('Then drag should be defined', function() {
          expect(drag).toBeDefined();
        });

        it('Then dragstart should be defined', function() {
          expect(dragstart).toBeDefined();
        });

        it('Then dragend should be defined', function() {
          expect(dragend).toBeDefined();
        });

        it('Then origin should be defined', function() {
          expect(origin).toBeDefined();
        });

        describe('And origin is invoked', function() {
          var result;

          beforeEach(function() {
            result = origin(data[0]);
          });

          it('Then result is the location of x:0 and y current value', function() {
            expect(result).toEqual({x:0, y:15.54});
          });
        });

        describe('And drag listeners set', function() {
          var listeners;

          beforeEach(function() {
            listeners = jasmine.createSpyObj('listeners', ['drag', 'dragstart', 'dragend']);
            supstance.on('drag', listeners.drag);
            supstance.on('dragstart', listeners.dragstart);
            supstance.on('dragend', listeners.dragend);
          });

          describe('And drag is invoked', function() {
            var datum;

            beforeEach(function() {
              datum = { value:15.54 };
              drag.call(selection, datum);
            });

            it('Then drag invoke should update the model', function() {
              expect(datum).toEqual({ value:16 });
            });

            it('Then should dispatch the drag event', function() {
              expect(listeners.drag).toHaveBeenCalledWith({ value: 16 });
            });
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
        });
      });
    });
  });
});