'use strict';

module.exports = function(accessor_volume, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function volume(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity, p.accessor.d)
        .entry.append('path')
          .attr('class', 'volume');

      if(p.accessor.o && p.accessor.c) {
        group.classed(plot.classedUpDown(p.accessor));
      }

      volume.refresh(g);
    }

    volume.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(volume, p, accessor_volume());

    return volume;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.volume').attr('d', volumePath(accessor, x, y));
}

function volumePath(accessor, x, y) {
  return function(d) {
    var vol = accessor.v(d);

    if(isNaN(vol)) return null;

    var zero = y(0),
        height = y(vol) - zero,
        rangeBand = x.band(),
        xValue = x(accessor.d(d)) - rangeBand/2;

    return [
        'M', xValue, zero,
        'l', 0, height,
        'l', rangeBand, 0,
        'l', 0, -height
      ].join(' ');
  };
}