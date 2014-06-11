'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_volume, plot) {  // Injected dependencies
  function volume() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_volume();

    function volumePlot(g, data) {
      var volume = plot.groupSelect(g, data, accessor.date())
        .entry.append('rect')
          .attr({ class: 'volume' });

        if(accessor.o && accessor.c) {
          volume.classed(plot.classedUpDown(accessor));
        }

      volumePlot.refresh(g);
    }

    // Simply used for scale updates, no enter/exit functions
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
  g.selectAll('rect.volume')
    .attr({
      x: function(d) { return x(accessor.d(d)); },
      y: function(d) { return y(accessor.v(d)); },
      width: x.rangeBand(),
      height: function(d) { return y(0) - y(accessor.v(d)); }
    });
}