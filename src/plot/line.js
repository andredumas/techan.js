'use strict';

module.exports = function(accessor_value, plot, plotMixin, showZero) {  // Injected dependencies
  showZero = showZero || false;

  function line() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function linePlot(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.date());

      group.entry.append('path').attr({ class: 'line' });

      if(showZero) {
        group.selection.append('path').attr({ class: 'zero' });
      }

      linePlot.refresh(g);
    }

    linePlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot, showZero);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(linePlot, p, accessor_value());

    return linePlot;
  }

  return line;
};

function refresh(g, accessor, x, y, plot, showZero) {
  g.selectAll('path.line').attr({ d: plot.pathLine(accessor.d, x, accessor, y) });

  if(showZero) {
    g.selectAll('path.zero').attr({ d: plot.horizontalPathLine(x, accessor.z, y) });
  }
}