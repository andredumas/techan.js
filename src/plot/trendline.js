'use strict';

module.exports = function(d3_behavior_drag, d3_event, d3_select, accessor_trendline, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function trendline(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity);

      group.entry.append('path').attr({ class: 'trendline' });

      var interaction = group.entry.append('g').attr({ class: 'interaction' }).style({ opacity: 0, fill: 'none' });
      interaction.append('path').attr({ class: 'body' }).style({ 'stroke-width': 5 });
      interaction.append('circle').attr({ class: 'start', r: 4 });
      interaction.append('circle').attr({ class: 'end', r: 4 });

      trendline.refresh(g);
    }

    trendline.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    /*
     Possible Usage:
     d3.select("trendlines")
     .call(trendline.interaction/drag/draggable/notsure())
     .on('dragstart', dragStart)
     .on('drag', drag)
     .on('dragend', dragEnd)
     )
     */
    trendline.drag = function(g) { // What name?
      // TODO Emit events
      g.selectAll('.interaction circle.start')
        .call(dragEnd(d3_behavior_drag, d3_event, d3_select, p.accessor, p.accessor.sd, p.xScale, p.accessor.sv, p.yScale));
      g.selectAll('.interaction circle.end')
        .call(dragEnd(d3_behavior_drag, d3_event, d3_select, p.accessor, p.accessor.ed, p.xScale, p.accessor.ev, p.yScale));
      g.selectAll('.interaction path.body')
        .call(dragBody(d3_behavior_drag, d3_event, d3_select, p.accessor, p.xScale, p.yScale));
    };

    // TODO Add mouseover, mouseout listener support for drag/user update events

    // Mixin 'superclass' methods and variables
    plotMixin(trendline, p, accessor_trendline());

    return trendline;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.trendline').attr({ d: trendlinePath(accessor, x, y) });
  g.selectAll('.interaction path.body').attr({ d: trendlinePath(accessor, x, y) });
  g.selectAll('.interaction circle.start').attr(interactionEnds(accessor.sd, x, accessor.sv, y));
  g.selectAll('.interaction circle.end').attr(interactionEnds(accessor.ed, x, accessor.ev, y));
}

function trendlinePath(accessor, x, y) {
  return function(d) {
    var path = [];

    path.push('M', x(accessor.sd(d)), y(accessor.sv(d)));
    path.push('L', x(accessor.ed(d)), y(accessor.ev(d)));

    return path.join(' ');
  };
}

function interactionEnds(accessor_x, x, accessor_y, y) {
  return {
    cx: function(d) { return x(accessor_x(d)); },
    cy: function(d) { return y(accessor_y(d)); }
  };
}

function dragEnd(d3_behavior_drag, d3_event, d3_select, accessor, accessor_x, x, accessor_y, y) {
  return d3_behavior_drag()
    .origin(function(d) { return { x: x(accessor_x(d)), y: y(accessor_y(d)) }; })
    .on('drag', function(d) {
      var date = x.invert(d3_event().x);
      if(date === null) return;
      accessor_x(d, date);
      accessor_y(d, y.invert(d3_event().y));
      refresh(d3_select(this.parentNode.parentNode), accessor, x, y);
    });
}

function dragBody(d3_behavior_drag, d3_event, d3_select, accessor, x, y) {
  var dragStart = {}; // State information, grabs the start coords of the line
  return d3_behavior_drag()
    .origin(function(d) {
      dragStart.start = { date: x(accessor.sd(d)), value: y(accessor.sv(d)) };
      dragStart.end = { date: x(accessor.ed(d)), value: y(accessor.ev(d)) };
      return { x: 0, y: 0 };
    })
    .on('drag', function(d) {
      var start = x.invert(d3_event().x + dragStart.start.date),
        end = x.invert(d3_event().x + dragStart.end.date);

      if(start === null || end === null) return;

      accessor.sd(d, start);
      accessor.sv(d, y.invert(d3_event().y + dragStart.start.value));
      accessor.ed(d, end);
      accessor.ev(d, y.invert(d3_event().y + dragStart.end.value));
      refresh(d3_select(this.parentNode.parentNode), accessor, x, y);
    });
}