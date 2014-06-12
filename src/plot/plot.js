'use strict';

module.exports = function(d3) {
  function dataSelection(g, data, accessor_date) {
    var selection = g.selectAll('g.data').data(data, accessor_date);
    selection.exit().remove();
    return selection;
  }

  function dataEntry(dataSelection) {
    return dataSelection.enter().append('g').attr({ class: 'data' });
  }

  return {
    dataSelection: dataSelection,
    dataEntry: dataEntry,
    groupSelect: function(g, data, accessor_date) {
      var selection = dataSelection(g, data, accessor_date),
          entry = dataEntry(selection);
      return {
        selection: selection,
        entry: entry
      };
    },
    classedUpDown: function(accessor) {
      return {
        up: function(d) { return accessor.o(d) < accessor.c(d); },
        down: function(d) { return accessor.o(d) > accessor.c(d); }
      };
    },
    horizontalPathLine: function(x, accessor_value, y) {
      return function(d) {
        var path = [],
            rangeExtent = x.rangeExtent();

        path.push('M', rangeExtent[0], y(accessor_value(d)));
        path.push('l', rangeExtent[1]-rangeExtent[1], 0);

        return path.join(' ');
      };
    },
    pathLine: function(accessor_date, x, accessor_value, y) {
      return d3.svg.line().interpolate('monotone')
        .x(function(d) { return x(accessor_date(d)); } )
        .y(function(d) { return y(accessor_value(d)); } );
    }
  };
};