'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      middle = function(d) { return d.middleBand; },
      upper = function(d) { return d.upperBand; },
      lower = function(d) { return d.lowerBand; };

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.middle = function(_) {
    if (!arguments.length) return middle;
    middle = _;
    return bind();
  };

  accessor.upper = function(_) {
    if (!arguments.length) return upper;
    upper = _;
    return bind();
  };

  accessor.lower = function(_) {
    if (!arguments.length) return lower;
    lower = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.middle = middle;
    accessor.upper = upper;
    accessor.lower = lower;

    return accessor;
  }

  return bind();
};