'use strict';

module.exports = function() {
  var startDate = function(d, _) {
        if(arguments.length < 2) return d.start.date;
        d.start.date = _;
      },
      startValue = function(d, _) {
        if(arguments.length < 2) return d.start.value;
        d.start.value = _;
      },
      endDate = function(d, _) {
        if(arguments.length < 2) return d.end.date;
        d.end.date = _;
      },
      endValue = function(d, _) {
        if(arguments.length < 2) return d.end.value;
        d.end.value = _;
      };

  function accessor(d) {
    return accessor.sv(d);
  }

  accessor.startDate = function(_) {
    if (!arguments.length) return startDate;
    startDate = _;
    return bind();
  };

  accessor.startValue = function(_) {
    if (!arguments.length) return startValue;
    startValue = _;
    return bind();
  };

  accessor.endDate = function(_) {
    if (!arguments.length) return endDate;
    endDate = _;
    return bind();
  };

  accessor.endValue = function(_) {
    if (!arguments.length) return endValue;
    endValue = _;
    return bind();
  };

  function bind() {
    accessor.sd = startDate;
    accessor.sv = startValue;
    accessor.ed = endDate;
    accessor.ev = endValue;

    return accessor;
  }

  return bind();
};