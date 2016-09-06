techanModule('plot/supstance', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/supstance'),
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.supstance;
  };

  specBuilder.require(require('../../../../src/plot/supstance'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And supstance is initialised with defaults', function () {
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 3);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          describe('And on obtaining the data element', function() {
            it('Then contains a supstance path', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<g class="supstance"><path d="M 0 8 L 1 8"></path></g>');
            });

            it('Then contains axis annotation place holder', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<g class="axisannotation y"></g>');
            });

            it('Then contains an interaction path', function() {
              expect(childElements[2].outerHTML)
                .toEqual('<g class="interaction" style="opacity: 0; fill: none;"><path d="M 0 8 L 1 8" style="stroke-width: 16px;"></path></g>');
            });
          });
        }
      });

      describe('And supstance is initialised with annotation', function () {
        var data = [{ start: new Date(2014, 2, 5), end: new Date(2014, 2, 7), value: 8 }];

        beforeEach(function () {
          // Data us mutated, reset after each run, supstance mutates data on move
          data[0] = { start: new Date(2014, 2, 5), end: new Date(2014, 2, 7), value: 8 };
          scope.plot.annotation(techan.plot.axisannotation());
          scope.plot.annotation()[0].axis().scale(scope.plot.yScale().domain([0, 10]).range([0, 100]));
        });

        plotShouldRenderWithoutError(scope, data, domFixtures, function(scope) {
          var childElements,
              dataSelection;

          beforeEach(function() {
            childElements = scope.childElements;
            dataSelection = d3.selectAll(scope.dataElements);
          });

          describe('And on obtaining the data element', function() {
            it('Then contains a supstance path', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<g class="supstance"><path d="M 0 80 L 1 80"></path></g>');
            });

            it('Then contains axis annotation', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<g class="axisannotation y"><g class="data scope-composed-annotation"><g class="data" transform="translate(0,0)"><path d="M 80 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path><text x="80" y="9" dy=".72em" style="text-anchor: middle;">8</text></g></g></g>');
            });

            it('Then contains an interaction path', function() {
              expect(childElements[2].outerHTML)
                .toEqual('<g class="interaction" style="opacity: 0; fill: none;"><path d="M 0 80 L 1 80" style="stroke-width: 16px;"></path></g>');
            });

            it('Then the mouse over class should not be applied', function() {
              expect(dataSelection.classed('mouseover')).toBe(false);
            });

            describe('And obtaining the interaction element', function() {
              var interaction;

              beforeEach(function() {
                interaction = childElements[2];
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

                it('Then the mouseover class is applied to the supstance', function() {
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

                  it('Then the mouseover class is applied to the supstance', function() {
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

                  it('Then the mouseover class is removed from the supstance', function() {
                    expect(dataSelection.classed('mouseover')).toBe(false);
                  });

                  it('Then the mouse enter dispatcher is called', function() {
                    expect(outListener).toHaveBeenCalledWith(data[0]);
                  });
                });
              });

              describe('And on drag start', function() {
                var dragStartListener,
                    dragInteraction;

                beforeEach(function() {
                  dragInteraction = d3.select(interaction).select('path')[0][0];
                  dragStartListener = jasmine.createSpy('dragStartListener');
                  scope.plot.drag(scope.g);
                  scope.plot.on('dragstart', dragStartListener);

                  var event = document.createEvent('MouseEvent');
                  event.initMouseEvent('mousedown');
                  dragInteraction.dispatchEvent(event);
                });

                it('Then the dragging class is added', function() {
                  expect(dataSelection.classed('dragging')).toBe(true);
                });

                it('Then the drag start dispatcher is called', function() {
                  expect(dragStartListener).toHaveBeenCalledWith(data[0]);
                });

                describe('And on drag', function() {
                  var dragListener;

                  beforeEach(function() {
                    dragListener = jasmine.createSpy('dragListener');
                    scope.plot.on('drag', dragListener);

                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent('mousemove', false, false, window, 0, 0, 0, 2, 10);
                    window.dispatchEvent(event);
                  });

                  it('Then the dragging class is removed', function() {
                    expect(dataSelection.classed('dragging')).toBe(true);
                  });

                  it('Then the drag dispatcher is called', function() {
                    expect(dragListener).toHaveBeenCalledWith(data[0]);
                  });

                  it('Then data has been updated', function() {
                    expect(data[0].value).toBe(9);
                  });

                  it('Then contains an updated supstance path', function() {
                    expect(childElements[0].outerHTML)
                      .toEqual('<g class="supstance"><path d="M 0 90 L 1 90"></path></g>');
                  });

                  it('Then contains an updated axis annotation', function() {
                    expect(childElements[1].outerHTML)
                      .toEqual('<g class="axisannotation y"><g class="data scope-composed-annotation"><g class="data" transform="translate(0,0)"><path d="M 90 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path><text x="90" y="9" dy=".72em" style="text-anchor: middle;">9</text></g></g></g>');
                  });

                  it('Then contains an updated interaction path', function() {
                    expect(childElements[2].outerHTML)
                      .toEqual('<g class="interaction" style="opacity: 0; fill: none;"><path d="M 0 90 L 1 90" style="stroke-width: 16px;"></path></g>');
                  });
                });

                describe('And on drag end', function() {
                  var dragEndListener;

                  beforeEach(function() {
                    dragEndListener = jasmine.createSpy('dragEndListener');
                    scope.plot.on('dragend', dragEndListener);

                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent('mouseup');
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
            });
          });
        }, 1, 3);
      });
    });
  });
});