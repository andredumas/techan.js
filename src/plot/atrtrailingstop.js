'use strict';

module.exports = function(accessor_atrtrailingstop, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        upLine = plot.pathLine(),
        downLine = plot.pathLine();

    function atrtrailingstop(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array);

      group.entry.append('path').attr('class', 'up');
      group.entry.append('path').attr('class', 'down');

      atrtrailingstop.refresh(g);
    }

    atrtrailingstop.refresh = function(g) {
      refresh(g, upLine, downLine);
    };

    function binder() {
      upLine.init(p.accessor.d, p.xScale, p.accessor.up, p.yScale);
      downLine.init(p.accessor.d, p.xScale, p.accessor.dn, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(atrtrailingstop, p).plot(accessor_atrtrailingstop(), binder);
    binder();

    return atrtrailingstop;
  };
};

function refresh(g, upLine, downLine) {
  g.selectAll('path.up').attr('d', upLine);
  g.selectAll('path.down').attr('d', downLine);
}