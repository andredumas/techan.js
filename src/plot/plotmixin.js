'use strict';

/**
 * Module allows optionally mixing in helper methods to plots such as xScale, yScale, accessor setters
 * and helpers for defining dispatching methods.
 *
 * @param d3_scale_linear
 * @param techan_scale_financetime
 * @returns {Function}
 */
module.exports = function(d3_scale_linear, techan_scale_financetime) {
  return function(source, priv) {
    var plotMixin = {};

    plotMixin.xScale = function() {
      priv.xScale = techan_scale_financetime();

      source.xScale = function(_) {
        if (!arguments.length) return priv.xScale;
        priv.xScale = _;
        return source;
      };

      return plotMixin;
    };

    plotMixin.yScale = function() {
      priv.yScale = d3_scale_linear();

      source.yScale = function(_) {
        if (!arguments.length) return priv.yScale;
        priv.yScale = _;
        return source;
      };

      return plotMixin;
    };

    plotMixin.accessor = function(accessor) {
      priv.accessor = accessor;

      source.accessor = function(_) {
        if (!arguments.length) return priv.accessor;
        priv.accessor = _;
        return source;
      };

      return plotMixin;
    };

    plotMixin.on = function(dispatch) {
      source.on = function(type, listener) {
        dispatch.on(type, listener);
        return source;
      };

      return plotMixin;
    };

    /**
    * Generic mixin used for most plots
    * @returns {plotMixin}
    */
    plotMixin.plot = function(accessor) {
      return plotMixin.xScale().yScale().accessor(accessor);
    };

    return plotMixin;
  };
};