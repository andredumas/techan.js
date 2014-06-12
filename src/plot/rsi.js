'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_rsi, plot) {  // Injected dependencies
  function rsi() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_rsi();

    function rsiPlot(g, data) {
      var group = plot.groupSelect(g, [data], accessor.date());

      group.entry.append('path').attr({ class: 'overbought' });
      group.entry.append('path').attr({ class: 'middle' });
      group.entry.append('path').attr({ class: 'oversold' });
      group.entry.append('path').attr({ class: 'rsi' });

      rsiPlot.refresh(g);
    }

    rsiPlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale, plot);
    };

    rsiPlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return rsiPlot;
    };

    rsiPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return rsiPlot;
    };

    rsiPlot.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return rsiPlot;
    };

    return rsiPlot;
  }

  return rsi;
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.overbought').attr({ d: plot.horizontalPathLine(x, accessor.ob, y) });
  g.selectAll('path.middle').attr({ d: plot.horizontalPathLine(x, accessor.m, y) });
  g.selectAll('path.oversold').attr({ d: plot.horizontalPathLine(x, accessor.os, y) });
  g.selectAll('path.rsi').attr({ d: plot.pathLine(accessor.d, x, accessor.r, y) });
}