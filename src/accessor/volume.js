'use strict';

module.exports = function() {
  var date, volume;

  function accessor(d) {
    return volume(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return accessor;
  };

  accessor.volume = function(_) {
    if (!arguments.length) return volume;
    volume = _;
    return accessor;
  };

  return accessor;
};