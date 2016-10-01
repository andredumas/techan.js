'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_sma) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        sdMultiplication = 2,
        sd;

    function indicator(data) {
        var signalLine = indicator_sma().accessor(indicator.accessor()).period(p.period).init();
        var j;
      return data.map(function(d, i) {
        var middleBand = signalLine.average(p.accessor(d));
        if(i >= p.period) {
            var sum = 0;
            for(j = 0;j<p.period;j++){
                sum += (Math.pow(   (p.accessor.c(data[i-j]) - middleBand)  ,2 ) );
            }
            sd = Math.sqrt( sum/p.period );
            var upperBand = middleBand+sdMultiplication*sd,
                lowerBand = middleBand-sdMultiplication*sd;
            return datum(p.accessor.d(d), middleBand, upperBand, lowerBand);
        }
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.middleBand; });
    }

    indicator.sdMultiplication = function(_) {
      if (!arguments.length) return sdMultiplication;
        sdMultiplication = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc()).period(20);

    return indicator;
  };
};

function datum(date, middleBand, upperBand, lowerBand) {

  if(middleBand) return { date: date, middleBand: middleBand, upperBand: upperBand, lowerBand: lowerBand};
  else return { date: date, middleBand: null, upperBand: null, lowerBand: null};
}
