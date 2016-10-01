'use strict';

/**
 * http://www.embedded.com/electronics-blogs/embedded-round-table/4419407/The-ring-buffer
 */
module.exports = function CircularBuffer(size) {
  var samples = [],
      currentIndex = size-1;

  CircularBuffer.push = function(value) {
    currentIndex = ++currentIndex % size;
    if(samples.length < size) samples.push(value);
    else samples[currentIndex] = value;
  };

  CircularBuffer.get = function(index) {
    return samples[(currentIndex+samples.length-index) % samples.length];
  };

  CircularBuffer.head = function() {
    return CircularBuffer.get(0);
  };

  CircularBuffer.last = function() {
    return CircularBuffer.get(samples.length-1);
  };

  CircularBuffer.size = function() {
    return size;
  };

  CircularBuffer.samples = function() {
    return samples;
  };

  CircularBuffer.primed = function() {
    return samples.length === size;
  };

  return CircularBuffer;
};