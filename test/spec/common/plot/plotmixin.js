function plotMixinShouldBeSetup(scope) {
  'use strict';

  it('Then the plot mixin methods should be defined', function () {
    expect(scope.plot.xScale).toBeDefined();
    expect(scope.plot.yScale).toBeDefined();
    expect(scope.plot.accessor).toBeDefined();
  });
}

function plotShouldRenderWithoutError(scope, data, domFixtures) {
  'use strict';

  var plot,
      g;

  beforeEach(function () {
    plot = scope.plot;
    plot.xScale().domain(data.map(function(d) { return d.date; }));
    g = domFixtures.g(data);
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
}