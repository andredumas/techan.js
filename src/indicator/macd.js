'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        fast = 12,
        slow = 26,
        signal = 9,
        signalLine = indicator_ema(),
        fastAverage = indicator_ema(),
        slowAverage = indicator_ema();

    function indicator(data) {
      var minFastSlow = Math.max(fast, slow) - 1,
          minCount = minFastSlow + signal - 1;

      signalLine.accessor(indicator.accessor()).period(signal).init();
      fastAverage.accessor(indicator.accessor()).period(fast).init();
      slowAverage.accessor(indicator.accessor()).period(slow).init();

      return data.map(function(d, i) {
        var macd = fastAverage.average(p.accessor(d)) - slowAverage.average(p.accessor(d)),
            signalValue = i >= minFastSlow ? signalLine.average(macd) : null;

        if(i >= minCount) return datum(p.accessor.d(d), macd, signalValue, macd - signalValue, 0);
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.macd !== null; });
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
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, macd, signal, difference, zero) {
  if(macd) return { date: date, macd: macd, signal: signal, difference: difference, zero: zero };
  else return { date: date, macd: null, signal: null, difference: null, zero: null };
}
