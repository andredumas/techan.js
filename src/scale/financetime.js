'use strict';

/*
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.
 */
module.exports = function(d3_scale_linear, d3_scale_ordinal) {
  function FinanceTime(linear, ordinal) {
    if(!(this instanceof FinanceTime)) return new FinanceTime(linear, ordinal);

    this.linear = linear || d3_scale_linear();
    this.ordinal = ordinal || d3_scale_ordinal();
  }

  FinanceTime.prototype.invert = function(y) {
    var domain = this.ordinal.domain(),
        index = Math.min(domain.length-1, Math.max(0, this.linear.invert(y)));
    return domain[index];
  };

  FinanceTime.prototype.linear = function() {
    return this.linear;
  };

  FinanceTime.prototype.ordinal = function() {
    return this.ordinal;
  };

  FinanceTime.prototype.domain = function(domain) {
    if(!arguments.length) return this.ordinal.domain();
    this.linear.domain([0, domain.length]);
    this.ordinal.domain(domain);
    return this;
  };

  FinanceTime.prototype.range = function(range) {
    if (!arguments.length) return this.linear.range();
    this.linear.range(range);
    this.ordinal.rangeRoundBands([this.linear(0), this.linear(this.domain().length)], 0.2);
    return this;
  };

  FinanceTime.prototype.copy = function() {
    return new FinanceTime(this.linear.copy(), this.ordinal.copy());
  };

  return FinanceTime;
};