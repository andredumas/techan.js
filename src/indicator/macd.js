'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        fast = 12,
        slow = 26,
        signal = 9;

    function indicator(data) {
      var minFastSlow = Math.max(fast, slow) - 1,
          minCount = minFastSlow + signal - 1,
          signalLine = indicator_ema().accessor(indicator.accessor()).period(signal).init(),
          fastAverage = indicator_ema().accessor(indicator.accessor()).period(fast).init(),
          slowAverage = indicator_ema().accessor(indicator.accessor()).period(slow).init();

      return data.map(function(d, i) {
        slow = fastAverage.average(p.accessor(d));
        fast = slowAverage.average(p.accessor(d));

        var macd = slow - fast,
            signalValue = i >= minFastSlow ? signalLine.average(macd) : null;

        if(i >= minCount) return { date: p.accessor.d(d), macd: macd, signal: signalValue, difference: macd - signalValue, zero: 0 };
        else return { date: p.accessor.d(d), macd: null, signal: null, difference: null, zero: null };

      }).filter(function(d) { return d.macd; });
    }

    indicator.fast = function(_) {
      if (!arguments.length) return fast;
      fast = _;
      return indicator;
    };

    indicator.slow = function(_) {
      if (!arguments.length) return slow;
      slow = _;
      return indicator;
    };

    indicator.signal = function(_) {
      if (!arguments.length) return signal;
      signal = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p, accessor_ohlc());

    return indicator;
  };
};
