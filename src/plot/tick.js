'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_tick, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        tickGenerator,
        lineWidthGenerator;

    function tick(g) {
      var upDownEqual = groupUpDownEqual(g.datum(), p.accessor);
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      plot.appendUpDownEqual(group.selection, p.accessor, ['tick'], upDownEqual);

      tick.refresh(g);
    }

    tick.refresh = function(g) {
      g.selectAll('path.tick').attr('d', tickGenerator).style('stroke-width', lineWidthGenerator);
    };

    function binder() {
      tickGenerator = plot.joinPath(p.accessor, p.xScale, p.yScale, tickPath);
      lineWidthGenerator = plot.lineWidth(p.xScale, 1, 2);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(tick, p).plot(accessor_tick(), binder);

    return tick;
  };
};

function groupUpDownEqual(data, accessor) {
  return data.reduce(function(result, current, index, array) {
    var previous = getPrevious(array, index);
    if (up(accessor, previous, current)) result.up.push(current);
    else if (down(accessor, previous, current)) result.down.push(current);
    else result.equal.push(current);
    return result;
  }, { up: [], down: [], equal: [] });
}

function getPrevious(array, index) {
  if(array && index > 0) {
    return array[index-1];
  }

  return nullTick();
}

function nullTick() {
  return {
    date: null,
    high: null,
    low: null,
    spread: null
  };
}

function up(accessor, previous, current) {
  return accessor.h(previous) < accessor.h(current) && accessor.l(previous) < accessor.l(current);
}

function down(accessor, previous, current) {
  return accessor.h(previous) > accessor.h(current) && accessor.l(previous) > accessor.l(current);
}

function tickPath(accessor, x, y, barWidth) {
  return function(d) {
    var high = y(accessor.h(d)),
        low = y(accessor.l(d)),
        rangeBand = barWidth(x),
        xPoint = x(accessor.d(d)),
        xValue = xPoint - rangeBand/2;

    return [
        'M', xValue, high,
        'l', rangeBand, 0,
        'M', xPoint, high,
        'L', xPoint, low,
        'M', xValue, low,
        'l', rangeBand, 0
      ].join(' ');
  };
}
