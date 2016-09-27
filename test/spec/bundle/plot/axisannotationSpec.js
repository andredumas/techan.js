techanModule('plot/axisannotation', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = [{ value: 0.5 }],
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.axisannotation;
  };

  specBuilder.require(require('../../../../src/plot/axisannotation'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {

      describe('And axisannotation is initialised with defaults', function () {

        describe('And valid data is passed', function() {
          plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 2);

          function assertDom(scope) {
            var childElements;

            beforeEach(function() {
              childElements = scope.childElements;
            });

            describe('And on obtaining the data element', function() {
              it('Then contains a path', function() {
                expect(childElements[0].outerHTML)
                  .toEqual('<path d="M 0.5 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path>');
              });

              it('Then contains text', function() {
                expect(childElements[1].outerHTML)
                  .toEqual('<text x="0.5" y="9" dy=".72em" style="text-anchor: middle;">0.5</text>');
              });
            });
          }
        });

        describe('And data on upper boundary is passed', function() {
          beforeEach(function() {
            scope.plot.axis().scale().domain([0, 10]);
          });

          plotShouldRenderWithoutError(scope, [{ value: 10 }], domFixtures, assertDom, 1, 2);

          function assertDom(scope) {
            var childElements;

            beforeEach(function() {
              childElements = scope.childElements;
            });

            describe('And on obtaining the data element', function() {
              it('Then contains a path', function() {
                expect(childElements[0].outerHTML)
                  .toEqual('<path d="M 1 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path>');
              });

              it('Then contains text', function() {
                expect(childElements[1].outerHTML)
                  .toEqual('<text x="1" y="9" dy=".72em" style="text-anchor: middle;">10</text>');
              });
            });
          }
        });

        describe('And data on lower (0) boundary is passed', function() {
          beforeEach(function() {
            scope.plot.axis().scale().domain([0, 10]);
          });

          plotShouldRenderWithoutError(scope, [{ value: 0 }], domFixtures, assertDom, 1, 2);

          function assertDom(scope) {
            var childElements;

            beforeEach(function() {
              childElements = scope.childElements;
            });

            describe('And on obtaining the data element', function() {
              it('Then contains a path', function() {
                expect(childElements[0].outerHTML)
                  .toEqual('<path d="M 0 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path>');
              });

              it('Then contains text', function() {
                expect(childElements[1].outerHTML)
                  .toEqual('<text x="0" y="9" dy=".72em" style="text-anchor: middle;">0</text>');
              });
            });
          }
        });

        describe('And translate is 10 across and 15 down and right axis', function() {
          beforeEach(function() {
            var axisannotation = scope.plot;
            axisannotation.translate([10,15]).orient('right');
          });

          plotShouldRenderWithoutError(scope, data, domFixtures, function(scope) {
            var dataElement,
                childElements;

            beforeEach(function() {
              dataElement = scope.dataElements[0];
              childElements = scope.childElements;
            });

            it('Then data should be translated', function() {
              expect(d3.select(dataElement).attr('transform')).toEqual('translate(10,15)');
            });

            it('Then contains a path', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path d="M 0 0.5 l 6 -4 l 0 -3 l 50 0 l 0 14 l -50 0 l 0 -3"></path>');
            });

            it('Then contains text - anchor start', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<text x="9" y="0.5" dy=".32em" style="text-anchor: start;">0.5</text>');
            });

          }, 1, 2);
        });

        describe('And axis is top', function() {
          beforeEach(function() {
            scope.plot.orient('top');
          });

          plotShouldRenderWithoutError(scope, data, domFixtures, function(scope) {
            var childElements;
            beforeEach(function() {
              childElements = scope.childElements;
            });

            it('Then contains a path', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path d="M 0.5 0 l -4 -6 l -21 0 l 0 -14 l 50 0 l 0 14 l -21 0"></path>');
            });

            it('Then contains text - anchor middle', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<text x="0.5" y="-9" dy="0em" style="text-anchor: middle;">0.5</text>');
            });

          }, 1, 2);

          describe('And inner tick is negative', function() {
            beforeEach(function() {
              scope.plot.axis().tickSizeInner(-1);
            });

            plotShouldRenderWithoutError(scope, data, domFixtures, function(scope) {
              var childElements;
              beforeEach(function() {
                childElements = scope.childElements;
              });

              it('Then contains a path', function() {
                expect(childElements[0].outerHTML)
                  .toEqual('<path d="M 0.5 0 l -4 -1 l -21 0 l 0 -14 l 50 0 l 0 14 l -21 0"></path>');
              });

              it('Then contains text - anchor middle', function() {
                expect(childElements[1].outerHTML)
                  .toEqual('<text x="0.5" y="-3" dy="0em" style="text-anchor: middle;">0.5</text>');
              });

            }, 1, 2);
          });
        });

        describe('And axis is bottom', function() {
          beforeEach(function() {
            scope.plot.orient('bottom');
          });

          plotShouldRenderWithoutError(scope, data, domFixtures, function(scope) {
            var childElements;
            beforeEach(function() {
              childElements = scope.childElements;
            });

            it('Then contains a path', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path d="M 0.5 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0"></path>');
            });

            it('Then contains text - anchor middle', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<text x="0.5" y="9" dy=".72em" style="text-anchor: middle;">0.5</text>');
            });

          }, 1, 2);
        });

        describe('And axis is left', function() {
          beforeEach(function() {
            scope.plot.orient('left');
          });

          plotShouldRenderWithoutError(scope, data, domFixtures, function(scope) {
            var childElements;
            beforeEach(function() {
              childElements = scope.childElements;
            });

            it('Then contains a path', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path d="M 0 0.5 l -6 -4 l 0 -3 l -50 0 l 0 14 l 50 0 l 0 -3"></path>');
            });

            it('Then contains text - anchor middle', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<text x="-9" y="0.5" dy=".32em" style="text-anchor: end;">0.5</text>');
            });

          }, 1, 2);

          describe('And inner tick is negative', function() {
            beforeEach(function() {
              scope.plot.axis().tickSizeInner(-1);
            });

            plotShouldRenderWithoutError(scope, data, domFixtures, function(scope) {
              var childElements;
              beforeEach(function() {
                childElements = scope.childElements;
              });

              it('Then contains a path', function() {
                expect(childElements[0].outerHTML)
                  .toEqual('<path d="M 0 0.5 l -1 -4 l 0 -3 l -50 0 l 0 14 l 50 0 l 0 -3"></path>');
              });

              it('Then contains text - anchor middle', function() {
                expect(childElements[1].outerHTML)
                  .toEqual('<text x="-3" y="0.5" dy=".32em" style="text-anchor: end;">0.5</text>');
              });

            }, 1, 2);
          });
        });

        describe('And data is undefined', function() {
          plotShouldRenderWithoutError(scope, [], domFixtures, undefined, 0, 0);
        });

        describe('And data is null', function() {
          plotShouldRenderWithoutError(scope, [{value:null}], domFixtures, undefined, 0, 0);
        });

        describe('And data is greater than scale range', function() {
          plotShouldRenderWithoutError(scope, [{value:2}], domFixtures, undefined, 0, 0);
        });

        describe('And data is less than scale range', function() {
          plotShouldRenderWithoutError(scope, [{value:-1}], domFixtures, undefined, 0, 0);
        });

        describe('And data is not a number', function() {
          plotShouldRenderWithoutError(scope, [{value:'abc'}], domFixtures, undefined, 0, 0);
        });
      });
    });
  });
});