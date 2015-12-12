'use strict';

module.exports = function(accessor_williams, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        upLine = plot.pathLine();

    function williams(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);
      group.entry.append('path').attr('class', 'williams up');
      williams.refresh(g);
    }

    williams.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot, upLine);
    };

    function binder() {
      upLine.init(p.accessor.d, p.xScale, p.accessor.w, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(williams, p).plot(accessor_williams(), binder);
    binder();

    return williams;
  };
};

function refresh(g, accessor, x, y, plot, upLine) {
  g.selectAll('path.williams.up').attr('d', upLine);
}
