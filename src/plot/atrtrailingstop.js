'use strict';

module.exports = function(accessor_atrtrailingstop, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        upLine = plot.pathLine(),
        downLine = plot.pathLine();

    function atrtrailingstop(g) {
      var group = p.dataSelector(g);

      group.entry.append('path').attr('class', 'up');
      group.entry.append('path').attr('class', 'down');

      atrtrailingstop.refresh(g);
    }

    atrtrailingstop.refresh = function(g) {
      refresh(p.dataSelector.select(g), upLine, downLine);
    };

    function binder() {
      upLine.init(p.accessor.d, p.xScale, p.accessor.up, p.yScale);
      downLine.init(p.accessor.d, p.xScale, p.accessor.dn, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(atrtrailingstop, p).plot(accessor_atrtrailingstop(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return atrtrailingstop;
  };
};

function refresh(selection, upLine, downLine) {
  selection.select('path.up').attr('d', upLine);
  selection.select('path.down').attr('d', downLine);
}