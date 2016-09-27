'use strict';

module.exports = {
  parse: d3.timeParse("%Y-%m-%d"),
  parseIso8601: d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ"),
  parseZonedIso8601: d3.timeParse("%Y-%m-%dT%H:%M:%S%Z")
};