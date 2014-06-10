'use strict';

module.exports = function(d3) {
  return {
    financetime: require('./financetime')(d3.scale.linear, d3.scale.ordinal, d3.rebind),
    analysis: {
      supstance: function(accessor, data) {
        return d3.scale.linear();
      },
      trendline: function(accessor, data) {
        return d3.scale.linear();
      }
    },
    plot: {
      percent: function (scale, reference) {
        var domain = scale.domain();
        return scale.copy().domain([((domain[0] - reference) / reference), ((domain[1] - reference) / reference)]);
      },
      ohlc: function (accessor, data) {
        return d3.scale.linear()
          .domain([d3.min(data.map(accessor.low())) * 0.98, d3.max(data.map(accessor.high())) * 1.03])
          .range([1, 0]);
      },
      volume: function (accessor, data) {
        return d3.scale.linear()
          .domain([0, d3.max(data.map(accessor)) * 1.15])
          .range([1, 0]);
      },
      rsi: function (accessor, data) {
        return d3.scale.linear().domain([0, 100])
          .range([1, 0]);
      },
      path: function(accessor, data) {
        return pathScale(d3, accessor, data);
      },
      momentum: function(accessor, data) {
        return pathScale(d3, accessor, data);
      },
      moneyflow: function(accessor, data) {
        return pathScale(d3, accessor, data);
      },
      macd: function(accessor, data) {
        return pathScale(d3, accessor, data);
      }
    },
    position: {

    }
  };
};

function pathDomain(d3, accessor, data) {
  return data.length > 0 ? d3.extent(data, accessor) : null;
}

function pathScale(d3, accessor, data) {
  return d3.scale.linear().domain(pathDomain(d3, accessor, data))
    .range([1, 0]);
}