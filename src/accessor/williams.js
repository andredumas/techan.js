'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      williams = function(d) { return d.williams; };

  function accessor(d) {
    return accessor.r(d);
  }

  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.williams = function(_) {
    if (!arguments.length) return williams;
    williams = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.w = williams;

    return accessor;
  }

  return bind();
};