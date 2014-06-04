'use strict';

module.exports = function(d3) {
  return {
    supstance: require('./supstance')(d3.scale.linear)
  };
};