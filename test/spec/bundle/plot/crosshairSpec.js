// TODO Assert mouse movements and updated DOM
techanModule('plot/crosshair', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.crosshair;
  };

  specBuilder.require(require('../../../../src/plot/crosshair'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And crosshair is initialised with defaults and no data', function () {
        var plotTester = PlotRenderTester(domFixtures)
          .scope(scope)
          .dataElementsCount(1)
          .childElementCount(4);

        plotTester.domAssertions(function(scope) {
            var g,
                dataElement,
                childElements;

            beforeEach(function() {
              g = scope.g;
              dataElement = d3.select(scope.dataElements[0]);
              childElements = scope.childElements;
            });

            it('Then it is not displayed', function() {
              expect(dataElement.attr('display')).toBe('none');
            });

            it('Then contains an empty horizontal wire', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path class="horizontal wire"></path>');
            });

            it('Then contains an empty vertical wire', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<path class="vertical wire"></path>');
            });

            it('Then contains empty x annotation place holders', function() {
              expect(childElements[2].outerHTML)
                .toEqual('<g class="axisannotation x"></g>');
            });

            it('Then contains empty y annotation place holders', function() {
              expect(childElements[3].outerHTML)
                .toEqual('<g class="axisannotation y"></g>');
            });

            describe('And obtaining the root node', function() {
              var root;

              beforeEach(function() {
                root = g.selectAll('g.root > *').nodes();
              });

              it('Then there are 2 elements', function() {
                expect(root.length).toBe(2);
              });

              describe('And obtaining the interaction rect', function() {
                var rect;

                beforeEach(function() {
                  rect = root[1];
                });

                it('Then the second is the interaction rectangle', function() {
                  expect(rect.outerHTML)
                    .toEqual('<rect x="0" y="0" height="1" width="1" style="fill: none; pointer-events: all;"></rect>');
                });

                describe('And on mouseenter', function() {
                  var enterListener;

                  beforeEach(function() {
                    enterListener = jasmine.createSpy('enterListener');
                    scope.plot.on('enter', enterListener);

                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent('mouseenter');
                    rect.dispatchEvent(event);
                  });

                  it('Then it is not displayed', function() {
                    expect(g.selectAll('g.data.scope-crosshair').attr('display')).toBe('none');
                  });

                  it('Then the mouse enter dispatcher is called', function() {
                    expect(enterListener).toHaveBeenCalled();
                  });

                  describe('And on mousemove with valid coordinates', function() {
                    var moveListener,
                        xRange = 1,
                        yRange = 1;

                    beforeEach(function() {
                      moveListener = jasmine.createSpy('moveListener');
                      scope.plot.on('move', moveListener);

                      var event = document.createEvent('MouseEvent');
                      event.initMouseEvent('mousemove', false, false, window, 0, 0, 0, xRange, yRange);
                      rect.dispatchEvent(event);
                    });

                    it('Then it is displayed', function() {
                      expect(g.selectAll('g.data.scope-crosshair').attr('display')).toBeNull();
                    });

                    it('Then the horizontal wire should display at the right point', function() {
                      expect(childElements[0].outerHTML)
                        .toEqual('<path class="horizontal wire" d="M 0 ' + yRange + ' L 1 ' + yRange + '"></path>');
                    });

                    it('Then the vertical wire should display at the right point', function() {
                      expect(childElements[1].outerHTML)
                        .toEqual('<path class="vertical wire" d="M ' +  xRange + ' 0 L ' + xRange + ' 1"></path>');
                    });

                    it('Then the mouse move dispatcher is called with the right coordinates', function() {
                      expect(moveListener).toHaveBeenCalledWith(
                        { x: scope.plot.xScale().invert(xRange), y: scope.plot.yScale().invert(yRange) }
                      );
                    });

                    describe('And the y domain is adjusted', function() {
                      var domainMoveListener;

                      beforeEach(function() {
                        domainMoveListener = jasmine.createSpy('domainMoveListener');
                        scope.plot.on('move', domainMoveListener);

                        scope.plot.yScale().domain([-1, 2]);
                        scope.plot(g);
                      });

                      it('Then contains the horizontal wire in the same position', function() {
                        expect(childElements[0].outerHTML)
                          .toEqual('<path class="horizontal wire" d="M 0 1 L 1 1"></path>');
                      });

                      it('Then contains the same unadjusted vertical wire', function() {
                        expect(childElements[1].outerHTML)
                          .toEqual('<path class="vertical wire" d="M 1 0 L 1 1"></path>');
                      });

                      it('Then the mouse move dispatcher is called with adjusted coordinates (mouse has not moved, but chart has been rescaled, new value)', function() {
                        expect(domainMoveListener).toHaveBeenCalledWith(
                          { x: scope.plot.xScale().invert(1), y: 2 } // Is 2, mouse was on the far right extent which has been adjusted to be 2
                        );
                      });
                    });
                  });

                  describe('And on mousemove with invalid coordinates', function() {
                    var moveListener,
                        xRange = -1, // Out of finance domain, expect undefined/null
                        yRange = 2; // Out of linear visible range, but will still expect a value

                    beforeEach(function() {
                      moveListener = jasmine.createSpy('moveListener');
                      scope.plot.on('move', moveListener);

                      var event = document.createEvent('MouseEvent');
                      event.initMouseEvent('mousemove', false, false, window, 0, 0, 0, xRange, yRange);
                      rect.dispatchEvent(event);
                    });

                    it('Then the horizontal wire should display at the right point', function() {
                      expect(childElements[0].outerHTML)
                        .toEqual('<path class="horizontal wire" d="M 0 ' + yRange + ' L 1 ' + yRange + '"></path>');
                    });

                    it('Then the vertical wire should be cleared', function() {
                      expect(childElements[1].outerHTML)
                        .toEqual('<path class="vertical wire"></path>');
                    });

                    it('Then the mouse move dispatcher is never called', function() {
                      expect(moveListener).not.toHaveBeenCalled();
                    });
                  });
                });

                describe('And on mouseout', function() {
                  var outListener;

                  beforeEach(function() {
                    outListener = jasmine.createSpy('outListener');
                    scope.plot.on('out', outListener);

                    var event = document.createEvent('MouseEvent');
                    event.initMouseEvent('mouseout');
                    rect.dispatchEvent(event);
                  });

                  it('Then it is not displayed', function() {
                    expect(g.selectAll('g.data.scope-crosshair').attr('display')).toBe('none');
                  });

                  it('Then the mouse enter dispatcher is called', function() {
                    expect(outListener).toHaveBeenCalled();
                  });
                });
              });
            });
          }).testRender();

        describe('And then initialised with annotations', function () {
          beforeEach(function () {
            var xAnnotation = techan.plot.axisannotation(),
                yAnnotation = techan.plot.axisannotation();

            scope.plot
              .xAnnotation(xAnnotation)
              .yAnnotation(yAnnotation);
          });

          plotTester.domAssertions(function(scope) {
            var childElements;

            beforeEach(function() {
              childElements = scope.childElements;
            });

            it('Then contains x annotation is populated', function() {
              expect(childElements[2].outerHTML)
                .toEqual('<g class="axisannotation x"><g class="data scope-composed-annotation"></g></g>');
            });

            it('Then contains y annotation is populated', function() {
              expect(childElements[3].outerHTML)
                .toEqual('<g class="axisannotation y"><g class="data scope-composed-annotation"></g></g>');
            });

            describe('And on mousemove', function() {
              var moveListener,
                xRange = 1,
                yRange = 1;

              beforeEach(function() {
                moveListener = jasmine.createSpy('moveListener');
                scope.plot.on('move', moveListener);

                var event = document.createEvent('MouseEvent');
                event.initMouseEvent('mousemove', false, false, window, 0, 0, 0, xRange, yRange);
                scope.g.selectAll('g.root > *').nodes()[1].dispatchEvent(event);
              });

              it('Then contains x annotation is populated', function() {
                expect(childElements[2].outerHTML)
                  .toEqual('<g class="axisannotation x"><g class="data scope-composed-annotation"><g class="data" transform="translate(0,0)"><path d="M 1 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path><text x="1" y="9" dy=".72em" style="text-anchor: middle;">1.0</text></g></g></g>');
              });

              it('Then contains y annotation is populated', function() {
                expect(childElements[3].outerHTML)
                  .toEqual('<g class="axisannotation y"><g class="data scope-composed-annotation"><g class="data" transform="translate(0,0)"><path d="M 1 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path><text x="1" y="9" dy=".72em" style="text-anchor: middle;">1.0</text></g></g></g>');
              });

              it('Then the mouse move dispatcher is called with the right coordinates', function() {
                expect(moveListener).toHaveBeenCalledWith(
                  { x: scope.plot.xScale().invert(xRange), y: scope.plot.yScale().invert(yRange) }
                );
              });
            });
          }).testRender();
        });
      });

      describe('And crosshair is initialised with data', function () {
        var plotTester = PlotRenderTester(domFixtures)
              .data({ x: 1, y: 0 })
              .scope(scope)
              .dataElementsCount(1)
              .childElementCount(4);

        beforeEach(function () {
          var xAnnotation = techan.plot.axisannotation(),
              yAnnotation = techan.plot.axisannotation();

          scope.plot
            .xAnnotation(xAnnotation)
            .yAnnotation(yAnnotation);
        });

        plotTester.domAssertions(function(scope) {
          var g,
              dataElement,
              childElements;

          beforeEach(function() {
            g = scope.g;
            dataElement = d3.select(scope.dataElements[0]);
            childElements = scope.childElements;
          });

          it('Then it is not displayed', function() {
            expect(dataElement.attr('display')).toBeNull();
          });

          it('Then contains a valid horizontal wire', function() {
            expect(childElements[0].outerHTML)
              .toEqual('<path class="horizontal wire" d="M 0 0 L 1 0"></path>');
          });

          it('Then contains a valid vertical wire', function() {
            expect(childElements[1].outerHTML)
              .toEqual('<path class="vertical wire" d="M 1 0 L 1 1"></path>');
          });

          it('Then contains populated x annotation', function() {
            expect(childElements[2].outerHTML)
              .toEqual('<g class="axisannotation x"><g class="data scope-composed-annotation"><g class="data" transform="translate(0,0)"><path d="M 1 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path><text x="1" y="9" dy=".72em" style="text-anchor: middle;">1.0</text></g></g></g>');
          });

          it('Then contains populated y annotation', function() {
            expect(childElements[3].outerHTML)
              .toEqual('<g class="axisannotation y"><g class="data scope-composed-annotation"><g class="data" transform="translate(0,0)"><path d="M 0 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path><text x="0" y="9" dy=".72em" style="text-anchor: middle;">0.0</text></g></g></g>');
          });
        }).testRender();
      });
    });
  });
});