'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
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
      },
      zero = function(d) { return d.zero; };

  function accessor(d) {
    return accessor.v(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return bind();
  };

  accessor.zero = function(_) {
    if (!arguments.length) return zero;
    zero = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.v = value;
    accessor.z = zero;

    return accessor;
  }

  return bind();
};