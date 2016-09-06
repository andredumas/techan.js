'use strict';

module.exports = function(accessor_bollinger, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        upperLine = plot.pathLine(),
        middleLine = plot.pathLine(),
        lowerLine = plot.pathLine();

    function bollinger(g) {
      var group = p.dataSelector(g);
      group.entry.append('path').attr('class', 'upper');
      group.entry.append('path').attr('class', 'middle');
      group.entry.append('path').attr('class', 'lower');
      bollinger.refresh(g);
    }

    bollinger.refresh = function(g) {
      refresh(p.dataSelector.select(g), upperLine, middleLine, lowerLine);
    };

    function binder() {
      upperLine.init(p.accessor.d, p.xScale, p.accessor.upper, p.yScale);
      middleLine.init(p.accessor.d, p.xScale, p.accessor.middle, p.yScale);
      lowerLine.init(p.accessor.d, p.xScale, p.accessor.lower, p.yScale);
    }

    // Mixin 'superclass' methods and variables
    plotMixin(bollinger, p).plot(accessor_bollinger(), binder).dataSelector(plotMixin.dataMapper.array);
    binder();

    return bollinger;
  };
};

function refresh(selection, upperLine, middleLine, lowerLine) {
  selection.select('path.upper').attr('d', upperLine);
  selection.select('path.middle').attr('d', middleLine);
  selection.select('path.lower').attr('d', lowerLine);
}
