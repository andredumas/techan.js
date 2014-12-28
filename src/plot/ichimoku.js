'use strict';

module.exports = function(d3_svg_area, accessor_ichimoku, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        kumoClip = kumoClipArea(),
        kumo = kumoPathArea(),
        senkouSpanA = plot.pathLine(),
        senkouSpanB = plot.pathLine(),
        chikouSpan = plot.pathLine(),
        tenkanSen = plot.pathLine(),
        kijunsen = plot.pathLine();

    function ichimoku(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array),
          clipUpId = 'kumoclipup-' + randomID(),
          clipDownId = 'kumoclipdown-' + randomID();

      group.entry.append('clipPath').attr({ id: clipDownId, class: 'kumoclipdown' }).append('path');
      group.entry.append('clipPath').attr({ id: clipUpId, class: 'kumoclipup' }).append('path');
      group.entry.append('path').attr({ class: 'kumo down', 'clip-path': 'url(#' + clipDownId + ')' });
      group.entry.append('path').attr({ class: 'kumo up', 'clip-path':'url(#' + clipUpId + ')' });
      group.entry.append('path').attr('class', 'senkouspanb');
      group.entry.append('path').attr('class', 'senkouspana');

      group.entry.append('path').attr('class', 'chikouspan');
      group.entry.append('path').attr('class', 'kijunsen');
      group.entry.append('path').attr('class', 'tenkansen');

      ichimoku.refresh(g);
    }

    ichimoku.refresh = function(g) {
      refresh(g, p.yScale);
    };

    function refresh(g, y) {
      g.selectAll('.kumoclipdown path').attr('d', kumoClip.y1(y.range()[0])); // Fill the bottom of the cloud to be clipped
      g.selectAll('.kumoclipup path').attr('d', kumoClip.y1(y.range()[1])); // Fill the top of the cloud to be clipped
      g.selectAll('path.kumo.down').attr('d', kumo);
      g.selectAll('path.kumo.up').attr('d', kumo);
      g.selectAll('path.senkouspanb').attr('d', senkouSpanB);
      g.selectAll('path.senkouspana').attr('d', senkouSpanA);

      g.selectAll('path.chikouspan').attr('d', chikouSpan);
      g.selectAll('path.kijunsen').attr('d', kijunsen);
      g.selectAll('path.tenkansen').attr('d', tenkanSen);
    }

    function binder() {
      senkouSpanA.init(p.accessor.d, p.xScale, p.accessor.sa, p.yScale, p.accessor.pks);
      senkouSpanB.init(p.accessor.d, p.xScale, p.accessor.sb, p.yScale, p.accessor.pks);
      chikouSpan .init(p.accessor.d, p.xScale, p.accessor.c,  p.yScale, negate(p.accessor.pks));
      tenkanSen  .init(p.accessor.d, p.xScale, p.accessor.ts, p.yScale);
      kijunsen   .init(p.accessor.d, p.xScale, p.accessor.ks, p.yScale);
    }

    function kumoClipArea() {
      return d3_svg_area().interpolate('monotone')
        .defined(function(d) { return p.accessor.sb(d) !== null; })
        .x(function(d) { return p.xScale(p.accessor.d(d), p.accessor.pks(d)); } )
        .y0(function(d) { return p.yScale(p.accessor.sb(d)); } );
    }

    function kumoPathArea() {
      return d3_svg_area().interpolate('monotone')
        .defined(function(d) { return p.accessor.sa(d) !== null && p.accessor.sb(d) !== null; })
        .x(function(d) { return p.xScale(p.accessor.d(d), p.accessor.pks(d)); } )
        .y0(function(d) { return p.yScale(p.accessor.sa(d)); } )
        .y1(function(d) { return p.yScale(p.accessor.sb(d)); } );
    }

    // Mixin 'superclass' methods and variables
    plotMixin(ichimoku, p).plot(accessor_ichimoku(), binder);
    binder();

    return ichimoku;
  };
};

function negate(accessor) {
  return function(d) {
    return -accessor(d);
  };
}

function randomID() {
  return Math.random().toString(36).substr(2, 9);
}