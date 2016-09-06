'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_tick, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        tickGenerator,
        lineWidthGenerator;

    function tick(g) {
      p.dataSelector(g).entry.append('path').attr('class', 'tick');

      tick.refresh(g);
    }

    tick.refresh = function(g) {
      p.dataSelector.select(g).select('path.tick').attr('d', tickGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      tickGenerator = plot.joinPath(tickPath);
      lineWidthGenerator = plot.scaledStrokeWidth(p.xScale, 1, 2);
    }

    function tickPath() {
      var accessor = p.accessor,
          x = p.xScale,
          y = p.yScale,
          width = p.width(x);

      return function(d) {
        var high = y(accessor.h(d)),
          low = y(accessor.l(d)),
          xPoint = x(accessor.d(d)),
          xValue = xPoint - width/2;

        return 'M ' + xValue + ' ' + high + ' l ' + width + ' 0 M ' + xPoint + ' ' + high +
          ' L ' + xPoint + ' ' + low + ' M ' + xValue + ' ' + low + ' l ' + width + ' 0';
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(tick, p).plot(accessor_tick(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return tick;
  };
};