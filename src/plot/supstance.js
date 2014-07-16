'use strict';

/*
 Support and resistance analysis line (supstance)
 */
module.exports = function(d3_scale_linear, techan_scale_financetime, accessor_supstance) {
  function supstance() {
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_supstance();

    function analysis(g) {
    }

    analysis.refresh = function () {
      refresh(yScale);
    };

    analysis.xScale = function (_) {
      if (!arguments.length) return xScale;
      this.xScale = _;
      return analysis;
    };

    analysis.yScale = function (_) {
      if (!arguments.length) return yScale;
      this.yScale = _;
      return analysis;
    };

    return analysis;
  }

  return supstance;
};

function refresh(yScale) {

}