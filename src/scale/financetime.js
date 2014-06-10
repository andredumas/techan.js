'use strict';

/*
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.
 */
module.exports = function(d3_scale_linear, d3_scale_ordinal, d3_rebind) {  // Injected dependencies
  function financetime(linear, ordinal) { // Closure function
    linear = linear || d3_scale_linear();
    ordinal = ordinal || d3_scale_ordinal();
    var inverter = d3_scale_linear().clamp(true);

    function scale(x) {
      return ordinal(x);
    }

    scale.invert = function (y) {
      var domain = ordinal.domain(),
          index = Math.min(domain.length-1, Math.max(0, Math.round(inverter.invert(y))));
      return domain[index];
    };

    scale.linear = function () {
      return linear;
    };

    scale.ordinal = function () {
      return ordinal;
    };

    scale.domain = function (domain) {
      if (!arguments.length) return ordinal.domain();
      linear.domain([0, domain.length]);
      inverter.domain(linear.domain());
      ordinal.domain(domain);

      return scale;
    };

    scale.range = function (range) {
      if (!arguments.length) return linear.range();
      linear.range(range);
      ordinal.rangeRoundBands([linear(0), linear(scale.domain().length)], 0.2);
      var ordinalRange = ordinal.range();
      inverter.range([ordinalRange[0], ordinalRange[ordinalRange.length-1]+ordinal.rangeBand()]);

      return scale;
    };

    scale.point = function(x) {
      return scale(x) + scale.rangeBand()/2;
    };

    scale.copy = function () {
      return financetime(linear.copy(), ordinal.copy());
    };

    // TODO D3 rebind "rangeBand"
    return d3_rebind(scale, ordinal, "rangeBand");
  }

  return financetime;
};