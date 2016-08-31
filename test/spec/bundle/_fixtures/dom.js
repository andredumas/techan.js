'use strict';

module.exports = (function(d3) {
  return {
    g: function (data) {
      var g = d3.select(document.createElement('g')).attr('class', 'root');
      return data !== undefined ? g.datum(data) : g;
    }
};
})(d3);
