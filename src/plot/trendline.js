'use strict';

module.exports = function(d3_behavior_drag, d3_event, d3_select, d3_dispatch, accessor_trendline, plot, plotMixin) {  // Injected dependencies
  function Trendline() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatch = d3_dispatch('mouseenter', 'mouseout', 'mousemove', 'drag', 'dragstart', 'dragend');

    function trendline(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity),
          trendlineGroup = group.entry.append('g').attr('class', 'trendline');

      trendlineGroup.append('path').attr('class', 'body');
      trendlineGroup.append('circle').attr({ class: 'start', r: 1 });
      trendlineGroup.append('circle').attr({ class: 'end', r: 1 });

      var interaction = group.entry.append('g').attr('class', 'interaction').style({ opacity: 0, fill: 'none' })
        .call(plot.interaction.mousedispatch(dispatch));

      interaction.append('path').attr('class', 'body').style('stroke-width', 16);
      interaction.append('circle').attr({ class: 'start', r: 8 });
      interaction.append('circle').attr({ class: 'end', r: 8 });

      trendline.refresh(g);
    }

    trendline.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    trendline.drag = function(g) {
      g.selectAll('.interaction circle.start')
        .call(dragEnd(dispatch, p.accessor, p.accessor.sd, p.xScale, p.accessor.sv, p.yScale));
      g.selectAll('.interaction circle.end')
        .call(dragEnd(dispatch, p.accessor, p.accessor.ed, p.xScale, p.accessor.ev, p.yScale));
      g.selectAll('.interaction path.body')
        .call(dragBody(dispatch, p.accessor, p.xScale, p.yScale));
    };

    // Mixin 'superclass' methods and variables
    plotMixin(trendline, p)
      .plot(accessor_trendline())
      .on(dispatch);

    return trendline;
  }

  function dragEnd(dispatch, accessor, accessor_x, x, accessor_y, y) {
    var drag = d3_behavior_drag();

    drag.origin(function(d) {
      return { x: x(accessor_x(d)), y: y(accessor_y(d)) };
    })
    .on('drag', function(d) {
      updateEnd(accessor_x, x, d3_event().x, accessor_y, y, d3_event().y, d);
      refresh(d3_select(this.parentNode.parentNode), accessor, x, y);
      dispatch.drag(d);
    });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  function dragBody(dispatch, accessor, x, y) {
    var dragStart = {}, // State information, grabs the start coords of the line
        drag = d3_behavior_drag();

    drag.origin(function(d) {
      dragStart.start = { date: x(accessor.sd(d)), value: y(accessor.sv(d)) };
      dragStart.end = { date: x(accessor.ed(d)), value: y(accessor.ev(d)) };
      return { x: 0, y: 0 };
    })
    .on('drag', function(d) {
      updateEnd(accessor.sd, x, d3_event().x + dragStart.start.date,
        accessor.sv, y, d3_event().y + dragStart.start.value,
        d);
      updateEnd(accessor.ed, x, d3_event().x + dragStart.end.date,
        accessor.ev, y, d3_event().y + dragStart.end.value,
        d);
      refresh(d3_select(this.parentNode.parentNode), accessor, x, y);
      dispatch.drag(d);
    });

    return plot.interaction.dragStartEndDispatch(drag, dispatch);
  }

  function updateEnd(accessor_x, x, xValue, accessor_y, y, yValue, d) {
    var date = x.invert(xValue);
    if(date) accessor_x(d, date);
    accessor_y(d, y.invert(yValue));
  }

  return Trendline;
};

function refresh(g, accessor, x, y) {
  g.selectAll('.trendline path.body').attr('d', trendlinePath(accessor, x, y));
  g.selectAll('.trendline circle.start').attr(trendlineEnd(accessor.sd, x, accessor.sv, y));
  g.selectAll('.trendline circle.end').attr(trendlineEnd(accessor.ed, x, accessor.ev, y));
  g.selectAll('.interaction path.body').attr('d', trendlinePath(accessor, x, y));
  g.selectAll('.interaction circle.start').attr(trendlineEnd(accessor.sd, x, accessor.sv, y));
  g.selectAll('.interaction circle.end').attr(trendlineEnd(accessor.ed, x, accessor.ev, y));
}

function trendlinePath(accessor, x, y) {
  return function(d) {
    var path = [];

    path.push('M', x(accessor.sd(d)), y(accessor.sv(d)));
    path.push('L', x(accessor.ed(d)), y(accessor.ev(d)));

    return path.join(' ');
  };
}

function trendlineEnd(accessor_x, x, accessor_y, y) {
  return {
    cx: function(d) { return x(accessor_x(d)); },
    cy: function(d) { return y(accessor_y(d)); }
  };
}