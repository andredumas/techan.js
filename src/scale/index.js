'use strict';

module.exports = function(d3) {
  return {
    financetime: require('./financetime')(d3.scale.linear, d3.scale.ordinal)
  };
};