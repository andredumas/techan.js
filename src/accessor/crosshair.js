'use strict';

module.exports = function() {
  /**
   * Supports getter and setter. Watch out if used in d3 and the second parameter is an index!!
   * This approach needs further thought.
   * @param d Underlying data object to get or set the value
   * @param _ If passed turns into a setter. This is the value to set
   * @returns {*}
   */
  var x = function(d, _) {
        if(arguments.length < 2) return d.x;
        d.x = _;
        return accessor;
      },
        /**
         * Supports getter and setter. Watch out if used in d3 and the second parameter is an index!!
         * This approach needs further thought.
         * @param d Underlying data object to get or set the value
         * @param _ If passed turns into a setter. This is the value to set
         * @returns {*}
         */
      y = function(d, _) {
        if(arguments.length < 2) return d.y;
        d.y = _;
        return accessor;
      };

  function accessor(d) {
    return accessor.xv(d);
  }

  accessor.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return bind();
  };

  accessor.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return bind();
  };

  function bind() {
    accessor.xv = x;
    accessor.yv = y;

    return accessor;
  }

  return bind();
};