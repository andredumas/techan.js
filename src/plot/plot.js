'use strict';

module.exports = function(d3_svg_line, d3_select) {
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
      return d3_svg_line().interpolate('monotone')
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
          .on('mouseleave', function(d) {
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
    },

    annotation: {
      append: function(selection, accessor, scale, annotations, clazz) {
        var annotationSelection = selection.append('g').attr('class', 'axisannotation ' + clazz)
          .selectAll('g').data(function(supstance) {
            // Transform the data to values for each annotation
            var y = scale(accessor(supstance));

            return annotations.map(function(annotation) {
              var d = {};
              annotation.accessor()(d, annotation.axis().scale().invert(y));
              // Only ever 1 data point per annotation
              return [d];
            });
          }
        );

        annotationSelection.enter().append('g').attr('class', function(d, i) { return i; })
          .each(function(d, i) {
            // Store some meta for lookup later, could use class instance, but this 'should' be more reliable
            this.__annotation__ = i;
            annotations[i](d3_select(this));
          });
      },

      update: function(scale, annotations, value) {
        var y = scale(value);

        return function(d) {
          var annotation = annotations[this.__annotation__];
          // As in append, should only ever be 1 in the array
          annotation.accessor()(d[0], annotation.axis().scale().invert(y));
        };
      },

      refresh: function(annotations) {
        return function() {
          annotations[this.__annotation__].refresh(d3_select(this));
        };
      }
    }
  };
};