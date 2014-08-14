'use strict';

module.exports = (function(d3) {
  return {
    g: function (data) {
      var g = d3.select(document.createElement('g'));
      if (data) g.datum(data);
      return g;
    }
};
})(d3);
