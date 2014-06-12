'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_macd, plot) {  // Injected dependencies
  function macd() { // Closure function
    var xScale = techan_scale_financetime(),
      yScale = d3_scale_linear(),
      accessor = accessor_macd();

    function macdPlot(g, data) {
      var group = plot.groupSelect(g, [data], accessor.date());

      var histogramSelection = group.selection
        .append('g').attr({ class: 'difference' })
        .selectAll('g.difference').data(function(data) { return data; });

      histogramSelection.append('path').attr({ class: 'difference' });

      group.selection.append('path').attr({ class: 'zero' });
      group.selection.append('path').attr({ class: 'macd' });
      group.selection.append('path').attr({ class: 'signal' });

      macdPlot.refresh(g);
    }

    macdPlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale, plot);
    };

    macdPlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return macdPlot;
    };

    macdPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return macdPlot;
    };

    macdPlot.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return macdPlot;
    };

    return macdPlot;
  }

  return macd;
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.difference').attr({ d: differencePath(accessor, x, y) });
  g.selectAll('path.zero').attr({ d: plot.horizontalPathLine(x, accessor.z, y) });
  g.selectAll('path.macd').attr({ d: plot.pathLine(accessor.d, x, accessor.m, y) });
  g.selectAll('path.signal').attr({ d: plot.pathLine(accessor.d, x, accessor.s, y) });
}

function differencePath(accessor, x, y) {
  return function(d) {
    var path = [],
        xValue = x(accessor.d(d)),
        zero = y(0),
        height = y(accessor.dif(d)) - zero,
        rangeBand = x.rangeBand();

    path.push('M', xValue, zero);
    path.push('l', 0, height);
    path.push('l', rangeBand, 0);
    path.push('l', 0, -height);

    return path.join(' ');
  };
}