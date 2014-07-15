'use strict';

module.exports = function(accessor_volume, plot, plotMixin) {  // Injected dependencies
  function volume() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function volumePlot(g) {
      var volume = plot.groupSelect(g, plot.dataMapper.unity, p.accessor.d)
        .entry.append('path')
          .attr({ class: 'volume' });

      if(p.accessor.o && p.accessor.c) {
        volume.classed(plot.classedUpDown(p.accessor));
      }

      volumePlot.refresh(g);
    }

    volumePlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(volumePlot, p, accessor_volume());

    return volumePlot;
  }

  return volume;
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.volume').attr({ d: volumePath(accessor, x, y) });
}

function volumePath(accessor, x, y) {
  return function(d) {
    var volume = accessor.v(d);

    if(isNaN(volume)) return null;

    var path = [],
        zero = y(0),
        height = y(volume) - zero,
        rangeBand = x.band(),
        xValue = x(accessor.d(d)) - rangeBand/2;

    path.push('M', xValue, zero);
    path.push('l', 0, height);
    path.push('l', rangeBand, 0);
    path.push('l', 0, -height);

    return path.join(' ');
  };
}