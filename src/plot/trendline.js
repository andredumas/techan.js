'use strict';

module.exports = function(accessor_trendline, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function trendline(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity, p.accessor.d);

      group.entry.append('path').attr({ class: 'trendline' });
      // TODO End markers?

      trendline.refresh(g);
    }

    trendline.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    trendline.drag = function() { // What name?
      // TODO Setup d3.behaviour.drag() on elements. Emit events, add interaction support, end markers?
      /*
      Possible Usage:
       d3.select("trendlines")
         .call(trendline.interaction/drag/draggable/notsure())
            .on('dragstart', dragStart)
            .on('drag', drag)
            .on('dragend', dragEnd)
         )
       */
    };

    // Mixin 'superclass' methods and variables
    plotMixin(trendline, p, accessor_trendline());

    return trendline;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.trendline').attr({ d: trendlinePath(accessor, x, y) });
}

function trendlinePath(accessor, x, y) {
  return function(d) {
    var path = [];

    path.push('M', x(accessor.sd(d)), y(accessor.sv(d)));
    path.push('L', x(accessor.ed(d)), y(accessor.ev(d)));

    return path.join(' ');
  };
}
