'use strict';

module.exports = function(accessor_williams, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        upLine = plot.pathLine();

    function williams(g) {
      p.dataSelector(g).entry.append('path').attr('class', 'williams up');
      williams.refresh(g);
    }

    williams.refresh = function(g) {
      p.dataSelector.select(g).select('path.williams.up').attr('d', upLine);
    };

    function binder() {
      upLine.init(p.accessor.d, p.xScale, p.accessor.w, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(williams, p).plot(accessor_williams(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return williams;
  };
};