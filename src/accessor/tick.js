'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      high = function(d) { return d.high; },
      low = function(d) { return d.low; },
      spread = function(d) { return d.spread; };

  function accessor(d) {
    bind();
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.high = function(_) {
    if (!arguments.length) return high;
    high = _;
    return bind();
  };

  accessor.low = function(_) {
    if (!arguments.length) return low;
    low = _;
    return bind();
  };

  accessor.spread = function(_) {
    if (!arguments.length) return spread;
    spread = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.h = high;
    accessor.l = low;
    accessor.s = spread;

    return accessor;
  }

  return bind();
};