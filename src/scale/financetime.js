'use strict';

/*
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.

 TODO Possibly rename to arraytime
 */
module.exports = function(d3_scale_linear, d3_time_scale, d3_rebind, d3_extent, d3_bisector, zoomable, techan_util_rebindCallback) {  // Injected dependencies
  function financetime(index, time, domain) {
    var dateIndexMap = {},
        rangeBand = 3,
        bisector = d3_bisector(function(d) { return d.getTime(); }).right,
        indexToTime = d3_scale_linear();

    index = index || d3_scale_linear();
    time = time || d3_time_scale();
    domain = domain || [new Date(0), new Date(1)];

    function rescale() {
      index.domain([0, domain.length-1]);
      time.domain([domain[0], domain[domain.length-1]]);
      rangeBand = calculateRangeBand(index, domain);
      var rangeBounds = index.range().map(function(d, i) { return d + (i*2-1)*rangeBand*0.65; });
      index.domain(rangeBounds.map(index.invert));
      time.range(index.range());
      scaleIndexToTime();
      return zoomed();
    }

    function zoomed() {
      rangeBand = calculateRangeBand(index, domain);
      time.domain(index.domain().map(indexToTime));
      return scale;
    }

    function domainToIndexMap() {
      dateIndexMap = {};
      domain.forEach(function(d, i) { dateIndexMap[d] = i; });
    }

    function scaleIndexToTime() {
      indexToTime.domain(index.domain()).range(time.domain().map(function(d) { return d.getTime(); }));
    }

    function scale(x) {
      var value = index(dateIndexMap[x]);
      // FIXME This is done just to get ticks right. Probably not the best way, should probably geneate ticks for the given domain
      if(isNaN(value)) {
        // Is it inside or outside of the domain? If outside, return value (which should be null/undefined/NaN)
        return (x.getTime() < domain[0].getTime() || x.getTime() > domain[domain.length-1].getTime()) ? value :
          index(bisector(domain, x)); // Else, must be inside, approximate the nearest index
      }

      return value;
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
     * As the underlying structure relies on a full array, ensure the full domain is passed here,
     * not just min and max values.
     *
     * @param _ The full domain array
     * @returns {*}
     */
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      domainToIndexMap();
      return rescale();
    };

    scale.copy = function() {
      return financetime(index.copy(), time.copy(), domain);
    };

    /**
     * Equivalent to d3's ordinal.rangeBand(). It could not be named rangeBand as d3 uses the method
     * to determine how axis ticks should be rendered. This scale is a hybrid ordinal and linear scale,
     * such that scale(x) returns y at center of the band as does d3.scale.linear()(x) does, whereas
     * d3.scale.ordinal()(x) returns y at the beginning of the band. When rendering svg axis, d3
     * compensates for this checking if rangeBand is defined and compensates as such.
     * @returns {number}
     */
    scale.band = function() {
      return rangeBand;
    };

    scale.zoomable = function() {
      // Retain a copy of the index here for zooming timescale??
      return zoomable(index, zoomed);
    };

    techan_util_rebindCallback(scale, index, rescale, 'range', 'interpolate', 'clamp', 'nice');
    techan_util_rebindCallback(scale, time, rescale, 'ticks', 'tickFormat');

    // TODO Filter and update ticks, ensure they are in the domain
//    scale.ticks = function() {
//      return [domain[100]];
//    };

    domainToIndexMap(domain);
    scaleIndexToTime();
    return zoomed();
  }

  return financetime;
};

function calculateRangeBand(linear, domain) {
  var band = (Math.abs(linear(domain.length-1) - linear(0))/Math.max(1, domain.length-1));
  return band*0.8;
}