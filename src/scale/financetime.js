'use strict';

/*
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.

 TODO Possibly rename to arraytime
 */
module.exports = function(d3_scale_linear, d3_rebind, zoomable, techan_util_rebindCallback) {  // Injected dependencies
  function financetime(index, domain) {
    var dateIndexMap = {},
        rangeBounds,
        rangeBand = 3;

    index = index || d3_scale_linear();
    domain = domain || [0, 1];
    rangeBounds = index.range();

    function rescale() {
      index.domain([0, domain.length-1]);

      dateIndexMap = {};
      domain.forEach(function(d, i) {
        dateIndexMap[d] = i;
      });

      var range = index.range(),
          rangeBand = calculateRangeBand(index, domain);
      rangeBounds = [range[0]-rangeBand*0.65, range[1]+rangeBand*0.65];
      index.domain([index.invert(rangeBounds[0]), index.invert(rangeBounds[1])]);

      zoomed();

      return scale;
    }

    function zoomed() {
      rangeBand = calculateRangeBand(index, domain);
    }

    function scale(x) {
      return index(dateIndexMap[x]);
    }

    scale.invert = function(y) {
      var i = scale.invertToIndex(y);
      return i === null ? null : domain[i];
    };

    scale.invertToIndex = function(y) {
      var i = Math.round(index.invert(y));
      return domain[i] ? Math.abs(i) : null;
    };

    /**
     * Returns a 2 element array representing the minimum and maximum pixel bounds for this scale.
     * @returns {*}
     */
    scale.rangeBounds = function() {
      return rangeBounds;
    };

    /**
     * As the underlying structure relies on a full array, ensure the full domain is passed here,
     * not just min and max values.
     *
     * @param _ The full domain array
     * @returns {*}
     */
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return rescale();
    };

    scale.copy = function() {
      return financetime(index.copy(), domain);
    };

    scale.rangeBand = function() {
      return rangeBand;
    };

    scale.zoomable = function() {
      return zoomable(index, zoomed);
    };

    // TODO Implement tick support
    scale.ticks = delegateGetOrSetAndChain(scale, index.ticks);
    scale.tickFormat = delegateGetOrSetAndChain(scale, index.tickFormat);

    techan_util_rebindCallback(scale, index, rescale, 'range', 'interpolate', 'clamp', 'nice');

    return rescale();
  }

  return financetime;
};

function delegateGetOrSetAndChain(target, thefunction) {
  return function() {
    if (!arguments.length) return thefunction.apply(this);
    thefunction.apply(this, arguments);
    return target;
  };
}


function calculateRangeBand(linear, domain) {
  var band = (Math.abs(linear(domain.length-1) - linear(0))/Math.max(1, domain.length-1));
  return band*0.8;
}