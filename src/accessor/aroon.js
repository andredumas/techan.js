'use strict';

module.exports = function() {

  var date = function(d) { return d.date; },
      up = function(d) { return d.up; },
      down = function(d) { return d.down; },
      oscillator = function(d) { return d.oscillator; },
      overbought = function(d) { return d.overbought; },
      oversold = function(d) { return d.oversold; },
      middle = function(d) { return d.middle; };

  function accessor(d) {
    return accessor.r(d);
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

  accessor.oscillator = function(_) {
    if (!arguments.length) return oscillator;
    oscillator = _;
    return bind();
  };

  accessor.overbought = function(_) {
    if (!arguments.length) return overbought;
    overbought = _;
    return bind();
  };

  accessor.oversold = function(_) {
    if (!arguments.length) return oversold;
    oversold = _;
    return bind();
  };

  accessor.middle = function(_) {
    if (!arguments.length) return middle;
    middle = _;
    return bind();
  };

  function bind() {
    accessor.d = date;
    accessor.up = up;
    accessor.down = down;
    accessor.oscillator = oscillator;
    accessor.ob = overbought;
    accessor.os = oversold;
    accessor.m = middle;

    return accessor;
  }

  return bind();
};