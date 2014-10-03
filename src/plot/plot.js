'use strict';

module.exports = function(d3, d3_select) {
  function dataSelection(g, dataMapper, accessor_date) {
    var selection = g.selectAll('g.data').data(dataMapper, accessor_date);
    selection.exit().remove();
    return selection;
  }

  function dataEntry(dataSelection) {
    return dataSelection.enter().append('g').attr('class', 'data');
  }

  return {
    dataMapper: {
      unity: function(d) { return d; },
      array: function(d) { return [d]; }
    },

    dataSelection: dataSelection,

    dataEntry: dataEntry,

    groupSelect: function(g, dataMapper, accessor_date) {
      var selection = dataSelection(g, dataMapper, accessor_date),
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

    horizontalPathLine: function(accessor_date, x, accessor_value, y) {
      return function(d) {
        var firstDatum = d[0],
            lastDatum = d[d.length-1];

        return [
            'M', x(accessor_date(firstDatum)), y(accessor_value(firstDatum)),
            'L', x(accessor_date(lastDatum)), y(accessor_value(lastDatum))
          ].join(' ');
      };
    },

    pathLine: function(accessor_date, x, accessor_value, y) {
      return d3.svg.line().interpolate('monotone')
        .x(function(d) { return x(accessor_date(d)); } )
        .y(function(d) { return y(accessor_value(d)); } );
    },

    interaction: {
      mousedispatch: function(dispatch) {
        return function(selection) {
          return selection.on('mouseenter', function(d) {
            d3_select(this.parentNode).classed('mouseover', true);
            dispatch.mouseenter(d);
          })
          .on('mouseout', function(d) {
            var parentElement = d3_select(this.parentNode);
            if(!parentElement.classed('dragging')) {
              parentElement.classed('mouseover', false);
              dispatch.mouseout(d);
            }
          })
          .on('mousemove', function(d) { dispatch.mousemove(d); });
        };
      },

      dragStartEndDispatch: function(drag, dispatch) {
        return drag.on('dragstart', function(d) {
          d3_select(this.parentNode.parentNode).classed('dragging', true);
          dispatch.dragstart(d);
        })
        .on('dragend', function(d) {
          d3_select(this.parentNode.parentNode).classed('dragging', false);
          dispatch.dragend(d);
        });
      }
    }
  };
};