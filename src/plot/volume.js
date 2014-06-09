'use strict';

module.exports = function(techan_scale_financetime, accessor_ohlc, d3_scale_linear, d3_extent, plot) {  // Injected dependencies
  function volume() { // Closure function
    var xScale = techan_scale_financetime(),
      yScale = d3_scale_linear(),
      accessor = accessor_ohlc();

    function volumePlot(g) {
      plot.dataSelection(g, g.data, accessor.date);
      plot.dataEntry(g, g.data, accessor.date)
        .append('rect')
          .attr({ class: 'volume' })
          .classed(plot.classedUpDown(accessor));

      refresh();
    }

    // Simply used for scale updates, no enter/exit functions
    volumePlot.refresh = function(g) {
      refresh(accessor, g, xScale, yScale);
    };

    volumePlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return volumePlot;
    };

    volumePlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return volumePlot;
    };

    accessor.date = function(_) {
      accessor.date(_);
      return accessor;
    };

    accessor.volume = function(_) {
      accessor.volume(_);
      return accessor;
    };

    volumePlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return volumePlot;
    };

    return volumePlot;
  }

  return volume;
};

function refresh(accessor, g, xScale, yScale) {
  g.selectAll('rect.volume')
    .attr({
      x: function(d) { return xScale(accessor.date(d)); },
      y: function(d) { return yScale(accessor.volume(d)); },
      width: xScale.rangeBand(),
      height: function(d) { return yScale(0) - yScale(accessor.volume(d)); }
    });
}