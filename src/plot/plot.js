'use strict';

module.exports = function() {
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
    }
  };
};