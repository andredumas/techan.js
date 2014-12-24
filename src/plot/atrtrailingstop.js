'use strict';

module.exports = function(accessor_atrtrailingstop, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function atrtrailingstop(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array);

      group.entry.append('path').attr('class', 'up');
      group.entry.append('path').attr('class', 'down');

      atrtrailingstop.refresh(g);
    }

    atrtrailingstop.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(atrtrailingstop, p).plot(accessor_atrtrailingstop());

    return atrtrailingstop;
  };
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.up').attr('d', plot.pathLine(accessor.d, x, accessor.up, y));
  g.selectAll('path.down').attr('d', plot.pathLine(accessor.d, x, accessor.dn, y));
}