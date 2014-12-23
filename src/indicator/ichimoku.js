'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        tenkanSen = 9,
        kijunSen = 26,
        senkouSpanB = 52;

    function indicator(data) {
      var parameters = { tenkanSen: tenkanSen, kijunSen: kijunSen, senkouSpanB: senkouSpanB },
          result = new Array(data.length);

      // Iterate backwards through the data
      for(var index = result.length-1; index >= 0; index--) {
        result[index] = calculate(parameters, data, index);
      }

      return result;
    }

    function calculate(parameters, data, index) {
      var d = data[index],
          min = p.accessor.l(d),
          max = p.accessor.h(d),
          current = datum(parameters, p.accessor.d(d), p.accessor.c(d));

      // Iterate backwards through the data up to sendouSpanB count to calculate averages
      for(var i = 0, pos = i+1; i < parameters.senkouSpanB && index-i >= 0; i++, pos = i+1) {
        d = data[index-i];
        min = Math.min(min, p.accessor.l(d));
        max = Math.max(max, p.accessor.h(d));

        // Grab a snapshot of average of min and max for each of the parameter periods
        current.tenkanSen = pos === parameters.tenkanSen ? average(min, max) : current.tenkanSen;
        current.kijunSen = pos === parameters.kijunSen ? average(min, max) : current.kijunSen;
        current.senkouSpanB = pos === parameters.senkouSpanB ? average(min, max) : current.senkouSpanB;
      }

      // Initialise if there is enough data
      current.senkouSpanA = senkouSpanA(current.tenkanSen, current.kijunSen);

      return current;
    }

    indicator.tenkanSen = function(_) {
      if (!arguments.length) return tenkanSen;
      tenkanSen = _;
      return indicator;
    };

    indicator.kijunSen = function(_) {
      if (!arguments.length) return kijunSen;
      kijunSen = _;
      return indicator;
    };

    indicator.senkouSpanB = function(_) {
      if (!arguments.length) return senkouSpanB;
      senkouSpanB = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(parameters, date, chikouSpan) {
  return { parameters: parameters, date: date, chikouSpan: chikouSpan, tenkanSen: null, kijunSen: null, senkouSpanA: null, senkouSpanB: null };
}

function senkouSpanA(tenkanSen, kijunSen) {
  return tenkanSen !== null && kijunSen !== null ? average(tenkanSen, kijunSen) : null;
}

function average(v1, v2) {
  return (v1+v2)/2;
}