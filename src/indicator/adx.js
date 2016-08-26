'use strict';

module.exports = function(d3_max, indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 14;

    function indicator(data) {
      var plusDmEma = indicator_ema().accessor(indicator.accessor()).period(period).init(),
          minusDmEma = indicator_ema().accessor(indicator.accessor()).period(period).init(),
          trEma = indicator_ema().accessor(indicator.accessor()).period(period).init(),
          adxEma = indicator_ema().accessor(indicator.accessor()).period(period).init();

      period = parseInt(period);
      return data.map(function(d, i) {
        if(i < 1) return datum(p.accessor.d(d));

            var upMove = p.accessor.h(data[i]) - p.accessor.h(data[i-1]);
            var downMove =   p.accessor.l(data[i-1]) - p.accessor.l(data[i]);
            var plusDM = 0;
            if(upMove > downMove && upMove>0){
                plusDM = upMove;
            }

            var minusDM = 0;
            if(downMove > upMove && downMove > 0){
                minusDM = downMove;
            }

            var TR = d3_max([
                (p.accessor.h(d) - p.accessor.l(d)),
                Math.abs(p.accessor.h(d) - p.accessor.c(data[i-1])),Math.abs(p.accessor.l(d) - p.accessor.c(data[i-1]))
            ]);

            var plusDmAverage = plusDmEma.average(plusDM),
              minusDmAverage = minusDmEma.average(minusDM),
              trEmaAverage = trEma.average(TR);
          if(i>period) {
            var plusDi = 100 * plusDmAverage / trEmaAverage,
              minusDi = 100 * minusDmAverage / trEmaAverage,
              adxValue = 0;

            if(plusDi - minusDi !== 0){
              adxValue = Math.abs( (plusDi - minusDi)/(plusDi + minusDi) );
            }
            var adx = 100 * adxEma.average(adxValue);

            if(i >= period*2) {
                return datum(p.accessor.d(d), adx, plusDi, minusDi);
            }else return datum(p.accessor.d(d));
        }else return datum(p.accessor.d(d));
      }).filter(function(d) { return d.adx; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, adx, plusDi, minusDi) {
  if(plusDi) {
      return { date: date, adx: adx, plusDi: plusDi, minusDi: minusDi };
  }else{
      return { date: date, adx: null, plusDi: null, minusDi: null };
  }
}
