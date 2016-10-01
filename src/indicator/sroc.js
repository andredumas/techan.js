'use strict';

module.exports = function(techan_util_circularbuffer, indicatorMixin, accessor_ohlc, indicator_smoothing, smoothed_period) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        smoothing = indicator_smoothing().period(smoothed_period),
        buffer;

    function indicator(data) {
      indicator.init();
      return data.map(rocDataPoint).filter(function(d) { return d.value !== null; });
    }

    indicator.init = function() {
      smoothing.init();
      buffer = techan_util_circularbuffer(p.period);
      return indicator;
    };

    function rocDataPoint(d, i) {
      var value = indicator.roc(p.accessor(d));
      if (!buffer.primed() || i+1 < smoothing.period()) value = null;

      return { date: p.accessor.d(d), value: value };
    }

    indicator.roc = function(value) {
      buffer.push(smoothing.average(value));
      return (buffer.head() - buffer.last())/buffer.last();
    };

    indicator.ema = function(_) {
      if(!arguments.length) return smoothing;
      smoothing = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(21);

    return indicator;
  };
};