function assertPlotMixin(scope) {
  'use strict';

  it('Then the plot mixin methods should be defined', function () {
    expect(scope.plot.xScale).toBeDefined();
    expect(scope.plot.yScale).toBeDefined();
    expect(scope.plot.accessor).toBeDefined();
  });
}