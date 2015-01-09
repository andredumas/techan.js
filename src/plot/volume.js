'use strict';

module.exports = function(accessor_volume, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        volumeGenerator;

    function volume(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      if(p.accessor.o && p.accessor.c) plot.appendUpDownEqual(group.selection, p.accessor, 'volume');
      else group.entry.append('path').attr('class', 'volume');

      volume.refresh(g);
    }

    volume.refresh = function(g) {
      g.selectAll('path.volume').attr('d', volumeGenerator);
    };

    function binder() {
      volumeGenerator = plot.joinPath(p.accessor, p.xScale, p.yScale, volumePath);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(volume, p).plot(accessor_volume(), binder);

    return volume;
  };
};

function volumePath(accessor, x, y, barWidth) {
  return function(d) {
    var vol = accessor.v(d);

    if(isNaN(vol)) return null;

    var zero = y(0),
        height = y(vol) - zero,
        rangeBand = barWidth(x),
        xValue = x(accessor.d(d)) - rangeBand/2;

    return [
        'M', xValue, zero,
        'l', 0, height,
        'l', rangeBand, 0,
        'l', 0, -height
      ].join(' ');
  };
}