'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_sma) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,
        sdMultiplication = 2;
    var sd;

    function indicator(data) {
        var signalLine = indicator_sma().accessor(indicator.accessor()).period(period).init();
        var j;
      return data.map(function(d, i) {
        var middleBand = signalLine.average(p.accessor(d));
        if(i >= period) {
            var sum = 0;
            for(j = 0;j<period;j++){
                sum += (Math.pow(   (p.accessor.c(data[i-j]) - middleBand)  ,2 ) );
            }
            sd = Math.sqrt( sum/period );
            var upperBand = middleBand+sdMultiplication*sd,
                lowerBand = middleBand-sdMultiplication*sd;
            return datum(p.accessor.d(d), middleBand, upperBand, lowerBand);
        }
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.middleBand; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    indicator.sdMultiplication = function(_) {
      if (!arguments.length) return sdMultiplication;
        sdMultiplication = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p).accessor(accessor_ohlc());

    return indicator;
  };
};

function datum(date, middleBand, upperBand, lowerBand) {

  if(middleBand) return { date: date, middleBand: middleBand, upperBand: upperBand, lowerBand: lowerBand};
  else return { date: date, middleBand: null, upperBand: null, lowerBand: null};
}
