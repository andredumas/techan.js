'use strict';

module.exports = function(accessor_value, plot, plotMixin, showZero) {  // Injected dependencies
  showZero = showZero || false;

  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        svgLine = plot.pathLine();

    function line(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'line');

      if(showZero) {
        group.selection.append('path').attr('class', 'zero');
      }

      line.refresh(g);
    }

    line.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.accessor, p.xScale, p.yScale, plot, svgLine, showZero);
    };

    function binder() {
      svgLine.init(p.accessor.d, p.xScale, p.accessor, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(line, p).plot(accessor_value(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return line;
  };
};

function refresh(selection, accessor, x, y, plot, svgLine, showZero) {
  selection.select('path.line').attr('d', svgLine);

  if(showZero) {
    selection.select('path.zero').attr('d', plot.horizontalPathLine(x, accessor.z, y));
  }
}