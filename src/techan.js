'use strict';

module.exports = (function(d3) {
  return {
    version: '0.1.0', // TODO Dynamically populate/tokenize
    analysis: require('./analysis')(d3),
    plot: require('./plot')(d3),
    scale: require('./scale')(d3)
  };
})(d3);