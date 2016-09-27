techanModule('plot/tradearrow', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/trade').alternating,
      domFixtures = require('../_fixtures/dom'),
      spies = {};

  var actualInit = function() {
    return techan.plot.tradearrow;
  };

  var mockedMouseInit = function(tradearrow) {
    spies.d3_mouse = jasmine.createSpy('d3_mouse');

    var plot = require('../../../../src/plot/plot')(d3.line, spies.d3_select),
        plotMixin = require('../../../../src/plot/plotmixin')(d3.scaleLinear, d3.functor, techan.scale.financetime, plot.dataSelector);

    return tradearrow(d3.select, d3.functor, spies.d3_mouse, d3.dispatch, techan.accessor.trade, plot, plotMixin, techan.svg.arrow);
  };


  specBuilder.require(require('../../../../src/plot/tradearrow'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And tradearrow is initialised with defaults', function () {
        var tradearrow;

        plotShouldRenderWithoutError(scope, data, domFixtures);
        plotMixinShouldBeSetup(scope);

        beforeEach(function() {
          tradearrow = scope.tradearrow;
        });

        it('Then invoke y set must return the same instance', function() {
          expect(tradearrow.y(function(d) { return 0; })).toEqual(tradearrow);
        });

        it('Then invoke type set must return the same instance', function() {
          expect(tradearrow.orient({ test:function(d) { return 0; } })).toEqual(tradearrow);
        });

        it('Then invoke arrow must return the arrow', function() {
          expect(tradearrow.arrow()).toBeDefined();
        });
      });
    });

    instanceBuilder.instance('mocked mouse', mockedMouseInit, function(scope) {
      describe('And tradearrow is initialised with defaults', function () {

        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 3);
        plotMixinShouldBeSetup(scope);

        function assertDom(scope) {
          var childElements;

          beforeEach(function() {
            childElements = scope.childElements;
          });

          describe('And on obtaining the data element', function() {
            it('Then contains a buy', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<path class="tradearrow buy" d="M 0.2549019607843137 1.1 l -6 7.5 l 4 0 l 0 7.5 l 4 0 l 0 -7.5 l 4 0 z"></path>');
            });

            it('Then contains a sell', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<path class="tradearrow sell" d="M 0.7450980392156863 1 l -6 -7.5 l 4 0 l 0 -7.5 l 4 0 l 0 7.5 l 4 0 z"></path>');
            });

            it('Then contains a equal', function() {
              expect(childElements[2].outerHTML)
                .toEqual('<path class="highlight" style="pointer-events: none;"></path>');
            });
          });
        }
      });

      describe('And mouse events are obtained', function() {
        var tradearrow,
          g,
          mouseenter,
          mouseout;

        beforeEach(function() {
          tradearrow = scope.tradearrow;
          tradearrow.xScale().domain(data.map(function(d) { return d.date; }));
          g = domFixtures.g(data);
          tradearrow(g);
          mouseenter = g.selectAll('path.tradearrow').on('mouseenter');
          mouseout = g.selectAll('path.tradearrow').on('mouseout');
        });

        it('Then mousenter should be defined', function() {
          expect(mouseenter).toBeDefined();
        });

        it('Then mouseout should be defined', function() {
          expect(mouseout).toBeDefined();
        });

        it('Then g should have 3 path items appended (buy, sell, highlight)', function() {
          expect(g.selectAll('path').size()).toEqual(3);
        });

        describe('And the mouse enter event is called', function() {
          beforeEach(function() {
            spies.d3_mouse.and.returnValue([2, 0]);

            mouseenter.call(g.select('path.tradearrow.buy').node(), data);
          });

          it('Then highlighted will have choosen the nearest', function() {
            expect(g.node().innerHTML).toEqual('<g class="data"><path class="tradearrow buy" d="M 0.2549019607843137 1.1 l -6 7.5 l 4 0 l 0 7.5 l 4 0 l 0 -7.5 l 4 0 z"></path><path class="tradearrow sell" d="M 0.7450980392156863 1 l -6 -7.5 l 4 0 l 0 -7.5 l 4 0 l 0 7.5 l 4 0 z"></path><path class="highlight sell" d="M 0.7450980392156863 1 l -6 -7.5 l 4 0 l 0 -7.5 l 4 0 l 0 7.5 l 4 0 z" style="pointer-events: none;"></path></g>');
          });

          describe('And the mouse out event is called', function() {
            beforeEach(function() {
              mouseout.call(g.select('path.tradearrow.buy').node(), data);
            });

            it('Then highlighted will be cleared', function() {
              expect(g.node().innerHTML).toEqual('<g class="data"><path class="tradearrow buy" d="M 0.2549019607843137 1.1 l -6 7.5 l 4 0 l 0 7.5 l 4 0 l 0 -7.5 l 4 0 z"></path><path class="tradearrow sell" d="M 0.7450980392156863 1 l -6 -7.5 l 4 0 l 0 -7.5 l 4 0 l 0 7.5 l 4 0 z"></path><path class="highlight" style="pointer-events: none;"></path></g>');
            });
          });
        });
      });
    });
  });
});