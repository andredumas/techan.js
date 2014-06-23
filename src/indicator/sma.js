'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 10,
        samples,
        currentIndex,
        total;

    function indicator(data) {
      indicator.init();
      return data.map(ma).filter(function(d) { return d.value; });
    }

    indicator.init = function() {
      total = 0;
      samples = [];
      currentIndex = 0;
      return indicator;
    };

    function ma(d, i) {
      var value = indicator.average(p.accessor(d));
      if (i+1 < period) value = null;
      return { date: p.accessor.d(d), value: value };
    }

    indicator.average = function(value) {
      total += value;

      if(samples.length+1 < period) {
        samples.push(value);
        return total/++currentIndex;
      }
      else {
        if(samples.length < period) {
          samples.push(value);
          total += value;
        }

        total -= samples[currentIndex];
        samples[currentIndex] = value;
        if(++currentIndex === period) {
          currentIndex = 0;
        }

        return total/period;
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