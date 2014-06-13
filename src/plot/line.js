'use strict';

module.exports = function(accessor_value, plot, plotMixin, clazz) {  // Injected dependencies
  var classes = ['line'];

  if(clazz) {
    classes.push(clazz);
  }

  var classSelect = classes.join('.'),
      classDeclare = classes.join(' ');

  function line() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function linePlot(g, data) {
      var group = plot.groupSelect(g, [data], p.accessor.date());

      group.entry.append('path').attr({ class: classDeclare });

      linePlot.refresh(g);
    }

    linePlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot, classSelect);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(linePlot, p, accessor_value());

    return linePlot;
  }

  return line;
};

function refresh(g, accessor, x, y, plot, classSelector) {
  g.selectAll('path.' + classSelector).attr({ d: plot.pathLine(accessor.d, x, accessor, y) });
}