'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_tick, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        tickGenerator,
        lineWidthGenerator;

    function tick(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);
      group.entry.append('path').attr('class', 'tick');

      tick.refresh(g);
    }

    tick.refresh = function(g) {
      g.selectAll('path.tick').attr('d', tickGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      tickGenerator = plot.joinPath(tickPath);
      lineWidthGenerator = plot.lineWidth(p.xScale, 1, 2);
    }

    function tickPath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x),
        r = plot.r;

      return function(d) {
        var high = y(accessor.h(d)),
          low = y(accessor.l(d)),
          xPoint = x(accessor.d(d)),
          xValue = xPoint - width/2;

        return [
          'M', xValue, high,
          'l', width, 0,
          'M', xPoint, high,
          'L', xPoint, low,
          'M', xValue, low,
          'l', width, 0
        ].join(' ');
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(tick, p).plot(accessor_tick(), binder).width(binder);

    return tick;
  };
};