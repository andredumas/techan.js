'use strict';

module.exports = function(d3_functor) {  // Injected dependencies
  return function() {
    var fx = d3_functor(0),
        fy = d3_functor(0),
        width = d3_functor(12),
        height = d3_functor(15),
        orient = d3_functor('up'),
        tail = d3_functor(true);

    function arrow(d, i) {
      var path,
          x = fx(d, i),
          y = fy(d, i),
          w = width(d, i),
          h = height(d, i),
          o = orient(d, i),
          t = tail(d, i),
          neg = o === 'left' || o === 'up' ? 1 : -1,
          ws = w/3,         // Width Segment
          pw = w/2,         // Point width
          ph = t ? h/2 : h; // Point Height

      path = 'M ' + x + ' ' + y;

      switch(o) {
        case 'up':
        case 'down':
          path += ' l ' + -pw + ' ' + neg*ph + ' l ' + ws + ' ' + 0;
          if(t) path += ' l ' + 0 + ' ' + neg*ph;
          path += ' l ' + ws + ' ' + 0;
          if(t) path += ' l ' + 0 + ' ' + -neg*ph;
          path += ' l ' + ws + ' ' + 0;
          break;

        case 'left':
        case 'right':
          path += ' l ' + neg*ph + ' ' + -pw + ' l ' + 0 + ' ' + ws;
          if(t) path += ' l ' + neg*ph + ' ' + 0;
          path += ' l ' + 0 + ' ' + ws;
          if(t) path += ' l ' + -neg*ph + ' ' + 0;
          path += ' l ' + 0 + ' ' + ws;
          break;

        default: throw "Unsupported arrow.orient() = " + orient;
      }

      return path + ' z';
    }

    arrow.x = function(_) {
      if(!arguments.length) return fx;
      fx = d3_functor(_);
      return arrow;
    };

    arrow.y = function(_) {
      if(!arguments.length) return fy;
      fy = d3_functor(_);
      return arrow;
    };

    arrow.height = function(_) {
      if(!arguments.length) return height;
      height = d3_functor(_);
      return arrow;
    };

    arrow.width = function(_) {
      if(!arguments.length) return width;
      width = d3_functor(_);
      return arrow;
    };

    arrow.orient = function(_) {
      if(!arguments.length) return orient;
      orient = d3_functor(_);
      return arrow;
    };

    arrow.tail = function(_) {
      if(!arguments.length) return tail;
      tail = d3_functor(_);
      return arrow;
    };

    return arrow;
  };
};