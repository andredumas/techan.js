'use strict';

module.exports = {
  parse: d3.time.format("%Y-%m-%d").parse,
  parseIso8601: d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse,
  parseZonedIso8601: d3.time.format("%Y-%m-%dT%H:%M:%S%Z").parse
};