'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      macd = function(d) { return d.macd; },
      zero = function(d) { return d.zero; },
      signal = function(d) { return d.signal;},
      difference = function(d) { return d.difference;};

  function accessor(d) {
    return accessor.m(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.macd = function(_) {
    if (!arguments.length) return macd;
    macd = _;
    return bind();
  };

  accessor.signal = function(_) {
    if (!arguments.length) return signal;
    signal = _;
    return bind();
  };

  accessor.difference = function(_) {
    if (!arguments.length) return difference;
    difference = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.m = macd;
    accessor.s = signal;
    accessor.dif = difference;
    accessor.z = zero;

    return accessor;
  }

  return bind();
};