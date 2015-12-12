'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,
        periodD = 3,
        overbought = 80,
        middle = 50,
        oversold = 20;

    function indicator(data) {
      var periodLength = (parseInt(period)+parseInt(periodD));
      return data.map(function(d, i) {
        if(i >= periodLength ){
          var max = [];
          var min = [];
          var stochasticKBuffer = [];
          for (var per = 0; per < periodD; per++) {
            max.push(0);
            min.push(10000);
            stochasticKBuffer.push(0);
          }
          var stochasticD = 0;
          for (var k = 0; k < periodD; k++) {
            for (var j = 0; j < period; j++) {
              if(p.accessor.h(data[i-j-k]) > max[k]){
                max[k] = p.accessor.h(data[i-j-k]);
              }
              if(p.accessor.l(data[i-j-k]) < min[k]){
                min[k] = p.accessor.l(data[i-j-k]);
              }
            }
            var diff = (max[k]-min[k]);
            if(diff > 0) {
                stochasticKBuffer[k] = ((p.accessor.c(data[i - k]) - min[k]) / (max[k] - min[k])) * 100;
            }else{
                stochasticKBuffer[k] = 50;
            }
            stochasticD +=stochasticKBuffer[k];
          }
          var stochasticK =stochasticKBuffer[0];// ((d.close-min)/(max-min))*100;
          stochasticD /= periodD;
          return datum(p.accessor.d(d), stochasticK,stochasticD, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d), null, null, middle,overbought,oversold);
      }).filter(function(d) { return d.stochasticK; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };
    indicator.periodD = function(_) {
      if (!arguments.length) return periodD;
      periodD = _;
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

function datum(date, stochasticK,stochasticD, middle, overbought, oversold) {
  if(stochasticK) return { date: date, stochasticK: stochasticK,stochasticD:stochasticD, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, stochasticK: null,stochasticD:null, middle: middle, overbought: overbought, oversold: oversold };
}
