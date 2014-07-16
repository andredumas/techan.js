'use strict';

module.exports = (function(d3) {
  return {
    version: require('../build/version'),
    accessor: require('./accessor')(),
    indicator: require('./indicator')(),
    plot: require('./plot')(d3),
    scale: require('./scale')(d3)
  };
})(d3);