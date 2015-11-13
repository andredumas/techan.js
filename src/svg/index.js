'use strict';

module.exports = function(d3) {
  return {
    arrow: require('./arrow')(d3.functor)
  };
};