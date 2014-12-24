'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_sma) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        initialAtr = indicator_sma(),
        previous = null,
        averageTrueRange = 0,
        currentIndex = 0;

    function indicator(data) {
      indicator.init();
      return data.map(function(d, i) {
        var value = indicator.atr(d);
        if(i >= p.period) return datum(p.accessor.d(d), value);
        else return datum(p.accessor.d(d));
      }).filter(function(d) { return d.value !== null; });
    }

    indicator.init = function() {
      initialAtr.accessor(indicator.accessor()).period(p.period).init();
      previous = null;
      averageTrueRange = 0;
      currentIndex = 0;
      return indicator;
    };

    indicator.atr = function(d) {
      var trueRange = previous === null ? p.accessor.h(d)-p.accessor.l(d) :
        Math.max(p.accessor.h(d)-p.accessor.l(d),
          Math.abs(p.accessor.h(d)-p.accessor.c(previous)),
          Math.abs(p.accessor.l(d)-p.accessor.c(previous))
        );

      previous = d;

      // http://en.wikipedia.org/wiki/Average_true_range
      averageTrueRange = currentIndex++ <= p.period ? initialAtr.average(trueRange) : (averageTrueRange*(p.period-1)+trueRange)/p.period;

      return averageTrueRange;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc())
      .period(14);

    return indicator;
  };
};

function datum(date, atr) {
  if(atr) return { date: date, value: atr };
  else return { date: date, value: null };
}