'use strict';

var _d3;

// If running in browser (window !undefined), assume d3 available
if('undefined' != typeof window) _d3 = window.d3;
else if('object' == typeof module) _d3 = require('d3'); // else we're in the only other supported mode: v8/node
else throw "Unsupported runtime environment: Could not find d3. Ensure defined globally on window, or available as dependency.";

module.exports = (function(d3) {
  return {
    version: require('../build/version'),
    accessor: require('./accessor')(),
    indicator: require('./indicator')(d3),
    plot: require('./plot')(d3),
    scale: require('./scale')(d3),
    svg: require('./svg')(d3)
  };
})(_d3);