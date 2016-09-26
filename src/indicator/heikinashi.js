'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, min, max) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function indicator(data) {
      var previousHa;

      return data.map(function(d) {
        var ha = {
          date: p.accessor.d(d),
          open: (previousHa === undefined ? p.accessor.o(d) + p.accessor.c(d) : previousHa.open + previousHa.close)/2,
          close: (p.accessor.o(d) + p.accessor.h(d) + p.accessor.l(d) + p.accessor.c(d))/4
        };

        ha.high = max([ha.open, ha.close, p.accessor.h(d)]);
        ha.low = min([ha.open, ha.close, p.accessor.l(d)]);
        if(p.accessor.v !== undefined && p.accessor.v(d) !== undefined) ha.volume = p.accessor.v(d);
        return (previousHa = ha);
      });
    }

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p)
      .accessor(accessor_ohlc());

    return indicator;
  };
};