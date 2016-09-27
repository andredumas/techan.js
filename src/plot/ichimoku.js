'use strict';

module.exports = function(d3_svg_area, d3_line_interpolate, accessor_ichimoku, plot, plotMixin) {  // Injected dependencies
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
      var group = p.dataSelector(g),
          clipUpId = 'kumoclipup-' + randomID(),
          clipDownId = 'kumoclipdown-' + randomID();

      group.entry.append('clipPath').attr('id', clipDownId).attr('class', 'kumoclipdown').append('path');
      group.entry.append('clipPath').attr('id', clipUpId).attr('class', 'kumoclipup').append('path');
      group.entry.append('path').attr('class', 'kumo down').attr('clip-path', 'url(#' + clipDownId + ')');
      group.entry.append('path').attr('class', 'kumo up').attr('clip-path', 'url(#' + clipUpId + ')');
      group.entry.append('path').attr('class', 'senkouspanb');
      group.entry.append('path').attr('class', 'senkouspana');

      group.entry.append('path').attr('class', 'chikouspan');
      group.entry.append('path').attr('class', 'kijunsen');
      group.entry.append('path').attr('class', 'tenkansen');

      ichimoku.refresh(g);
    }

    ichimoku.refresh = function(g) {
      refresh(p.dataSelector.select(g), p.yScale);
    };

    function refresh(selection, y) {
      selection.select('.kumoclipdown path').attr('d', kumoClip.y1(y.range()[0])); // Fill the bottom of the cloud to be clipped
      selection.select('.kumoclipup path').attr('d', kumoClip.y1(y.range()[1])); // Fill the top of the cloud to be clipped
      selection.select('path.kumo.down').attr('d', kumo);
      selection.select('path.kumo.up').attr('d', kumo);
      selection.select('path.senkouspanb').attr('d', senkouSpanB);
      selection.select('path.senkouspana').attr('d', senkouSpanA);

      selection.select('path.chikouspan').attr('d', chikouSpan);
      selection.select('path.kijunsen').attr('d', kijunsen);
      selection.select('path.tenkansen').attr('d', tenkanSen);
    }

    function binder() {
      senkouSpanA.init(p.accessor.d, p.xScale, p.accessor.sa, p.yScale, p.accessor.pks);
      senkouSpanB.init(p.accessor.d, p.xScale, p.accessor.sb, p.yScale, p.accessor.pks);
      chikouSpan .init(p.accessor.d, p.xScale, p.accessor.c,  p.yScale, negate(p.accessor.pks));
      tenkanSen  .init(p.accessor.d, p.xScale, p.accessor.ts, p.yScale);
      kijunsen   .init(p.accessor.d, p.xScale, p.accessor.ks, p.yScale);
    }

    function kumoClipArea() {
      return d3_svg_area().curve(d3_line_interpolate)
        .defined(function(d) { return p.accessor.sb(d) !== null; })
        .x(function(d) { return p.xScale(p.accessor.d(d), p.accessor.pks(d)); } )
        .y0(function(d) { return p.yScale(p.accessor.sb(d)); } );
    }

    function kumoPathArea() {
      return d3_svg_area().curve(d3_line_interpolate)
        .defined(function(d) { return p.accessor.sa(d) !== null && p.accessor.sb(d) !== null; })
        .x(function(d) { return p.xScale(p.accessor.d(d), p.accessor.pks(d)); } )
        .y0(function(d) { return p.yScale(p.accessor.sa(d)); } )
        .y1(function(d) { return p.yScale(p.accessor.sb(d)); } );
    }

    // Mixin 'superclass' methods and variables
    plotMixin(ichimoku, p).plot(accessor_ichimoku(), binder).dataSelector(plotMixin.dataMapper.array);
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