'use strict';

module.exports = function(accessor_macd, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        differenceGenerator,
        macdLine = plot.pathLine(),
        signalLine = plot.pathLine();

    function macd(g) {
      var group = p.dataSelector(g);

      group.selection.append('path').attr('class', 'difference');
      group.selection.append('path').attr('class', 'zero');
      group.selection.append('path').attr('class', 'macd');
      group.selection.append('path').attr('class', 'signal');

      macd.refresh(g);
    }

    macd.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, differenceGenerator, macdLine, signalLine);
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
          width = p.width(x);

      return function(d) {
        var zero = y(0),
          height = y(accessor.dif(d)) - zero,
          xValue = x(accessor.d(d)) - width/2;

        return 'M ' + xValue + ' ' + zero + ' l 0 ' + height + ' l ' + width +
          ' 0 l 0 ' + (-height);
      };
    }

    // Mixin 'superclass' methods and variables
    plotMixin(macd, p).plot(accessor_macd(), binder).width(binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return macd;
  };
};

function refresh(selection, accessor, x, y, plot, differenceGenerator, macdLine, signalLine) {
  selection.select('path.difference').attr('d', differenceGenerator);
  selection.select('path.zero').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.z, y));
  selection.select('path.macd').attr('d', macdLine);
  selection.select('path.signal').attr('d', signalLine);
}