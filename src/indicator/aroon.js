'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,
        overbought = 70,
        middle = 0,
        oversold = 30;

    function indicator(data) {
      return data.map(function(d, i) {
        if(i >= (period-1)){
          var max = 0;
          var maxi = 0;
          var min = 10000;
          var mini = 0;
          for (var j = 0; j < period; j++) {
            if( p.accessor.h(data[i-j]) > max){
              max = p.accessor.h(data[i-j]);
              maxi = j;
            }
            if( p.accessor.l(data[i-j]) < min){
              min = p.accessor.l(data[i-j]);
              mini = j;
            }
          }
          var up = ((period-maxi)/period)*100;
          var down = ((period-mini)/period)*100;
          var oscillator = up - down;
          return datum(p.accessor.d(d), up,down, oscillator, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d));
      }).filter(function(d) { return d.up; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    indicator.overbought = function(_) {
      if (!arguments.length) return overbought;
      overbought = _;
      return indicator;
    };

    indicator.middle = function(_) {
      if (!arguments.length) return middle;
      middle = _;
      return indicator;
    };

    indicator.oversold = function(_) {
      if (!arguments.length) return oversold;
      oversold = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, up,down,oscillator, middle, overbought, oversold) {
  if(up) return { date: date, up: up,down:down,oscillator:oscillator, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, up: null,down:null,oscillator:null, middle: null, overbought: null, oversold: null };
}
