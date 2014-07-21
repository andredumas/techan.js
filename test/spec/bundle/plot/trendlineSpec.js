techanModule('plot/trendline', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/trendline'),
      domFixtures = require('../_fixtures/dom'),
      spies = { g: { parentNode: {} } };

  var actualInit = function() {
    return techan.plot.trendline;
  };

  var mockDragInit = function(trendline) {
    var plot = require('../../../../src/plot/plot'),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    spies.d3_behaviour_drag = jasmine.createSpy('d3_behaviour_drag');
    spies.d3_event = jasmine.createSpy('d3_event');
    spies.d3_select = jasmine.createSpy('d3_select');

    return trendline(spies.d3_behaviour_drag, spies.d3_event, spies.d3_select, techan.accessor.trendline, plot, plotMixin);
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
    });

    instanceBuilder.instance('mocked drag', mockDragInit, function(scope) {
      describe('And drag is initialised', function() {
        var trendline,
            origin = {},
            drag = {},
            dragSpies = {},
            selectSpies = {};

        beforeEach(function() {
          trendline = scope.trendline;
          trendline.xScale().domain([data[0].start.date, data[0].end.date, new Date("2014-03-08")])
            .range([0.48, 3.52]);

          // Easier way to mock this?
          spies.g.selectAll = jasmine.createSpy('selectAll');
          selectSpies.call = jasmine.createSpy('call');
          dragSpies.origin = jasmine.createSpy('origin');
          dragSpies.on = jasmine.createSpy('on');
          spies.g.selectAll.and.returnValue(selectSpies);
          spies.d3_behaviour_drag.and.returnValue(dragSpies);
          dragSpies.origin.and.returnValue(dragSpies);

          trendline.drag(spies.g);

          origin.start = dragSpies.origin.calls.argsFor(0)[0];
          origin.end = dragSpies.origin.calls.argsFor(1)[0];
          origin.body = dragSpies.origin.calls.argsFor(2)[0];
          drag.start = dragSpies.on.calls.argsFor(0)[1];
          drag.end = dragSpies.on.calls.argsFor(1)[1];
          drag.body = dragSpies.on.calls.argsFor(2)[1];

          selectSpies.attr = jasmine.createSpy('attr');
          spies.d3_select.and.returnValue(spies.g);
        });

        it('Then origin start should be defined', function() {
          expect(origin.start).toBeDefined();
        });

        it('Then origin start invoke returns the correct start coordinate location', function() {
          expect(origin.start(data[0])).toEqual({ x:1, y:14.81} );
        });

        it('Then origin end should be defined', function() {
          expect(origin.end).toBeDefined();
        });

        it('Then origin end invoke returns the correct start coordinate location', function() {
          expect(origin.end(data[0])).toEqual({ x:2, y:15.54 });
        });

        it('Then origin body should be defined', function() {
          expect(origin.body).toBeDefined();
        });

        it('Then origin body invoke returns the correct start coordinate location', function() {
          expect(origin.body(data[0])).toEqual({ x:0, y:0});
        });

        it('Then drag start should be defined', function() {
          expect(drag.start).toBeDefined();
        });

        it('Then drag start invoke with new coordinates should update the model', function() {
          spies.d3_event.and.returnValue({ x:2, y:1 });

          var datum = {
            start: { date: trendline.xScale().domain()[0], value: 10 },
            end: { date: trendline.xScale().domain()[1], value: 15 }
          };

          drag.start.call(spies.g, datum);
          expect(datum).toEqual({
            start: { date: trendline.xScale().domain()[1], value: 1 },
            end: { date: trendline.xScale().domain()[1], value: 15 } });
        });

        it('Then drag start of range that inverts to invalid domain should result in value being updated only', function() {
          spies.d3_event.and.returnValue({ x:-1, y:1 });

          var datum = {
              start: { date: trendline.xScale().domain()[0], value: 10 },
              end: { date: trendline.xScale().domain()[1], value: 15 }
            };

          drag.start.call(spies.g, datum);
          expect(datum).toEqual({
            start: { date: trendline.xScale().domain()[0], value: 1 },
            end: { date: trendline.xScale().domain()[1], value: 15 } });
        });

        it('Then drag end should be defined', function() {
          expect(drag.end).toBeDefined();
        });

        it('Then drag end invoke with new coordinates should update the model', function() {
          spies.d3_event.and.returnValue({ x:1, y:1 });

          var datum = {
            start: { date: trendline.xScale().domain()[0], value: 10 },
            end: { date: trendline.xScale().domain()[1], value: 15 }
          };

          drag.end.call(spies.g, datum);
          expect(datum).toEqual({
            start: { date: trendline.xScale().domain()[0], value: 10 },
            end: { date: trendline.xScale().domain()[0], value: 1 } });
        });

        it('Then drag body should be defined', function() {
          expect(drag.body).toBeDefined();
        });

        it('Then drag body invoke with new coordinates should move the diagonally right', function() {
          var datum = {
            start: { date: trendline.xScale().domain()[0], value: 10 },
            end: { date: trendline.xScale().domain()[1], value: 15 }
          };

          // Must call origin first, there is state information stored for origin
          origin.body(datum);
          spies.d3_event.and.returnValue({ x:1, y:1 });

          drag.body.call(spies.g, datum);
          expect(datum).toEqual({
            start: { date: trendline.xScale().domain()[1], value: 11 },
            end: { date: trendline.xScale().domain()[2], value: 16 } });
        });
      });
    });
  });
});