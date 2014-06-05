'use strict';

module.exports = function() {
  function CandleStick() {
    if(!(this instanceof CandleStick)) return new CandleStick();
  }

  return CandleStick;
};