'use strict';

module.exports = function() {
  var start = function(d) { return d.start; },
      end = function(d) { return d.end; },
    /**
     * Supports getter and setter
     * @param d Underlying data object to get or set the value
     * @param _ If passed turns into a setter. This is the value to set
     * @returns {*}
     */
    value = function(d, _) {
      if(arguments.length < 2) return d.value;
      d.value = _;
      return accessor;
    };

  function accessor(d) {
    return accessor.v(d);
  }

  accessor.start = function(_) {
    if (!arguments.length) return start;
    start = _;
    return bind();
  };

  accessor.end = function(_) {
    if (!arguments.length) return end;
    end = _;
    return bind();
  };

  accessor.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return bind();
  };

  function bind() {
    accessor.s = start;
    accessor.e = end;
    accessor.v = value;

    return accessor;
  }

  return bind();
};