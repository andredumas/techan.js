'use strict';

module.exports = function(accessor_macd, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        macdLine = plot.pathLine(),
        signalLine = plot.pathLine();

    function macd(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      var histogramSelection = group.selection
        .append('g').attr('class', 'difference')
        .selectAll('g.difference').data(function(data) { return data; });

      histogramSelection.exit().remove();
      histogramSelection.enter().append('path').attr('class', 'difference');

      group.selection.append('path').attr('class', 'zero');
      group.selection.append('path').attr('class', 'macd');
      group.selection.append('path').attr('class', 'signal');

      macd.refresh(g);
    }

    macd.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot, macdLine, signalLine);
    };

    function binder() {
      macdLine.init(p.accessor.d, p.xScale, p.accessor.m, p.yScale);
      signalLine.init(p.accessor.d, p.xScale, p.accessor.s, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(macd, p).plot(accessor_macd(), binder);
    binder();

    return macd;
  };
};

function refresh(g, accessor, x, y, plot, macdLine, signalLine) {
  g.selectAll('path.difference').attr('d', differencePath(accessor, x, y));
  g.selectAll('path.zero').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.z, y));
  g.selectAll('path.macd').attr('d', macdLine);
  g.selectAll('path.signal').attr('d', signalLine);
}

function differencePath(accessor, x, y) {
  return function(d) {
    var zero = y(0),
        height = y(accessor.dif(d)) - zero,
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