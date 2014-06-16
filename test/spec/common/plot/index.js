function gFixture(data) {
  'use strict';
  var g = d3.select(document.createElement('g'));
  g.data([data]);
  return g;
}
