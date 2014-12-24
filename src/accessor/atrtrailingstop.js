'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      up = function(d) { return d.up; },
      down = function(d) { return d.down; };

  function accessor(d) {
    return accessor.up(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.up = function(_) {
    if (!arguments.length) return up;
    up = _;
    return bind();
  };

  accessor.down = function(_) {
    if (!arguments.length) return down;
    down = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.up = up;
    accessor.dn = down;

    return accessor;
  }

  return bind();
};