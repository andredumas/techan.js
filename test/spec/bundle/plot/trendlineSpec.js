techanModule('plot/trendline', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom'),
      spies = {};

  var actualInit = function() {
    return techan.plot.trendline;
  };

  var mockDragInit = function(trendline) {
    spies.d3_event = jasmine.createSpy('d3_event');
    spies.d3_select = jasmine.createSpy('d3_select');

    var plot = require('../../../../src/plot/plot')(d3.line, d3.area, spies.d3_select),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scaleLinear, d3.functor, techan.scale.financetime);

    return trendline(d3.behavior.drag, spies.d3_event, spies.d3_select, d3.dispatch, techan.accessor.trendline, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/trendline'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {

      beforeEach(function() {
        scope.plot.xScale().outerPadding(0).domain(
            [new Date(2014, 2, 5), new Date(2014, 2, 6), new Date(2014, 2, 7), new Date(2014, 2, 8), new Date(2014, 2, 9)]
          ).range([0, 4]);
          scope.plot.yScale().domain([0, 9]).range([0, 90]);
      });

      describe('And trendline is initialised with defaults', function () {
        var data = [{ start: { date: new Date(2014, 2, 5), value: 3 }, end: { date: new Date(2014, 2, 7), value: 5 } }];

        beforeEach(function() {
          // Trendline mutates data on move, initialise every time
          data[0] = { start: { date: new Date(2014, 2, 5), value: 3 }, end: { date: new Date(2014, 2, 7), value: 5 } };
        });

        PlotRenderTester(domFixtures)
          .scope(scope)
          .data(data)
          .domAssertions(assertDom)
          .dataElementsCount(1)
          .childElementCount(2)
          .testRender()
          .testMixin();

        function assertDom(scope) {
          var childElements,
              dataSelection;

          beforeEach(function() {
            childElements = scope.childElements;
            dataSelection = d3.selectAll(scope.dataElements);
          });

          describe('And on obtaining the data element', function() {
            it('Then contains a trendline group', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<g class="trendline"><path class="body" d="M 0 30 L 2 50"></path><circle class="start" r="1" cx="0" cy="30"></circle><circle class="end" r="1" cx="2" cy="50"></circle></g>');
            });

            it('Then contains an interaction group', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<g class="interaction" style="opacity: 0; fill: none;"><path class="body" d="M 0 30 L 2 50" style="stroke-width: 16px;"></path><circle class="start" r="8" cx="0" cy="30"></circle><circle class="end" r="8" cx="2" cy="50"></circle></g>');
            });

            it('Then the mouse over class should not be applied', function() {
              expect(dataSelection.classed('mouseover')).toBe(false);
            });

            // TODO Drag events... sigh
            describe('And obtaining the interaction element', function() {
              var interaction;

              beforeEach(function() {
                interaction = childElements[1];
              });

              describe('And on mouseenter', function() {
                var enterListener;

                beforeEach(function() {
                  enterListener = jasmine.createSpy('enterListener');
                  scope.plot.on('mouseenter', enterListener);

                  var event = document.createEvent('MouseEvent');
                  event.initMouseEvent('mouseenter');
                  interaction.dispatchEvent(event);
                });

                it('Then the mouseover class is applied to the trendline', function() {
                  expect(dataSelection.classed('mouseover')).toBe(true);
                });

                it('Then the mouse enter dispatcher is called', function() {
                  expect(enterListener).toHaveBeenCalledWith(data[0]);
                });

                describe('And on mousemove with valid coordinates', function() {
                  var moveListener;

                  beforeEach(function() {
                    moveListener = jasmine.createSpy('moveListener');
                    scope.plot.on('mousemove', moveListener);

                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent('mousemove', false, false, window, 0, 0, 0, 0, 0);
                    interaction.dispatchEvent(event);
                  });

                  it('Then the mouse move dispatcher is called with the right coordinates', function() {
                    expect(moveListener).toHaveBeenCalledWith(data[0]);
                  });

                  it('Then the mouseover class is applied to the trendline', function() {
                    expect(dataSelection.classed('mouseover')).toBe(true);
                  });
                });

                describe('And on mouseout', function() {
                  var outListener;

                  beforeEach(function() {
                    outListener = jasmine.createSpy('outListener');
                    scope.plot.on('mouseout', outListener);

                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent('mouseleave');
                    interaction.dispatchEvent(event);
                  });

                  it('Then the mouseover class is removed from the trendline', function() {
                    expect(dataSelection.classed('mouseover')).toBe(false);
                  });

                  it('Then the mouse enter dispatcher is called', function() {
                    expect(outListener).toHaveBeenCalledWith(data[0]);
                  });
                });
              });

              assertDrag('And on body drag start',
                'path', 0,
                { start: { date: new Date(2014, 2, 6), value: 4 }, end: { date: new Date(2014, 2, 8), value: 6 } },
                '<g class="trendline"><path class="body" d="M 1 40 L 3 60"></path><circle class="start" r="1" cx="1" cy="40"></circle><circle class="end" r="1" cx="3" cy="60"></circle></g>',
                '<g class="interaction" style="opacity: 0; fill: none;"><path class="body" d="M 1 40 L 3 60" style="stroke-width: 16px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><circle class="start" r="8" cx="1" cy="40" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle><circle class="end" r="8" cx="3" cy="60" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle></g>'
              );

              assertDrag('And on left end drag start',
                'circle', 0,
                { start: { date: new Date(2014, 2, 6), value: 4 }, end: { date: new Date(2014, 2, 7), value: 5 } },
                '<g class="trendline"><path class="body" d="M 1 40 L 2 50"></path><circle class="start" r="1" cx="1" cy="40"></circle><circle class="end" r="1" cx="2" cy="50"></circle></g>',
                '<g class="interaction" style="opacity: 0; fill: none;"><path class="body" d="M 1 40 L 2 50" style="stroke-width: 16px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><circle class="start" r="8" cx="1" cy="40" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle><circle class="end" r="8" cx="2" cy="50" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle></g>'
              );

              assertDrag('And on right end drag start',
                'circle', 1,
                { start: { date: new Date(2014, 2, 5), value: 3 }, end: { date: new Date(2014, 2, 8), value: 6 } },
                '<g class="trendline"><path class="body" d="M 0 30 L 3 60"></path><circle class="start" r="1" cx="0" cy="30"></circle><circle class="end" r="1" cx="3" cy="60"></circle></g>',
                '<g class="interaction" style="opacity: 0; fill: none;"><path class="body" d="M 0 30 L 3 60" style="stroke-width: 16px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></path><circle class="start" r="8" cx="0" cy="30" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle><circle class="end" r="8" cx="3" cy="60" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></circle></g>'
              );

              function assertDrag(describeText, element, index, expectedData, expectedTrendline, expectedInteraction) {
                describe(describeText, function() {
                  var dragStartListener,
                      dragInteraction;

                  beforeEach(function() {
                    dragInteraction = d3.select(interaction).selectAll(element).nodes()[index];
                    dragStartListener = jasmine.createSpy('dragStartListener');
                    scope.plot.drag(scope.g);
                    scope.plot.on('dragstart', dragStartListener);

                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent('mousedown', false, false, window);
                    dragInteraction.dispatchEvent(event);
                  });

                  it('Then the dragging class is added', function() {
                    expect(dataSelection.classed('dragging')).toBe(true);
                  });

                  it('Then the drag start dispatcher is called', function() {
                    expect(dragStartListener).toHaveBeenCalledWith(data[0]);
                  });

                  describe('And on body drag', function() {
                    var dragListener;

                    beforeEach(function() {
                      dragListener = jasmine.createSpy('dragListener');
                      scope.plot.on('drag', dragListener);

                      var event = document.createEvent('MouseEvent');
                      event.initMouseEvent('mousemove', false, false, window, 0, 0, 0, 1, 10);
                      window.dispatchEvent(event);
                    });

                    it('Then the dragging class is removed', function() {
                      expect(dataSelection.classed('dragging')).toBe(true);
                    });

                    it('Then the drag dispatcher is called with updated data', function() {
                      expect(dragListener).toHaveBeenCalledWith(expectedData);
                    });

                    it('Then contains an updated trendline path', function() {
                      expect(childElements[0].outerHTML)
                        .toEqual(expectedTrendline);
                    });

                    it('Then contains an updated interaction path', function() {
                      expect(childElements[1].outerHTML)
                        .toEqual(expectedInteraction);
                    });
                  });

                  describe('And on body drag end', function() {
                    var dragEndListener;

                    beforeEach(function() {
                      dragEndListener = jasmine.createSpy('dragEndListener');
                      scope.plot.on('dragend', dragEndListener);

                      var event = document.createEvent('MouseEvent');
                      event.initMouseEvent('mouseup', false, false, window);
                      window.dispatchEvent(event);
                    });

                    it('Then the dragging class is removed', function() {
                      expect(dataSelection.classed('dragging')).toBe(false);
                    });

                    it('Then the drag end dispatcher is called', function() {
                      expect(dragEndListener).toHaveBeenCalledWith(data[0]);
                    });
                  });
                });
              }
            });
          });
        }
      });
    });
  });
});