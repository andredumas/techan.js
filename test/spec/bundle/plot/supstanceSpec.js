techanModule('plot/supstance', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/supstance'),
      domFixtures = require('../_fixtures/dom'),
      spies = { g: { parentNode: {} } };

  var actualInit = function() {
    return techan.plot.supstance;
  };

  var mockDragInit = function(supstance) {
    var plot = require('../../../../src/plot/plot'),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    spies.d3_behaviour_drag = jasmine.createSpy('d3_behaviour_drag');
    spies.d3_event = jasmine.createSpy('d3_event');
    spies.d3_select = jasmine.createSpy('d3_select');

    return supstance(spies.d3_behaviour_drag, spies.d3_event, spies.d3_select, techan.accessor.value, plot, plotMixin);
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
          g = domFixtures.g([data]);
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

      instanceBuilder.instance('mocked drag', mockDragInit, function(scope) {
        describe('And drag is initialised', function() {
          var supstance,
              origin,
              drag,
              dragSpies = {},
              selectSpies = {};

          beforeEach(function() {
            supstance = scope.supstance;

            // Easier way to mock this?
            spies.g.selectAll = jasmine.createSpy('selectAll');
            selectSpies.call = jasmine.createSpy('call');
            dragSpies.origin = jasmine.createSpy('origin');
            dragSpies.on = jasmine.createSpy('on');
            spies.g.selectAll.and.returnValue(selectSpies);
            spies.d3_behaviour_drag.and.returnValue(dragSpies);
            dragSpies.origin.and.returnValue(dragSpies);

            supstance.drag(spies.g);

            origin = dragSpies.origin.calls.argsFor(0)[0];
            drag = dragSpies.on.calls.argsFor(0)[1];

            selectSpies.attr = jasmine.createSpy('attr');
            spies.d3_event.and.returnValue({ x:0, y:16 });
            spies.d3_select.and.returnValue(spies.g);
          });

          it('Then origin should be defined', function() {
            expect(origin).toBeDefined();
          });

          it('Then origin invoke returns the correct location of x:0 and y current value', function() {
            expect(origin(data[0])).toEqual({x:0, y:15.54});
          });

          it('Then drag should be defined', function() {
            expect(drag).toBeDefined();
          });

          it('Then drag invoke should update the model', function() {
            var datum = { value:15.54 };
            drag.call(spies.g, datum);
            expect(datum).toEqual({ value:16 });
          });
        });
      });
    });
  });
});