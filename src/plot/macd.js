'use strict';

module.exports = function(accessor_macd, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        differenceGenerator,
        macdLine = plot.pathLine(),
        signalLine = plot.pathLine();

    function macd(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      group.selection.append('path').attr('class', 'difference');
      group.selection.append('path').attr('class', 'zero');
      group.selection.append('path').attr('class', 'macd');
      group.selection.append('path').attr('class', 'signal');

      macd.refresh(g);
    }

    macd.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot, differenceGenerator, macdLine, signalLine);
    };

    function binder() {
      differenceGenerator = plot.joinPath(differencePath);
      macdLine.init(p.accessor.d, p.xScale, p.accessor.m, p.yScale);
      signalLine.init(p.accessor.d, p.xScale, p.accessor.s, p.yScale);
    }

    function differencePath() {
      var accessor = p.accessor,
        x = p.xScale,
        y = p.yScale,
        width = p.width(x),
        r = plot.r;

      return function(d) {
        var zero = y(0),
          height = y(accessor.dif(d)) - zero,
          xValue = x(accessor.d(d)) - width/2;

        return [
          'M', xValue, zero,
          'l', 0, height,
          'l', width, 0,
          'l', 0, -height
        ].join(' ');
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(macd, p).plot(accessor_macd(), binder).width(binder);
    binder();

    return macd;
  };
};

function refresh(g, accessor, x, y, plot, differenceGenerator, macdLine, signalLine) {
  g.selectAll('path.difference').attr('d', differenceGenerator);
  g.selectAll('path.zero').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.z, y));
  g.selectAll('path.macd').attr('d', macdLine);
  g.selectAll('path.signal').attr('d', signalLine);
}