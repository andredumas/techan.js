'use strict';

module.exports = function(d3_svg_area, accessor_ichimoku, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function ichimoku(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array),
          clipUpId = 'kumoclipup-' + randomID(),
          clipDownId = 'kumoclipdown-' + randomID();

      group.entry.append('clipPath').attr({ id: clipUpId, class: 'kumoclipup' }).append('path');
      group.entry.append('clipPath').attr({ id: clipDownId, class: 'kumoclipdown' }).append('path');
      group.entry.append('path').attr({ class: 'kumo up', 'clip-path':'url(#' + clipUpId + ')' });
      group.entry.append('path').attr({ class: 'kumo down', 'clip-path': 'url(#' + clipDownId + ')' });
      group.entry.append('path').attr('class', 'senkouspana');
      group.entry.append('path').attr('class', 'senkouspanb');

      group.entry.append('path').attr('class', 'chikouspan');
      group.entry.append('path').attr('class', 'tenkansen');
      group.entry.append('path').attr('class', 'kijunsen');

      ichimoku.refresh(g);
    }

    ichimoku.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    function refresh(g, accessor, x, y, plot) {
      g.selectAll('.kumoclipup path').attr('d', clipArea(accessor, x, y, y.range()[1]));
      g.selectAll('.kumoclipdown path').attr('d', clipArea(accessor, x, y, y.range()[0]));
      g.selectAll('path.kumo.up').attr('d', pathArea(accessor, x, y));
      g.selectAll('path.kumo.down').attr('d', pathArea(accessor, x, y));
      g.selectAll('path.senkouspana').attr('d', plot.pathLine(accessor.d, x, accessor.sa, y, accessor.pks));
      g.selectAll('path.senkouspanb').attr('d', plot.pathLine(accessor.d, x, accessor.sb, y, accessor.pks));

      g.selectAll('path.chikouspan').attr('d', plot.pathLine(accessor.d, x, accessor.c, y, negate(accessor.pks)));
      g.selectAll('path.tenkansen').attr('d', plot.pathLine(accessor.d, x, accessor.ts, y));
      g.selectAll('path.kijunsen').attr('d', plot.pathLine(accessor.d, x, accessor.ks, y));
    }

    function clipArea(accessor, x, y, top) {
      return d3_svg_area()
        .defined(function(d) { return accessor.sb(d) !== null; })
        .x(function(d) { return x(accessor.d(d), accessor.pks(d)); } )
        .y0(function(d) { return y(accessor.sb(d)); } )
        .y1(top);
    }

    function pathArea(accessor, x, y) {
      return d3_svg_area()
        .defined(function(d) { return accessor.sa(d) !== null && accessor.sb(d) !== null; })
        .x(function(d) { return x(accessor.d(d), accessor.pks(d)); } )
        .y0(function(d) { return y(accessor.sa(d)); } )
        .y1(function(d) { return y(accessor.sb(d)); } );
    }

    function negate(accessor) {
      return function(d) {
        return -accessor(d);
      };
    }

    function randomID() {
      return Math.random().toString(36).substr(2, 9);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(ichimoku, p).plot(accessor_ichimoku());

    return ichimoku;
  };
};