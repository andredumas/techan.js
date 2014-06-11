'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_volume, plot) {  // Injected dependencies
  function volume() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_volume();

    function volumePlot(g, data) {
      var volume = plot.groupSelect(g, data, accessor.date())
        .entry.append('path')
          .attr({ class: 'volume' });

        if(accessor.o && accessor.c) {
          volume.classed(plot.classedUpDown(accessor));
        }

      volumePlot.refresh(g);
    }

    volumePlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale);
    };

    volumePlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return volumePlot;
    };

    volumePlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return volumePlot;
    };

    volumePlot.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return volumePlot;
    };

    return volumePlot;
  }

  return volume;
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.volume').attr({ d: volumePath(accessor, x, y) });
}

function volumePath(accessor, x, y) {
  return function(d) {
    var path = [],
        xValue = x(accessor.d(d)),
        zero = y(0),
        height = y(accessor.v(d)) - zero,
        rangeBand = x.rangeBand();

    path.push('M', xValue, zero);
    path.push('l', 0, height);
    path.push('l', rangeBand, 0);
    path.push('l', 0, -height);

    return path.join(' ');
  };
}