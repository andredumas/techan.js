'use strict';

module.exports = function() {
  return {
    dataSelection: function(selection, data, accessor_date) {
      var dataSelection = selection.selectAll('g.data').data(data, function(d) { return accessor_date(d); });
      dataSelection.exit().remove();
      return dataSelection;
    },
    dataEntry: function(dataSelection) {
      return dataSelection.enter().append('g').attr({ class: 'data' });
    },
    classedUpDown: function(accessor) {
      return {
        up: function(d) { return accessor.open(d) < accessor.close(d); },
        down: function(d) { return accessor.open(d) > accessor.close(d); }
      };
    }
  };
};