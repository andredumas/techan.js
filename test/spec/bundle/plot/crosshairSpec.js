// TODO Assert mouse movements and updated DOM
techanModule('plot/crosshair', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom'),
      spies = { plot: {} },
      crosshair,
      g;

  var actualInit = function() {
    return techan.plot.crosshair;
  };

  var mockInit = function(crosshair) {
    spies.d3_select = jasmine.createSpy('d3_select');

    var plot = require('../../../../src/plot/plot')(d3.svg.line, spies.d3_select),
        plotmixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);
    spies.d3_mouse = jasmine.createSpy('d3_mouse');
    return crosshair(d3.select, d3.event, spies.d3_mouse, d3.dispatch, plot, plotmixin);
  };

  function assertDomStructure(gScope, annotations) {
    var parent;

    beforeEach(function() {
      parent = gScope.g[0][0];
    });

    it('Then the children element count should be 2', function() {
      expect(parent.childNodes.length).toEqual(2);
    });

    it('Then the first child element should be g.data', function() {
      expect(parent.childNodes[0].nodeName.toLowerCase()).toEqual('g');
      expect(parent.childNodes[0].className).toEqual('data top');
    });

    xit('Then the crosshair should initially be hidden', function() {
      expect(g.select('g.data.top').style('display')).toBe('none');
    });

    it('Then the second child element should be a rect', function() {
      expect(parent.childNodes[1].nodeName.toLowerCase()).toEqual('rect');
    });

    describe('And the g.data element', function() {
      var gData,
          horizontalPath,
          verticalPath,
          axisAnnotationXGroup,
          axisAnnotationYGroup;

      beforeEach(function() {
        gData = parent.childNodes[0];
        horizontalPath = gData.childNodes[0];
        verticalPath = gData.childNodes[1];
        axisAnnotationXGroup = gData.childNodes[2];
        axisAnnotationYGroup = gData.childNodes[3];
      });

      it('Then should have 4 children', function() {
        expect(gData.childNodes.length).toEqual(4);
      });

      it('Then the first child element should be path.horizontal.wire', function() {
        expect(horizontalPath.nodeName.toLowerCase()).toEqual('path');
        expect(horizontalPath.className).toEqual('horizontal wire');
      });

      it('Then the path.horizontal.wire should have no children', function() {
        expect(horizontalPath.childNodes.length).toEqual(0);
      });

      it('Then the second child element should be path.vertical.wire', function() {
        expect(verticalPath.nodeName.toLowerCase()).toEqual('path');
        expect(verticalPath.className).toEqual('vertical wire');
      });

      it('Then the path.vertical.wire should have no children', function() {
        expect(verticalPath.childNodes.length).toEqual(0);
      });

      it('Then the third child element should be g.axisannotation.x', function() {
        expect(axisAnnotationXGroup.nodeName.toLowerCase()).toEqual('g');
        expect(axisAnnotationXGroup.className).toEqual('axisannotation x');
      });

      if(annotations) {
        it('Then the g.axisannotation.x should have 1 child', function () {
          expect(axisAnnotationXGroup.childNodes.length).toEqual(1);
        });

        it('Then the g.axisannotation.x child should be g.0', function () {
          expect(axisAnnotationXGroup.childNodes[0].nodeName.toLowerCase()).toEqual('g');
          expect(axisAnnotationXGroup.childNodes[0].className).toEqual('0');
        });

        it('Then the fourth child element should be g.axisannotation.y', function () {
          expect(axisAnnotationYGroup.nodeName.toLowerCase()).toEqual('g');
          expect(axisAnnotationYGroup.className).toEqual('axisannotation y');
        });

        it('Then the g.axisannotation.y should have 1 child', function () {
          expect(axisAnnotationYGroup.childNodes.length).toEqual(1);
        });

        it('Then the g.axisannotation.y child should be g.0', function () {
          expect(axisAnnotationYGroup.childNodes[0].nodeName.toLowerCase()).toEqual('g');
          expect(axisAnnotationYGroup.childNodes[0].className).toEqual('0');
        });
      }
    });
  }

  specBuilder.require(require('../../../../src/plot/crosshair'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And crosshair is initialised with defaults', function () {
        beforeEach(function () {
          crosshair = scope.plot;
          g = domFixtures.g();
        });

        it('Then .on should be defined', function() {
          expect(crosshair.on).toBeDefined();
        });

        describe('And on default invoke', function() {
          var parent,
              gScope = {g:undefined};

          beforeEach(function() {
            crosshair(g);
            parent = g[0][0];
            gScope.g = g;
          });

          it('Then it should render without error', function() {
            expect(parent.innerHTML).not.toContain('NaN');
          });

          assertDomStructure(gScope);

          describe('And second full invoke', function() {
            beforeEach(function() {
              crosshair(g);
            });

            it('Then it should still refresh without error', function() {
              expect(parent.innerHTML).not.toContain('NaN');
            });

            assertDomStructure(gScope);
          });

          describe('And refresh invoke', function() {
            beforeEach(function() {
              crosshair.refresh(g);
            });

            it('Then it should still refresh without error', function() {
              expect(parent.innerHTML).not.toContain('NaN');
            });

            assertDomStructure(gScope);
          });
        });
      });

      describe('And crosshair is initialised with annotations', function () {
        beforeEach(function () {
          crosshair = scope.plot;
          crosshair.xAnnotation(techan.plot.axisannotation())
            .yAnnotation(techan.plot.axisannotation());
          g = domFixtures.g();
        });

        it('Then .on should be defined', function() {
          expect(crosshair.on).toBeDefined();
        });

        describe('And on default invoke', function() {
          var parent,
            gScope = {g:undefined};

          beforeEach(function() {
            crosshair(g);
            parent = g[0][0];
            gScope.g = g;
          });

          it('Then it should render without error', function() {
            expect(parent.innerHTML).not.toContain('NaN');
          });

          assertDomStructure(gScope, true);

          describe('And second full invoke', function() {
            beforeEach(function() {
              crosshair(g);
            });

            it('Then it should still refresh without error', function() {
              expect(parent.innerHTML).not.toContain('NaN');
            });

            assertDomStructure(gScope, true);
          });

          describe('And refresh invoke', function() {
            beforeEach(function() {
              crosshair.refresh(g);
            });

            it('Then it should still refresh without error', function() {
              expect(parent.innerHTML).not.toContain('NaN');
            });

            assertDomStructure(gScope, true);
          });
        });
      });
    });

    instanceBuilder.instance('mocked', mockInit, function(scope) {
      describe('And crosshair is initialised with defaults', function () {
        beforeEach(function () {
          crosshair = scope.crosshair;
          // Accurately model an xAnnotation with time scale
          var xAnnotation = techan.plot.axisannotation();
          xAnnotation.axis().scale(techan.scale.financetime());
          crosshair.xAnnotation(xAnnotation)
            .yAnnotation(techan.plot.axisannotation());

          g = domFixtures.g();
        });

        describe('And selection is mocked', function () {
          var selection;

          beforeEach(function () {
            selection = jasmine.createSpyObj('selection', ['select', 'selectAll', 'enter', 'exit', 'each',
              'on', 'remove', 'data', 'append', 'attr', 'style', 'call']);

            selection.select.and.returnValue(selection);
            selection.selectAll.and.returnValue(selection);
            selection.enter.and.returnValue(selection);
            selection.exit.and.returnValue(selection);
            selection.each.and.returnValue(selection);
            selection.on.and.returnValue(selection);
            selection.remove.and.returnValue(selection);
            selection.data.and.returnValue(selection);
            selection.append.and.returnValue(selection);
            selection.attr.and.returnValue(selection);
            selection.call.and.returnValue(selection);
            selection.style.and.returnValue(selection);

            spies.plot.groupSelect = jasmine.createSpyObj('groupSelect', ['entry', 'selection']);
            spies.plot.groupSelect.entry.and.returnValue(selection);
            spies.plot.groupSelect.selection.and.returnValue(selection);
          });

          describe('And on default invoke', function() {
            var mouseRectAttribute,
                verticalPathLine,
                horizontalPathLine,
                mousemoveRefresh,
                mouseenter,
                mouseout;

            beforeEach(function() {
              crosshair(selection);
              mouseRectAttribute = selection.attr.calls.argsFor(7)[0];
              verticalPathLine = selection.attr.calls.argsFor(8)[1];
              horizontalPathLine = selection.attr.calls.argsFor(9)[1];
              mouseenter = selection.on.calls.argsFor(0)[1];
              mouseout = selection.on.calls.argsFor(1)[1];
              mousemoveRefresh = selection.on.calls.argsFor(2)[1];
            });

            it('Then the crosshair should initially be hidden', function() {
              expect(selection.style).toHaveBeenCalledWith('display', 'none');
            });

            it('Then mouse detection rectangle object should be defined', function() {
              expect(mouseRectAttribute).toBeDefined();
            });

            it('Then should render a mouse detection rectangle of correct x position', function() {
              expect(mouseRectAttribute.x).toBeDefined();
              expect(mouseRectAttribute.x).toBe(0);
            });

            it('Then should render a mouse detection rectangle of correct y position', function() {
              expect(mouseRectAttribute.y).toBeDefined();
              expect(mouseRectAttribute.y).toBe(0);
            });

            it('Then should render a mouse detection rectangle of correct height', function() {
              expect(mouseRectAttribute.height).toBeDefined();
              expect(mouseRectAttribute.height).toBe(1);
            });

            it('Then should render a mouse detection rectangle of correct width', function() {
              expect(mouseRectAttribute.width).toBeDefined();
              expect(mouseRectAttribute.width).toBe(1);
            });

            it('Then verticalPathLine should be defined', function() {
              expect(verticalPathLine).toBeDefined();
            });

            it('Then verticalPathLine should return empty on no data invoke', function() {
              expect(verticalPathLine(null)).toEqual('M 0 0');
            });

            it('Then verticalPathLine should return vertical line on data invoke', function() {
              expect(verticalPathLine(1)).toEqual('M 1 0 L 1 1');
            });

            it('Then horizontalPathLine should be defined', function() {
              expect(horizontalPathLine).toBeDefined();
            });

            it('Then horizontalPathLine should return empty on no data invoke', function() {
              expect(horizontalPathLine(null)).toEqual('M 0 0');
            });

            it('Then horizontalPathLine should return vertical line on data invoke', function() {
              expect(horizontalPathLine(1)).toEqual('M 0 1 L 1 1');
            });

            it('Then mousemoveRefresh is defined', function() {
              expect(mousemoveRefresh).toBeDefined();
            });

            it('Then mouseenter is defined', function() {
              expect(mouseenter).toBeDefined();
            });

            it('Then mouseout is defined', function() {
              expect(mouseout).toBeDefined();
            });

            describe('And on mousemoveRefresh invoke', function() {
              var listener;

              beforeEach(function() {
                spies.d3_mouse.and.returnValue([1,2]);
                selection.datum = jasmine.createSpy('datum');
                selection.datum.and.returnValue(selection);
                // Redefine the annotation refresh
                crosshair.xAnnotation()[0].refresh = jasmine.createSpy('refresh');
                crosshair.yAnnotation()[0].refresh = jasmine.createSpy('refresh');
                listener = jasmine.createSpy('listener');
                crosshair.on('move', listener);

                mousemoveRefresh();
              });

              it('Then should execute without error', function() {
                expect(spies.d3_mouse).toHaveBeenCalled();
              });

              it('Then should set correct path.vertical datum', function() {
                expect(selection.selectAll.calls.argsFor(6)[0]).toEqual('path.vertical');
                expect(selection.datum.calls.argsFor(0)[0]).toEqual(new Date(1));
              });

              it('Then should set correct path.horizontal datum', function() {
                expect(selection.selectAll.calls.argsFor(7)[0]).toEqual('path.horizontal');
                expect(selection.datum.calls.argsFor(1)[0]).toEqual(2);
              });

              it('Then should update x event coordinate', function() {
                var d = { value: 123 };
                selection.each.calls.argsFor(4)[0].call({ __annotation__: 0}, [d]);
                expect(d.value).toEqual(new Date(1));
              });

              it('Then should update y event coordindate', function() {
                var d = { value: 321 };
                selection.each.calls.argsFor(5)[0].call({ __annotation__: 0 }, [d]);
                expect(d.value).toEqual(2);
              });

              it('Then should refresh x annotation', function() {
                expect(selection.selectAll.calls.argsFor(8)[0]).toEqual('g.axisannotation.x > g');
                selection.each.calls.argsFor(6)[0].call({ __annotation__: 0 });
                expect(crosshair.xAnnotation()[0].refresh).toHaveBeenCalled();
                expect(crosshair.yAnnotation()[0].refresh).not.toHaveBeenCalled();
              });

              it('Then should refresh y annotation', function() {
                expect(selection.selectAll.calls.argsFor(9)[0]).toEqual('g.axisannotation.y > g');
                selection.each.calls.argsFor(7)[0].call({ __annotation__: 0 });
                expect(crosshair.xAnnotation()[0].refresh).not.toHaveBeenCalled();
                expect(crosshair.yAnnotation()[0].refresh).toHaveBeenCalled();
              });

              it('Then the listener should have been invoked', function() {
                expect(listener).toHaveBeenCalled();
              });

              it('Then the listener should have been passed the correct coordinates', function() {
                expect(listener.calls.argsFor(0)[0]).toEqual([new Date(1), 2]); // Mocks won't correctly initialise this array
              });
            });

            describe('And on mouseenter invoke', function() {
              var listener;

              beforeEach(function() {
                listener = jasmine.createSpy('listener');
                crosshair.on('enter', listener);
                mouseenter();
              });

              it('Then the listener should have been invoked', function() {
                expect(listener).toHaveBeenCalled();
              });
            });

            describe('And on mouseout invoke', function() {
              var listener;

              beforeEach(function() {
                listener = jasmine.createSpy('listener');
                crosshair.on('out', listener);
                mouseout();
              });

              it('Then the listener should have been invoked', function() {
                expect(listener).toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });
});