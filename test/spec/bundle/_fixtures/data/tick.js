'use strict';

var date = require('../../_util/date');
var tick = {};

module.exports = tick;

tick.data = [{"provider":"provider","instrument":"AUD_USD","time":"2015-09-18T17:19:30.783Z","bid":0.72219,"ask":0.72235},
{"provider":"provider","instrument":"AUD_USD","time":"2015-09-18T17:21:04.638Z","bid":0.72215,"ask":0.72232},
{"provider":"provider","instrument":"AUD_USD","time":"2015-09-18T17:21:04.744Z","bid":0.72212,"ask":0.72228}]
.map(function(d) {
  return {
    date: date.parseIso8601(d.time),
    high: d.ask,
    low: d.bid,
    spread: d.ask - d.bid
  };
}).sort(function(a, b) {
  return d3.ascending(a.date, b.date);
});
