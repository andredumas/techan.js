'use strict';

module.exports = function(d3) {
  var zoomable = require('./zoomable')(),
      util = require('../util')(),
      financetime = require('./financetime')(d3.scale.linear, d3.rebind, zoomable, util.rebindCallback);

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
        return financetime().domain(data.map(accessor.d));
      },

      percent: function (scale, reference) {
        var domain = scale.domain();
        return scale.copy().domain([((domain[0] - reference) / reference), ((domain[1] - reference) / reference)]);
      },

      ohlc: function (data, accessor) {
        return d3.scale.linear()
          .domain([d3.min(data.map(accessor.low())) * 0.98, d3.max(data.map(accessor.high())) * 1.03])
          .range([1, 0]);
      },

      volume: function (data, accessor) {
        return d3.scale.linear()
          .domain([0, d3.max(data.map(accessor)) * 1.15])
          .range([1, 0]);
      },

      rsi: function (data, accessor) {
        return d3.scale.linear().domain([0, 100])
          .range([1, 0]);
      },

      path: function(data, accessor) {
        return pathScale(d3, data, accessor);
      },

      momentum: function(data, accessor) {
        return pathScale(d3, data, accessor);
      },

      moneyflow: function(data, accessor) {
        return pathScale(d3, data, accessor);
      },

      macd: function(data, accessor) {
        return pathScale(d3, data, accessor);
      },

      movingaverage: function(data, accessor) {
        return pathScale(d3, data, accessor);
      }
    },

    position: {

    }
  };
};

function pathDomain(d3, data, accessor) {
  return data.length > 0 ? d3.extent(data, accessor) : null;
}

function pathScale(d3, data, accessor) {
  return d3.scale.linear().domain(pathDomain(d3, data, accessor))
    .range([1, 0]);
}