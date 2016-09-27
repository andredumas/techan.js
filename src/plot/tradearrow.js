'use strict';

module.exports = function(d3_select, d3_functor, d3_mouse, d3_dispatch, accessor_trade, plot, plotMixin, svg_arrow) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        dispatch = d3_dispatch('mouseenter', 'mouseout'),
        y = function(d) { return p.yScale(p.accessor.p(d)); },
        svgArrow = svg_arrow().orient(function(d) { return p.accessor.t(d) === 'buy' ? 'up' : 'down'; }),
        arrowGenerator;

    function tradearrow(g) {
      var group = p.dataSelector(g),
          classes = typesToClasses(g.datum());

      plot.appendPathsGroupBy(group.selection, p.accessor, 'tradearrow', classes);
      group.entry.append('path').attr('class', 'highlight').style('pointer-events', 'none'); // Do not want mouse events on the highlight

      group.selection.selectAll('path.tradearrow')
        .on('mouseenter', function(data) {
          var nearest = findNearest(data, d3_mouse(this)[0]);
          // Watch out here, not using generator as this is single element, not grouped
          // Done purely to get this node correctly classed and technically only 1 node can be selected for the moment
          d3_select(this.parentNode).select('path.highlight').datum(nearest.d).attr('d', svgArrow).call(classed, classes);
          dispatch.call('mouseenter', this, nearest.d, nearest.i);
        }).on('mouseout', function(data) {
          d3_select(this.parentNode).selectAll('path.highlight').datum([]).attr('d', null).attr('class', 'highlight');
          var nearest = findNearest(data, d3_mouse(this)[0]);
          dispatch.call('mouseout', this, nearest.d, nearest.i);
        });

      tradearrow.refresh(g);
    }

    tradearrow.refresh = function(g) {
      g.selectAll('path.tradearrow').attr('d', arrowGenerator);
    };

    /**
     * Pass through straight to `techan.svg.arrow`.
     *
     * Since all plotted trades are plotted as grouped `type`s, ensure for every trade `type` input a definition of orient exists.
     * If there is an undefined orient definition for trade type, you will probably get an error.
     *
     * default is "buy" => "up", "sell" => "down"
     *
     * @param _ Either a constant or function that returns the orientation of the rendered arrow. Ensure for every input type
     *          a corresponding `techan.svg.arrow` orient value is returned.
     */
    tradearrow.orient = function(_) {
      if(!arguments.length) return svgArrow.orient();
      svgArrow.orient(_);
      return binder();
    };

    /**
     * Define the way y position of the arrow is determined. Useful if required to show under or over OHLC quotes. Defaults
     * to showing the arrow on the trade price value.
     */
    tradearrow.y = function(_) {
      if(!arguments.length) return y;
      y = d3_functor(_);
      return binder();
    };

    /**
     * Direct access to the underlying arrow
     */
    tradearrow.arrow = function() {
      return svgArrow;
    };

    function binder() {
      svgArrow.x(function(d) { return p.xScale(p.accessor.d(d)); }).y(y);
      arrowGenerator = plot.joinPath(function() { return svgArrow; });
      return tradearrow;
    }

    function findNearest(d, x) {
      // Definitely know we're over a trade, but witch one? Find the nearest...? Should work _most_ of the time
      return d.map(function(d,i) { return { d: d, i: i, x: p.xScale(p.accessor.d(d)) }; }).reduce(function(p, c) {
        return Math.abs(p.x-x) < Math.abs(c.x-x) ? p : c;
      });
    }

    function typesToClasses(data) {
      return data.map(function(d) { return p.accessor.t(d); }).reduce(function(prev, cur) {
        if(prev[cur] === undefined) prev[cur] = function(d) { return cur === p.accessor.t(d); };
        return prev;
      }, {});
    }

    // Mixin 'superclass' methods and variables
    plotMixin(tradearrow, p).plot(accessor_trade(), binder).on(dispatch).dataSelector(plotMixin.dataMapper.array);
    binder();

    return tradearrow;
  };
};

// d3 v4 no longer takes classed(Object), shim to convert Object and add classes to the selection
function classed(selection, classes) {
  Object.keys(classes).forEach(function(clazz) {
    selection.classed(clazz, classes[clazz]);
  });
}