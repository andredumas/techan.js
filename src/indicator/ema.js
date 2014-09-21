'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, alpha_init) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
      period = 10,
      previous,
      alpha,
      initialTotal,
      initialCount;

    function indicator(data) {
      indicator.init();
      return data.map(ma).filter(function(d) { return d.value; });
    }

    indicator.init = function() {
      previous = null;
      alpha = alpha_init(period);
      initialTotal = 0;
      initialCount = 0;
      return indicator;
    };

    function ma(d, i) {
      var value = indicator.average(p.accessor(d));
      if (i+1 < period) {
        value = null;
      }

      return { date: p.accessor.d(d), value: value };
    }

    indicator.average = function(value) {
      if(initialCount < period) return (initialTotal += value)/++initialCount;
      else {
        if(initialCount === period) {
          previous = initialTotal/initialCount++;
        }

        return (previous = previous + alpha*(value-previous));
      }
    };

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p, accessor_ohlc());

    return indicator;
  };
};