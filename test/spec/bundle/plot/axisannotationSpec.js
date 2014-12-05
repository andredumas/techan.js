techanModule('plot/axisannotation', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom'),
      spies = { g: { parentNode: {} }, plot: {} },
      axisannotation,
      g;

  var actualInit = function() {
    return techan.plot.axisannotation;
  };

  var mockInit = function(axisannotation) {
    var plotmixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);
    return axisannotation(d3.svg.axis, techan.accessor.value, spies.plot, plotmixin);
  };

  specBuilder.require(require('../../../../src/plot/axisannotation'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And axisannotation is initialised with defaults', function () {
        beforeEach(function () {
          axisannotation = scope.plot;
          g = domFixtures.g([{ value: 50 }]);
        });

        it('Then the plot mixin accessor should be defined', function () {
          expect(axisannotation.accessor).toBeDefined();
        });

        it('Then on default invoke, it should render without error', function() {
          axisannotation(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });

        it('Then on refresh invoke, it should be refreshed only', function() {
          axisannotation(g);
          axisannotation.refresh(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });
      });
    });

    instanceBuilder.instance('mocked', mockInit, function(scope) {
      describe('And axisannotation is initialised with defaults', function () {
        beforeEach(function () {
          axisannotation = scope.axisannotation;
          g = domFixtures.g([{ value: 50 }]);
        });

        describe('And selection is mocked', function() {
          var selectSpies = {};

          beforeEach(function() {
            // Too many spies much???
            // Convert to spies on actuals?
            spies.plot.groupSelect = jasmine.createSpy('groupSelect');
            spies.plot.groupSelect.and.returnValue({entry: selectSpies, selection: selectSpies});
            spies.g.selectAll = jasmine.createSpy('selectAll');
            spies.g.selectAll.and.returnValue(selectSpies);
            spies.g.select = jasmine.createSpy('select');
            spies.g.select.and.returnValue(selectSpies);
            selectSpies.selectAll = spies.g.selectAll;
            selectSpies.append = jasmine.createSpy('append');
            selectSpies.append.and.returnValue(selectSpies);
            selectSpies.attr = jasmine.createSpy('attr');
            selectSpies.attr.and.returnValue(selectSpies);
            selectSpies.text = jasmine.createSpy('text');
            selectSpies.text.and.returnValue(selectSpies);
            selectSpies.style = jasmine.createSpy('style');
            selectSpies.call = jasmine.createSpy('call');
          });

          describe('And on refresh with defaults', function() {
            var filterInvalidValues,
                text,
                textAttributes;

            beforeEach(function() {
              axisannotation.refresh(spies.g);
              filterInvalidValues = spies.plot.groupSelect.calls.argsFor(0)[1];
              text = selectSpies.text.calls.argsFor(0)[0];
              textAttributes = selectSpies.call.calls.argsFor(0)[0];
            });

            it('Then plot.groupSelect filter should be defined', function() {
              expect(filterInvalidValues).toBeDefined();
            });

            it('Then plot.groupSelect should filter undefined objects', function() {
              expect(filterInvalidValues([{}])).toEqual([]);
            });

            it('Then plot.groupSelect should filter null values', function() {
              expect(filterInvalidValues([{value:null}])).toEqual([]);
            });

            it('Then plot.groupSelect should filter domain values that scale out of range greater', function() {
              expect(filterInvalidValues([{value:2}])).toEqual([]);
            });

            it('Then plot.groupSelect should filter domain values that scale out of range less', function() {
              expect(filterInvalidValues([{value: -0.1}])).toEqual([]);
            });

            it('Then plot.groupSelect should not filter domain values that scale inside of range', function() {
              expect(filterInvalidValues([{value:0.5}])).toEqual([{value:0.5}]);
            });

            it('Then plot.groupSelect should not filter domain values that scale to not a number', function() {
              expect(filterInvalidValues([{value:'abc'}])).toEqual([]);
            });

            it('Then text function should be defined', function() {
              expect(text).toBeDefined();
            });

            it('Then text function invoke should return formatted value', function() {
              expect(text({value:123})).toEqual('123.0');
            });

            it('Then textAttributes function should be defined', function() {
              expect(textAttributes).toBeDefined();
            });

            describe('And axis is left and neg(ation) is left (-1)', function() {
              var attr,
                  styleArgs;

              beforeEach(function() {
                axisannotation.axis().orient('left');
                textAttributes(selectSpies, axisannotation.accessor(), axisannotation.axis(), -1);
                attr = selectSpies.attr.calls.argsFor(2)[0]; // It is the second call because it is initially invoked in earlier setup
                styleArgs = selectSpies.style.calls.argsFor(0);
              });

              it('Then attr should have been called on the selection', function() {
                expect(attr).toBeDefined();
              });

              it('Then textAttributes should set tick padded x coordinate', function() {
                expect(attr.x).toBeDefined();
                expect(attr.x).toBe(-9);
              });

              it('Then textAttributes should be a function that scales value to y coordinate', function() {
                expect(attr.y).toBeDefined();
                expect(attr.y({ value:1 })).toBe(1);
              });

              it('Then textAttributes should set dy coordinate', function() {
                expect(attr.dy).toBeDefined();
                expect(attr.dy).toBe('.32em');
              });

              it('Then textAttributes should set end text anchor style', function() {
                expect(styleArgs).toBeDefined();
                expect(styleArgs[0]).toBe('text-anchor');
                expect(styleArgs[1]).toBe('end');
              });
            });

            describe('And translate is 10 across and 15 down', function() {
              var attr;

              beforeEach(function() {
                axisannotation.translate([10,15]).axis().orient('right');
                axisannotation.refresh(spies.g);
                attr = selectSpies.attr.calls.argsFor(2)[1]; // It is the second call because it is initially invoked in earlier setup
              });

              it('Then attr should have been called on the selection', function() {
                expect(attr).toBeDefined();
              });

              it('Then translate should be 10,15', function() {
                expect(attr).toBe('translate(10,15)');
              });
            });

            describe('And axis is right', function() {
              var attr,
                  styleArgs;

              beforeEach(function() {
                axisannotation.axis().orient('right');
                textAttributes(selectSpies, axisannotation.accessor(),axisannotation.axis(), 1);
                attr = selectSpies.attr.calls.argsFor(2)[0]; // It is the second call because it is initially invoked in earlier setup
                styleArgs = selectSpies.style.calls.argsFor(0);
              });

              it('Then attr should have been called on the selection', function() {
                expect(attr).toBeDefined();
              });

              it('Then textAttributes should set tick padded x coordinate', function() {
                expect(attr.x).toBeDefined();
                expect(attr.x).toBe(9);
              });

              it('Then textAttributes should set scaled value y coordinate', function() {
                expect(attr.y).toBeDefined();
                expect(attr.y({ value:1 })).toBe(1);
              });

              it('Then textAttributes should set dy coordinate', function() {
                expect(attr.dy).toBeDefined();
                expect(attr.dy).toBe('.32em');
              });

              it('Then textAttributes should set start text anchor style', function() {
                expect(styleArgs).toBeDefined();
                expect(styleArgs[0]).toBe('text-anchor');
                expect(styleArgs[1]).toBe('start');
              });
            });

            describe('And axis is top', function() {
              var attr,
                  styleArgs;

              beforeEach(function() {
                axisannotation.axis().orient('top');
                textAttributes(selectSpies, axisannotation.accessor(),axisannotation.axis(), -1);
                attr = selectSpies.attr.calls.argsFor(2)[0]; // It is the second call because it is initially invoked in earlier setup
                styleArgs = selectSpies.style.calls.argsFor(0);
              });

              it('Then attr should have been called on the selection', function() {
                expect(attr).toBeDefined();
              });

              it('Then textAttributes should set tick padded y coordinate', function() {
                expect(attr.y).toBeDefined();
                expect(attr.y).toBe(-9);
              });

              it('Then textAttributes should set scaled value x coordinate', function() {
                expect(attr.x).toBeDefined();
                expect(attr.x({ value:1 })).toBe(1);
              });

              it('Then textAttributes should set dy coordinate', function() {
                expect(attr.dy).toBeDefined();
                expect(attr.dy).toBe('0em');
              });

              it('Then textAttributes should set middle text anchor style', function() {
                expect(styleArgs).toBeDefined();
                expect(styleArgs[0]).toBe('text-anchor');
                expect(styleArgs[1]).toBe('middle');
              });
            });

            describe('And axis is bottom', function() {
              var attr,
                  styleArgs;

              beforeEach(function() {
                axisannotation.axis().orient('bottom');
                textAttributes(selectSpies, axisannotation.accessor(), axisannotation.axis(), 1);
                attr = selectSpies.attr.calls.argsFor(2)[0]; // It is the second call because it is initially invoked in earlier setup
                styleArgs = selectSpies.style.calls.argsFor(0);
              });

              it('Then attr should have been called on the selection', function() {
                expect(attr).toBeDefined();
              });

              it('Then textAttributes should set tick padded y coordinate', function() {
                expect(attr.y).toBeDefined();
                expect(attr.y).toBe(9);
              });

              it('Then textAttributes should set scaled value x coordinate', function() {
                expect(attr.x).toBeDefined();
                expect(attr.x({ value:1 })).toBe(1);
              });

              it('Then textAttributes should set dy coordinate', function() {
                expect(attr.dy).toBeDefined();
                expect(attr.dy).toBe('.72em');
              });

              it('Then textAttributes should set middle text anchor style', function() {
                expect(styleArgs).toBeDefined();
                expect(styleArgs[0]).toBe('text-anchor');
                expect(styleArgs[1]).toBe('middle');
              });
            });
          });

          describe('And axis is left', function() {
            beforeEach(function() {
              axisannotation.axis().orient('left');
              axisannotation.refresh(spies.g);
            });

            it('Then path attribute function should be passed', function() {
              expect(selectSpies.attr.calls.argsFor(1)[1]).toBeDefined();
            });

            it('Then path attribute function execution should generate correct path', function() {
              expect(selectSpies.attr.calls.argsFor(1)[1]({value:1})).toEqual('M 0 1 l -6 -4 l 0 -3 l -50 0 l 0 14 l 50 0 l 0 -3');
            });
          });

          describe('And axis is right', function() {
            beforeEach(function() {
              axisannotation.axis().orient('right');
              axisannotation.refresh(spies.g);
            });

            it('Then path attribute function should be passed', function() {
              expect(selectSpies.attr.calls.argsFor(1)[1]).toBeDefined();
            });

            it('Then path attribute function execution should generate correct path', function() {
              expect(selectSpies.attr.calls.argsFor(1)[1]({value:1})).toEqual('M 0 1 l 6 -4 l 0 -3 l 50 0 l 0 14 l -50 0 l 0 -3');
            });
          });

          describe('And axis is top', function() {
            beforeEach(function() {
              axisannotation.axis().orient('top');
              axisannotation.refresh(spies.g);
            });

            it('Then path attribute function should be passed', function() {
              expect(selectSpies.attr.calls.argsFor(1)[1]).toBeDefined();
            });

            it('Then path attribute function execution should generate correct path', function() {
              expect(selectSpies.attr.calls.argsFor(1)[1]({value:1})).toEqual('M 1 0 l -4 -6 l -21 0 l 0 -14 l 50 0 l 0 14 l -21 0');
            });
          });

          describe('And axis is bottom', function() {
            beforeEach(function() {
              axisannotation.axis().orient('bottom');
              axisannotation.refresh(spies.g);
            });

            it('Then path attribute function should be passed', function() {
              expect(selectSpies.attr.calls.argsFor(1)[1]).toBeDefined();
            });

            it('Then path attribute function execution should generate correct path', function() {
              expect(selectSpies.attr.calls.argsFor(1)[1]({value:1})).toEqual('M 1 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0');
            });
          });
        });
      });
    });
  });
});