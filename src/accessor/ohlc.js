'use strict';

module.exports = function() {
  var date, open, high, low, close, volume;

  function accessor(d) {
    return close(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return accessor;
  };

  accessor.open = function(_) {
    if (!arguments.length) return open;
    open = _;
    return accessor;
  };

  accessor.high = function(_) {
    if (!arguments.length) return high;
    high = _;
    return accessor;
  };

  accessor.low = function(_) {
    if (!arguments.length) return low;
    low = _;
    return accessor;
  };

  accessor.close = function(_) {
    if (!arguments.length) return close;
    close = _;
    return accessor;
  };

  accessor.volume = function(_) {
    if (!arguments.length) return volume;
    volume = _;
    return accessor;
  };

  return accessor;
};