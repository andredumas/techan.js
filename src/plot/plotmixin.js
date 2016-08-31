'use strict';

/**
 * Module allows optionally mixing in helper methods to plots such as xScale, yScale, accessor setters
 * and helpers for defining dispatching methods.
 */
module.exports = function(d3_scale_linear, d3_functor, techan_scale_financetime, plot_dataselector, plot_width) {
  var PlotMixin = function(source, priv) {
    var plotMixin = {};

    /**
     * Where mapper is DataSelector.mapper.unity or DataSelector.mapper.array. For convenience DataSelector is available
     * at PlotMixin.mapper
     *
     * @param mapper
     * @param key
     * @returns {{}}
     */
    plotMixin.dataSelector = function(mapper, key) {
      priv.dataSelector = plot_dataselector(mapper).key(key);
      return plotMixin;
    };

    plotMixin.xScale = function(binder) {
      priv.xScale = techan_scale_financetime();

      source.xScale = function(_) {
        if (!arguments.length) return priv.xScale;
        priv.xScale = _;
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.yScale = function(binder) {
      priv.yScale = d3_scale_linear();

      source.yScale = function(_) {
        if (!arguments.length) return priv.yScale;
        priv.yScale = _;
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.accessor = function(accessor, binder) {
      priv.accessor = accessor;

      source.accessor = function(_) {
        if (!arguments.length) return priv.accessor;
        priv.accessor = _;
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.width = function(binder) {
      priv.width = plot_width;

      source.width = function(_) {
        if (!arguments.length) return priv.width;
        priv.width = d3_functor(_);
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    plotMixin.on = function(dispatch, binder) {
      source.on = function(type, listener) {
        dispatch.on(type, listener);
        if(binder) binder();
        return source;
      };

      return plotMixin;
    };

    /**
    * Generic mixin used for most plots
    * @returns {plotMixin}
    */
    plotMixin.plot = function(accessor, binder) {
      return plotMixin.xScale(binder).yScale(binder).accessor(accessor, binder);
    };

    return plotMixin;
  };

  // Carry the mappers through for convenience
  PlotMixin.dataMapper = plot_dataselector.mapper;

  return PlotMixin;
};