'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      type = function(d) { return d.type; },
      price = function(d) { return d.price; };

  function accessor(d) {
    return accessor.p(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  /**
   * A function which returns a string representing the type of this trade
   * @param _ A constant string or function which takes a data point and returns a string of valid classname format
   */
  accessor.type = function(_) {
    if (!arguments.length) return type;
    type = _;
    return bind();
  };

  accessor.price = function(_) {
    if (!arguments.length) return price;
    price = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.t = type;
    accessor.p = price;

    return accessor;
  }

  return bind();
};