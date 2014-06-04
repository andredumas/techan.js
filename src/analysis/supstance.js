'use strict';

/*
 Support and resistance analysis line (substance)
 */
module.exports = function(d3_scale_linear) {
  function Supstance() {
    if(!(this instanceof Supstance)) return new Supstance();
    this.xScale = d3_scale_linear();
    this.yScale = d3_scale_linear();
    this.y = function() { return 0; };
    this.self = this;

    return function(g) {
      // return the function to draw supstance
    };
  }

  function refresh(yScale) {

  }

  Supstance.prototype.refresh = function() {
    refresh(this.yScale);
  };


  Supstance.prototype.xScale = function(_) {
    if(!arguments.length) return this.xScale;
    this.xScale = _;
    return this;
  };

  Supstance.prototype.yScale = function(_) {
    if(!arguments.length) return this.yScale;
    this.yScale = _;
    return this;
  };

  return Supstance;
};