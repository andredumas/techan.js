'use strict';

module.exports = function() {
  return function(source, priv) {
    var indicatorMixin = {};

    indicatorMixin.period = function(period) {
      priv.period = period;

      source.period = function(_) {
        if (!arguments.length) return priv.period;
        priv.period = +_;
        return source;
      };

      source.preroll = function() { return priv.period; };

      return indicatorMixin;
    };

    indicatorMixin.accessor = function(accessor) {
      priv.accessor = accessor;

      // Mixin the functions to the source
      source.accessor = function (_) {
        if (!arguments.length) return priv.accessor;
        priv.accessor = _;
        return source;
      };

      return indicatorMixin;
    };

    indicatorMixin.preroll = function(pr) {
      source.preroll = pr;
      return indicatorMixin;
    };

    source.preroll = function() {
      return 0;
    };

    return indicatorMixin;
  };
};