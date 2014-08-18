// TODO Assert mouse movements and updated DOM
techanModule('plot/crosshair', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom'),
      spies = { g: { parentNode: {} }, plot: {} },
      crosshair,
      g;

  var actualInit = function() {
    return techan.plot.crosshair;
  };

  var mockInit = function(crosshair) {
    spies.d3_mouse = jasmine.createSpy('d3_mouse');
    return crosshair(d3.select, d3.event, spies.d3_mouse, techan.plot.axisannotation);
  };

  function assertDomStructure(gScope) {
    var parent;

    beforeEach(function() {
      parent = gScope.g[0][0];
    });

    it('Then the children element count should be 2', function() {
      expect(parent.childNodes.length).toEqual(2);
    });

    it('Then the first child element should be g.data', function() {
      expect(parent.childNodes[0].nodeName.toLowerCase()).toEqual('g');
      expect(parent.childNodes[0].className).toEqual('data');
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

      it('Then the g.axisannotation.x should have 1 child', function() {
        expect(axisAnnotationXGroup.childNodes.length).toEqual(1);
      });

      it('Then the g.axisannotation.x child should be g.0', function() {
        expect(axisAnnotationXGroup.childNodes[0].nodeName.toLowerCase()).toEqual('g');
        expect(axisAnnotationXGroup.childNodes[0].className).toEqual('0');
      });

      it('Then the fourth child element should be g.axisannotation.y', function() {
        expect(axisAnnotationYGroup.nodeName.toLowerCase()).toEqual('g');
        expect(axisAnnotationYGroup.className).toEqual('axisannotation y');
      });

      it('Then the g.axisannotation.y should have 1 child', function() {
        expect(axisAnnotationYGroup.childNodes.length).toEqual(1);
      });

      it('Then the g.axisannotation.y child should be g.0', function() {
        expect(axisAnnotationYGroup.childNodes[0].nodeName.toLowerCase()).toEqual('g');
        expect(axisAnnotationYGroup.childNodes[0].className).toEqual('0');
      });
    });
  }

  specBuilder.require(require('../../../../src/plot/crosshair'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And crosshair is initialised with defaults', function () {
        beforeEach(function () {
          crosshair = scope.plot;
          g = domFixtures.g();
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
    });

    instanceBuilder.instance('mocked', mockInit, function(scope) {
      describe('And crosshair is initialised with defaults', function () {
        beforeEach(function () {
          crosshair = scope.crosshair;
          g = domFixtures.g();
        });

        describe('And selection is mocked', function () {
          var selectSpies = {};

          beforeEach(function () {
            // Too many spies MUCH???
            // Convert to spies on actuals?
            spies.plot.groupSelect = jasmine.createSpy('groupSelect');
            spies.plot.groupSelect.and.returnValue({entry: selectSpies, selection: selectSpies});
            spies.g.selectAll = jasmine.createSpy('selectAll');
            spies.g.selectAll.and.returnValue(selectSpies);
            spies.g.select = jasmine.createSpy('select');
            spies.g.select.and.returnValue(selectSpies);
            selectSpies.select = spies.g.select;
            selectSpies.selectAll = spies.g.selectAll;
            selectSpies.enter = jasmine.createSpy('enter');
            selectSpies.enter.and.returnValue(selectSpies);
            selectSpies.exit = jasmine.createSpy('exit');
            selectSpies.exit.and.returnValue(selectSpies);
            selectSpies.each = jasmine.createSpy('each');
            selectSpies.each.and.returnValue(selectSpies);
            selectSpies.on = jasmine.createSpy('on');
            selectSpies.on.and.returnValue(selectSpies);
            selectSpies.remove = jasmine.createSpy('remove');
            selectSpies.remove.and.returnValue(selectSpies);
            selectSpies.data = jasmine.createSpy('data');
            selectSpies.data.and.returnValue(selectSpies);
            selectSpies.append = jasmine.createSpy('append');
            selectSpies.append.and.returnValue(selectSpies);
            selectSpies.attr = jasmine.createSpy('attr');
            selectSpies.attr.and.returnValue(selectSpies);
            selectSpies.style = jasmine.createSpy('style');
            selectSpies.call = jasmine.createSpy('call');
            selectSpies.call.and.returnValue(selectSpies);
          });

          describe('And on default invoke', function() {
            var mouseRectAttribute,
                verticalPathLine,
                horizontalPathLine,
                mousemoveRefresh;

            beforeEach(function() {
              crosshair(spies.g);
              mouseRectAttribute = selectSpies.attr.calls.argsFor(7)[0];
              verticalPathLine = selectSpies.attr.calls.argsFor(8)[1];
              horizontalPathLine = selectSpies.attr.calls.argsFor(9)[1];
              mousemoveRefresh = selectSpies.on.calls.argsFor(2)[1];
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

            describe('And on mousemoveRefresh invoke', function() {
              beforeEach(function() {
                spies.d3_mouse.and.returnValue([1,2]);
                selectSpies.datum = jasmine.createSpy('datum');
                selectSpies.datum.and.returnValue(selectSpies);
                // Redefine the annotation refresh
                crosshair.xAnnotation()[0].refresh = jasmine.createSpy('refresh');
                crosshair.yAnnotation()[0].refresh = jasmine.createSpy('refresh');
                mousemoveRefresh();
              });

              it('Then should execute without error', function() {
                expect(spies.d3_mouse).toHaveBeenCalled();
              });

              it('Then should set correct path.vertical datum', function() {
                expect(selectSpies.select.calls.argsFor(4)[0]).toEqual('path.vertical');
                expect(selectSpies.datum.calls.argsFor(0)[0]).toEqual(1);
              });

              it('Then should set correct path.horizontal datum', function() {
                expect(selectSpies.select.calls.argsFor(5)[0]).toEqual('path.horizontal');
                expect(selectSpies.datum.calls.argsFor(1)[0]).toEqual(2);
              });

              it('Then should refresh x annotation', function() {
                expect(selectSpies.selectAll.calls.argsFor(6)[0]).toEqual('g.axisannotation.x > g');
                selectSpies.each.calls.argsFor(6)[0](undefined, 0);
                expect(crosshair.xAnnotation()[0].refresh).toHaveBeenCalled();
                expect(crosshair.yAnnotation()[0].refresh).not.toHaveBeenCalled();
              });

              it('Then should refresh y annotation', function() {
                expect(selectSpies.selectAll.calls.argsFor(7)[0]).toEqual('g.axisannotation.y > g');
                selectSpies.each.calls.argsFor(7)[0](undefined, 0);
                expect(crosshair.xAnnotation()[0].refresh).not.toHaveBeenCalled();
                expect(crosshair.yAnnotation()[0].refresh).toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });
});