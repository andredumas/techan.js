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

  function PathLine() {
    var d3Line = d3_svg_line().interpolate('monotone');

    function line(data) {
      return d3Line(data);
    }

    line.init = function(accessor_date, x, accessor_value, y, offset) {
      return d3Line.defined(function(d) { return accessor_value(d) !== null; })
          .x(function(d) { return x(accessor_date(d), offset === undefined ? offset : offset(d)); } )
          .y(function(d) { return y(accessor_value(d)); } );
    };

    line.d3 = function() {
      return d3Line;
    };

    return line;
  }

  function PathArea() {
    var d3Area = d3.svg.area().interpolate('monotone');

    function area(data) {
      return d3Area(data);
    }

    area.init = function(accessor_date, x, accessor_value, y, yBase) {
      return d3Area.defined(function(d) { return accessor_value(d) !== null;  })
           .x(function(d) { return x(accessor_date(d)); } )
           .y0(function(d) { return y(yBase); } )
           .y1(function(d) { return y(accessor_value(d)); } );
    };

    area.d3 = function() {
      return d3Area;
    };

    return area;
  }

  function upDownEqual(accessor) {
    return {
      up: function(d) { return accessor.o(d) < accessor.c(d); },
      down: function(d) { return accessor.o(d) > accessor.c(d); },
      equal: function(d) { return accessor.o(d) === accessor.c(d); }
    };
  }

  function appendPathsGroupBy(g, accessor, plotName, classes) {
    var plotNames = plotName instanceof Array ? plotName : [plotName];

    classes = classes || upDownEqual(accessor);

    Object.keys(classes).forEach(function(key) {
      appendPlotTypePath(g, classes[key], plotNames, key);
    });
  }

  function appendPathsUpDownEqual(g, accessor, plotName) {
    appendPathsGroupBy(g, accessor, plotName, upDownEqual(accessor));
  }

  function appendPlotTypePath(g, data, plotNames, direction) {
    g.selectAll('path.' + plotNames.join('.') + '.' + direction).data(function(d) { return [d.filter(data)]; })
      .enter().append('path').attr('class', plotNames.join(' ') + ' ' + direction);
  }

  function barWidth(x) {
    if(x.band !== undefined) return Math.max(x.band(), 1);
    else return 3; // If it's not a finance time, the user should specify the band calculation (or constant) on the plot
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

    appendPathsGroupBy: appendPathsGroupBy,

    appendPathsUpDownEqual: appendPathsUpDownEqual,

    horizontalPathLine: function(accessor_date, x, accessor_value, y) {
      return function(d) {
        if(!d.length) return null;

        var firstDatum = d[0],
            lastDatum = d[d.length-1];

        return [
            'M', x(accessor_date(firstDatum)), y(accessor_value(firstDatum)),
            'L', x(accessor_date(lastDatum)), y(accessor_value(lastDatum))
          ].join(' ');
      };
    },

    pathLine: PathLine,

    pathArea: PathArea,

    barWidth: barWidth,

    lineWidth: function(x, max, div) {
      max = max || 1;
      div = div || 1;

      return function() {
        return Math.min(max, barWidth(x)/div);
      };
    },

    /**
     * @param path A path generator constructor function that will construct a function that takes data point and returns a path
     */
    joinPath: function(path) {
      return function(data) {
        return data.map(path()).join(' ');
      };
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
      append: function(selection, annotations, clazz, accessor, scale) {
        // Use this to either scale the data or initialise to null if accessor and scales are not provided
        var argumentLength = arguments.length;

        var annotationSelection = selection.append('g').attr('class', 'axisannotation ' + clazz)
          .selectAll('g').data(function(d) {
            // Transform the data to values for each annotation, only if we have accessor and scale
            var y = argumentLength > 3 ? scale(accessor(d)) : null;

            return annotations.map(function(annotation) {
              var value = argumentLength > 3 ? annotation.axis().scale().invert(y) : null;
              // Only ever 1 data point per annotation
              return [{ value: value }];
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

      update: function(annotations, value) {
        return function(d) {
          var annotation = annotations[this.__annotation__];
          // As in append, should only ever be 1 in the array
          d[0].value = annotation.axis().scale().invert(value);
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
