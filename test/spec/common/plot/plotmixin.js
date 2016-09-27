function plotMixinShouldBeSetup(scope) {
  'use strict';

  PlotRenderTester().scope(scope).testMixin();
}

function plotShouldRenderWithoutError(scope, data, domFixtures, domAssertions, dataElementsCount, childElementCount) {
  'use strict';

  PlotRenderTester(domFixtures)
    .scope(scope)
    .data(data)
    .domAssertions(domAssertions)
    .dataElementsCount(dataElementsCount)
    .childElementCount(childElementCount)
    .defaultXDomain(true)
    .testRender();
}

function PlotRenderTester(domFixtures) {
  'use strict';

  var scope = {},
      data,
      domAssertions,
      dataElementsCount,
      childElementCount,
      defaultXDomain = false,
      xDomain;

  function TestPlot() {
    var plot,
        g,
        domScope = {};

    beforeEach(function () {
      plot = scope.plot;

      if(defaultXDomain) {
        if(data !== undefined && plot.xScale !== undefined) plot.xScale().domain(data.map(function(d) { return d.date; }));
      }

      g = domFixtures.g(data);
      domScope.g = g;
      domScope.plot = plot;
    });

    describe('And on default invoke', function() {
      var dataElements,
        childElements;

      beforeEach(function() {
        plot(g);
        dataElements = domScope.dataElements = g.selectAll('g.root > g.data').nodes();
        childElements = domScope.childElements = g.selectAll('g.root > g.data > *').nodes();
      });

      it('Then it should render without error', function() {
        expect(g.node().innerHTML).not.toContain('NaN');
      });

      if(dataElementsCount !== undefined) {
        it('Then the plot should render a single data element', function () {
          expect(dataElements.length).toEqual(dataElementsCount);
        });
      }

      if(childElementCount !== undefined) {
        it('Then contains 3 child elements', function() {
          expect(childElements.length).toEqual(childElementCount);
        });
      }

      if(domAssertions !== undefined) domAssertions(domScope);

      describe('And on refresh', function() {
        beforeEach(function() {
          plot.refresh(g);
        });

        it('Then it should be refreshed without error', function() {
          expect(g.node().innerHTML).not.toContain('NaN');
        });

        if(dataElementsCount !== undefined) {
          it('Then the plot should render a single data element', function () {
            expect(dataElements.length).toEqual(dataElementsCount);
          });
        }

        if(childElementCount !== undefined) {
          it('Then contains 3 child elements', function() {
            expect(childElements.length).toEqual(childElementCount);
          });
        }

        if(domAssertions !== undefined) domAssertions(domScope);
      });
    });
  }

  TestPlot.scope = function(_) {
    if(!arguments.length) return scope;
    scope = _;
    return TestPlot;
  };

  TestPlot.data = function(_) {
    if(!arguments.length) return data;
    data = _;
    return TestPlot;
  };

  TestPlot.domAssertions = function(_) {
    if(!arguments.length) return domAssertions;
    domAssertions = _;
    return TestPlot;
  };

  TestPlot.dataElementsCount = function(_) {
    if(!arguments.length) return dataElementsCount;
    dataElementsCount = _;
    return TestPlot;
  };

  TestPlot.childElementCount = function(_) {
    if(!arguments.length) return childElementCount;
    childElementCount = _;
    return TestPlot;
  };

  TestPlot.xDomain = function(_) {
    if(!arguments.length) return xDomain;
    xDomain = _;
    return TestPlot;
  };

  TestPlot.defaultXDomain = function(_) {
    if(!arguments.length) return defaultXDomain;
    defaultXDomain = _;
    return TestPlot;
  };

  TestPlot.testRender = function() {
    TestPlot();
    return TestPlot;
  };

  TestPlot.testMixin = function() {
    it('Then the plot mixin methods should be defined', function () {
      expect(scope.plot.xScale).toBeDefined();
      expect(scope.plot.yScale).toBeDefined();
      expect(scope.plot.accessor).toBeDefined();
    });
  };

  return TestPlot;
}