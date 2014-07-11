'use strict';

/*
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.
 */
module.exports = function(d3_scale_linear, d3_time, d3_bisect, zoomable, techan_util_rebindCallback) {  // Injected dependencies
  function financetime(index, domain) {
    var dateIndexMap = {},
        tickState = { tickFormat: dailyTickMethod[dailyTickMethod.length-1][2] },
        band = 3;

    index = index || d3_scale_linear();
    domain = domain || [new Date(0), new Date(1)];

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
     * As the underlying structure relies on a full array, ensure the full domain is passed here,
     * not just min and max values.
     *
     * @param _ The full domain array
     * @returns {*}
     */
    scale.domain = function(_) {
      if (!arguments.length) {
        var visible = index.domain();
        visible = [
          Math.ceil(visible[0]), // If min is fraction, it is partially out of view, round up (ceil)
          Math.floor(visible[visible.length-1]) // If max is fraction, is partially out of view, round down (floor)
        ];
        return domain.slice(visible[0], visible[visible.length-1]+1); // Grab visible domain, inclusive
      }

      domain = _;
      domainMap();
      index.domain([0, domain.length-1]);
      zoomed();
      // Adjust the outer edges by pulling the domain in to ensure start and end bands are fully visible
      index.domain(index.range().map(function(d, i) { return d + (i*2-1)*band*0.65; }).map(index.invert));
      return zoomed();
    };

    function zoomed() {
      band = rangeBand(index, domain);
      return scale;
    }

    function domainMap() {
      dateIndexMap = {};
      domain.forEach(function(d, i) { dateIndexMap[d] = i; });
    }

    scale.copy = function() {
      return financetime(index.copy(), domain);
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
      return band;
    };

    scale.zoomable = function() {
      return zoomable(index, zoomed);
    };

    /*
     * Ticks based heavily on d3 implementation. Attempted to implement this using composition with d3.time.scale,
     * but in the end there were sufficient differences to 'roll my own'.
     * - Different base tick steps: millis not required (yet!)
     * - State based tick formatting given the non continuous, even steps of ticks
     * - Supporting daily and intraday continuous (no gaps) plotting
     * https://github.com/mbostock/d3/blob/e03b6454294e1c0bbe3125f787df56c468658d4e/src/time/scale.js#L67
     */
    /**
     * Generates ticks as continuous as possible against the underlying domain. Where continuous time ticks
     * fall on where there is no matching domain (such as weekend or holiday day), it will be replaced with
     * the nearest domain datum ahead of the tick to keep close to continuous.
     * @param interval
     * @param steps
     * @returns {*}
     */
    scale.ticks = function(interval, steps) {
      var visibleDomain = scale.domain();

      if(!visibleDomain.length) return []; // Nothing is visible, no ticks to show

      var method = interval === undefined ? tickMethod(visibleDomain, 10) :
                    typeof interval === 'number' ? tickMethod(visibleDomain, interval) : null;

      tickState.tickFormat = method ? method[2] : tickMethod(visibleDomain, 10)[2];

      if(method) {
        interval = method[0];
        steps = method[1];
      }

      var intervalRange = interval.range(visibleDomain[0], +visibleDomain[visibleDomain.length-1]+1, steps);

      return intervalRange                  // Interval, possibly contains values not in domain
        .map(domainTicks(visibleDomain))    // Line up interval ticks with domain, possibly adding duplicates
        .reduce(sequentialDuplicates, []);  // Filter out duplicates, produce new 'reduced' array
    };

    /**
     * NOTE: The type of tick format returned is dependant on ticks that were generated. To obtain the correct
     * format for ticks, ensure ticks function is called first, otherwise a default tickFormat will be returned
     * which may not be the optimal representation of the current domain state.
     * @returns {Function}
     */
    scale.tickFormat = function() {
      return function(date) {
        return tickState.tickFormat(date);
      };
    };

    techan_util_rebindCallback(scale, index, zoomed, 'range', 'interpolate', 'clamp', 'nice');

    domainMap();
    return zoomed();
  }

  function rangeBand(linear, domain) {
    return (Math.abs(linear(domain.length-1) - linear(0))/Math.max(1, domain.length-1))*0.8;
  }

  var dayFormat = d3_time.format('%b %e'),
      yearFormat = d3_time.format.multi([
    ['%b %Y', function(d) { return d.getMonth(); }],
    ['%Y', function() { return true; }]
  ]);

  var dailyTickSteps = [
    864e5,  // 1-day
    6048e5, // 1-week
    2592e6, // 1-month
    7776e6, // 3-month
    31536e6 // 1-year
  ];

  var dailyTickMethod = [
    [d3_time.day, 1, dayFormat],
    [d3_time.monday, 1, dayFormat],
    [d3_time.month, 1, yearFormat],
    [d3_time.month, 3, yearFormat],
    [d3_time.year, 1, yearFormat]
  ];

  var intraDayTickSteps = [
    36e5,   // 1-hour
    108e5,  // 3-hour
    216e5,  // 6-hour
    432e5,  // 12-hour
    864e5   // 1-day
  ];

  var intraDayTickMethod = [
    [d3_time.hour, 1],
    [d3_time.hour, 3],
    [d3_time.hour, 6],
    [d3_time.hour, 12],
    [d3_time.day, 1]
  ];

  function tickMethod(visibleDomain, count) {
    // TODO Is this daily data or intra day data? This will dictate which 'mode' to select.
    var tickMethods = dailyTickMethod,
        tickSteps = dailyTickSteps;

    var target = (visibleDomain[visibleDomain.length-1] - visibleDomain[0])/count,
        i = d3_bisect(tickSteps, target);
    return i ? tickMethods[target/tickSteps[i-1] < tickSteps[i]/target ? i-1 : i] : tickMethods[i];
  }

  function domainTicks(visibleDomain) {
    var visibleDomainLookup = {}; // Quickly lookup index of the domain
    visibleDomain.forEach(function(d, i) { visibleDomainLookup[d] = i; });

    return function(d) {
      var value = visibleDomainLookup[d];
      if (value !== undefined) return visibleDomain[value];
      return visibleDomain[d3_bisect(visibleDomain, d)];
    };
  }

  function sequentialDuplicates(previous, current) {
    if(previous.length === 0 || previous[previous.length-1] !== current) previous.push(current);
    return previous;
  }

  return financetime;
};