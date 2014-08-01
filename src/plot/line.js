'use strict';

module.exports = function(accessor_value, plot, plotMixin, showZero) {  // Injected dependencies
  showZero = showZero || false;

  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function line(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.date());

      group.entry.append('path').attr('class', 'line');

      if(showZero) {
        group.selection.append('path').attr('class', 'zero');
      }

      line.refresh(g);
    }

    line.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot, showZero);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(line, p, accessor_value());

    return line;
  };
};

function refresh(g, accessor, x, y, plot, showZero) {
  g.selectAll('path.line').attr('d', plot.pathLine(accessor.d, x, accessor, y));

  if(showZero) {
    g.selectAll('path.zero').attr('d', plot.horizontalPathLine(x, accessor.z, y));
  }
}