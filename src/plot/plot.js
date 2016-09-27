'use strict';

module.exports = function(d3_svg_line, d3_svg_area, d3_line_interpolate, d3_select) {
  var DataSelector = function(mapper) {
    var key,
        scope,
        classes = ['data'];

    function dataSelect(g) {
      var selection = dataSelect.select(g).data(mapper, key),
          entry = selection.enter().append('g').attr('class',  arrayJoin(classes, ' '));
      selection.exit().remove();

      return {
        entry: entry,
        selection: entry.merge(selection)
      };
    }

    dataSelect.select = function(g) {
      return g.selectAll('g.' + arrayJoin(classes, '.'));
    };

    /**
     * DataSelector.mapper.unity, DataSelector.mapper.array, or custom data mapper
     * @param _
     * @returns {*}
     */
    dataSelect.mapper = function(_) {
      if(!arguments.length) return mapper;
      mapper = _;
      return dataSelect;
    };

    dataSelect.scope = function(_) {
      if(!arguments.length) return scope;
      scope = _;
      classes = ['data', 'scope-' + scope];
      return dataSelect;
    };

    dataSelect.key= function(_) {
      if(!arguments.length) return key;
      key = _;
      return dataSelect;
    };

    return dataSelect;
  };

  DataSelector.mapper = {
    unity: function(d) { return d; },
    array: function(d) { return [d]; }
  };

  function PathLine() {
    var d3Line = d3_svg_line().curve(d3_line_interpolate);

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
    var d3Area = d3_svg_area().curve(d3_line_interpolate);

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
    g.selectAll('path.' + arrayJoin(plotNames, '.') + '.' + direction).data(function(d) { return [d.filter(data)]; })
      .enter().append('path').attr('class', arrayJoin(plotNames, ' ') + ' ' + direction);
  }

  function barWidth(x) {
    if(x.band !== undefined) return Math.max(x.band(), 1);
    else return 3; // If it's not a finance time, the user should specify the band calculation (or constant) on the plot
  }

  function arrayJoin(array, delimiter) {
    if(!array.length) return;
    var result = array[0];
    for(var i = 1; i < array.length; i++) {
      result += delimiter + array[i];
    }
    return result;
  }


  /**
   * Helper class assists the composition of multiple techan plots. Handles:
   * - Automatic transfer of data down to descendants
   * - Automatic scaling of a value to the child ( value (parent) -> percent conversion for example)
   * - Plots must be of the same type, ie. Axis Annotation, Supstance)
   *
   * @returns {plotComposer} An instance
   * @constructor
   */
  function PlotComposer() {
    var dataSelector = DataSelector(),
        plots = [],
        plotScale = function(plot) { return plot.scale(); },
        scale,
        accessor;

    function plotComposer(g) {
      var group = dataSelector.mapper(function() {
        return plots.map(function() { return []; });
      })(g);

      group.selection.each(function(d, i) {
        plots[i](d3_select(this));
      });

      plotComposer.refresh(g);
    }

    plotComposer.refresh = function(g) {
      dataSelector.select(g).data(function(d) {
          var value = accessor(d);
          if(value === null || value === undefined) return plots.map(function() { return []; });
          var y = scale(value);
          return plots.map(function(plot) {
            var annotationValue = plotScale(plot) === scale ? value : plotScale(plot).invert(y);
            return [ { value: annotationValue} ];
          });
        }).each(function(d, i) {
          plots[i](d3_select(this));
        });
    };

    plotComposer.plots = function(_) {
      if(!arguments.length) return plots;
      plots = _;
      return plotComposer;
    };

    /**
     * The scale of the parent
     * @param _
     * @returns {*}
     */
    plotComposer.scale = function(_) {
      if(!arguments.length) return scale;
      scale = _;
      return plotComposer;
    };

    /**
     * How do get a value from the root datum
     * @param _ A function taking d and returning a value
     * @returns {*}
     */
    plotComposer.accessor = function(_) {
      if(!arguments.length) return accessor;
      accessor = _;
      return plotComposer;
    };

    /**
     * A string id that distinguishes this composed plot from another.
     * @param _
     * @returns {*}
     */
    plotComposer.scope = function(_) {
      if(!arguments.length) return dataSelector.scope();
      dataSelector.scope(_);
      return plotComposer;
    };

    /**
     * A function to obtain the scale of the child plots
     * @param _
     * @returns {*}
     */
    plotComposer.plotScale = function(_) {
      if(!arguments.length) return plotScale;
      plotScale = _;
      return plotComposer;
    };

    return plotComposer;
  }

  return {
    dataSelector: DataSelector,

    appendPathsGroupBy: appendPathsGroupBy,

    appendPathsUpDownEqual: appendPathsUpDownEqual,

    horizontalPathLine: function(accessor_date, x, accessor_value, y) {
      return function(d) {
        if(!d.length) return null;

        var firstDatum = d[0],
            lastDatum = d[d.length-1];

        return 'M ' + x(accessor_date(firstDatum)) + ' ' + y(accessor_value(firstDatum)) +
          ' L ' + x(accessor_date(lastDatum)) + ' ' + y(accessor_value(lastDatum));
      };
    },

    pathLine: PathLine,

    pathArea: PathArea,

    barWidth: barWidth,

    scaledStrokeWidth: function(x, max, div) {
      max = max || 1;
      div = div || 1;

      return function() {
        return Math.min(max, barWidth(x)/div) + 'px';
      };
    },

    /**
     * @param path A path generator constructor function that will construct a function that takes data point and returns a path
     */
    joinPath: function(path) {
      return function(data) {
        return arrayJoin(data.map(path()), ' ');
      };
    },

    interaction: {
      mousedispatch: function(dispatch) {
        return function(selection) {
          return selection.on('mouseenter', function(d) {
            d3_select(this.parentNode).classed('mouseover', true);
            dispatch.call('mouseenter', this, d);
          })
          .on('mouseleave', function(d) {
            var parentElement = d3_select(this.parentNode);
            if(!parentElement.classed('dragging')) {
              parentElement.classed('mouseover', false);
              dispatch.call('mouseout', this, d);
            }
          })
          .on('mousemove', function(d) { dispatch.call('mousemove', this, d); });
        };
      },

      dragStartEndDispatch: function(drag, dispatch) {
        return drag.on('start', function(d) {
          d3_select(this.parentNode.parentNode).classed('dragging', true);
          dispatch.call('dragstart', this, d);
        })
        .on('end', function(d) {
          d3_select(this.parentNode.parentNode).classed('dragging', false);
          dispatch.call('dragend', this, d);
        });
      }
    },

    plotComposer: PlotComposer
  };
};