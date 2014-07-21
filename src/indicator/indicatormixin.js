'use strict';

module.exports = function() {
  return function(source, priv, accessor) {
    // Mixin the functions to the source
    source.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return bind();
    };

    // Add in the private, direct access variables
    function bind() {
      priv.accessor = accessor;

      return source;
    }

    bind();
  };
};