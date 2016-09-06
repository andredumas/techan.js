'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      up = function(d) { return d.up; },
      down = function(d) { return d.down; };

  function accessor(d) {
    return accessor.up(d);
  }

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
    accessor.d = date;
    accessor.up = up;
    accessor.dn = down;

    return accessor;
  }

  return bind();
};