'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      adx = function(d) { return d.adx; },
      plusDi = function(d) { return d.plusDi; },
      minusDi = function(d) { return d.minusDi; };

  function accessor(d) {
    return accessor.r(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.adx = function(_) {
    if (!arguments.length) return adx;
    adx = _;
    return bind();
  };

  accessor.plusDi = function(_) {
    if (!arguments.length) return plusDi;
    plusDi = _;
    return bind();
  };

  accessor.minusDi = function(_) {
    if (!arguments.length) return minusDi;
    minusDi = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.adx = adx;
    accessor.plusDi = plusDi;
    accessor.minusDi = minusDi;

    return accessor;
  }

  return bind();
};
