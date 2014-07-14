'use strict';

module.exports = function(d3) {
  var zoomable = require('./zoomable')(),
      util = require('../util')(),
      accessors = require('../accessor')(),
      financetime = require('./financetime')(d3.scale.linear, d3.time, d3.bisect, util.rebindCallback, widen, zoomable);

  return {
    financetime: financetime,

    analysis: {
      supstance: function(data, accessor) {
        return d3.scale.linear();
      },

      trendline: function(data, accessor) {
        return d3.scale.linear();
      }
    },

    plot: {
      time: function(data, accessor) {
        accessor = accessor || accessors.value();
        return financetime().domain(data.map(accessor.d));
      },

      percent: function (scale, reference) {
        var domain = scale.domain();
        reference = reference || domain[0];
        return scale.copy().domain([domain[0], domain[domain.length-1]].map(function(d) { return (d-reference)/reference; }));
      },

      ohlc: function (data, accessor) {
        accessor = accessor || accessors.ohlc();
        return d3.scale.linear()
          .domain([d3.min(data.map(accessor.low())), d3.max(data.map(accessor.high()))].map(widen(0.02)))
          .range([1, 0]);
      },

      volume: function (data, accessor) {
        accessor = accessor || accessors.ohlc().v;
        return d3.scale.linear()
          .domain([0, d3.max(data.map(accessor))*1.15])
          .range([1, 0]);
      },

      rsi: function () {
        return d3.scale.linear().domain([0, 100])
          .range([1, 0]);
      },

      momentum: function(data, accessor) {
        accessor = accessor || accessors.value();
        return pathScale(d3, data, accessor, 0.04);
      },

      moneyflow: function(data, accessor) {
        accessor = accessor || accessors.value();
        return pathScale(d3, data, accessor, 0.04);
      },

      macd: function(data, accessor) {
        accessor = accessor || accessors.macd();
        return pathScale(d3, data, accessor, 0.04);
      },

      movingaverage: function(data, accessor) {
        accessor = accessor || accessors.value();
        return pathScale(d3, data, accessor);
      }
    },

    position: {

    }
  };
};

function pathDomain(d3, data, accessor, widening) {
  return data.length > 0 ? d3.extent(data, accessor).map(widen(widening)) : null;
}

function pathScale(d3, data, accessor, widening) {
  return d3.scale.linear().domain(pathDomain(d3, data, accessor, widening))
    .range([1, 0]);
}

/**
 * Only to be used on an array of 2 elements [min, max]
 * @param padding
 * @param width
 * @returns {Function}
 */
function widen(widening, width) {
  widening = widening || 0;

  return function(d, i, array) {
    if(array.length > 2) throw "array.length > 2 unsupported. array.length = " + array.length;
    width = width || (array[array.length-1] - array[0]);
    return d + (i*2-1)*width*widening;
  };
}