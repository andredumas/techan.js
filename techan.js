/*
 TechanJS v0.1.0
 (c) 2014 - 2014 Andre Dumas | https://github.com/andredumas/techan.js
*/
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.techan=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

// TODO Could these be singletons? Generally will be accessing the same data and data structures at the same time
module.exports = function() {
  return {
    ohlc: _dereq_('./ohlc'),
    volume: _dereq_('./volume'),
    macd: _dereq_('./macd'),
    rsi: _dereq_('./rsi')
  };
};
},{"./macd":2,"./ohlc":3,"./rsi":4,"./volume":5}],2:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      macd = function(d) { return d.macd; },
      zero = function(d) { return 0; },
      signal = function(d) { return d.signal;},
      difference = function(d) { return d.difference;};

  function accessor(d) {
    return accessor.m(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.macd = function(_) {
    if (!arguments.length) return macd;
    macd = _;
    return bind();
  };

  accessor.signal = function(_) {
    if (!arguments.length) return signal;
    signal = _;
    return bind();
  };

  accessor.difference = function(_) {
    if (!arguments.length) return difference;
    difference = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.m = macd;
    accessor.s = signal;
    accessor.dif = difference;
    accessor.z = zero;

    return accessor;
  }

  return bind();
};
},{}],3:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      open = function(d) { return d.open; },
      high = function(d) { return d.high; },
      low = function(d) { return d.low; },
      close = function(d) { return d.close;},
      volume = function(d) { return d.volume; };

  function accessor(d) {
    return accessor.c(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.open = function(_) {
    if (!arguments.length) return open;
    open = _;
    return bind();
  };

  accessor.high = function(_) {
    if (!arguments.length) return high;
    high = _;
    return bind();
  };

  accessor.low = function(_) {
    if (!arguments.length) return low;
    low = _;
    return bind();
  };

  accessor.close = function(_) {
    if (!arguments.length) return close;
    close = _;
    return bind();
  };

  accessor.volume = function(_) {
    if (!arguments.length) return volume;
    volume = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.o = open;
    accessor.h = high;
    accessor.l = low;
    accessor.c = close;
    accessor.v = volume;

    return accessor;
  }

  return bind();
};
},{}],4:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      rsi = function(d) { return d.rsi; },
      overbought = function(d) { return 70; },
      oversold = function(d) { return 30; },
      middle = function(d) { return 50; };

  function accessor(d) {
    return accessor.r(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.rsi = function(_) {
    if (!arguments.length) return rsi;
    rsi = _;
    return bind();
  };

  accessor.overbought = function(_) {
    if (!arguments.length) return overbought;
    overbought = _;
    return bind();
  };

  accessor.oversold = function(_) {
    if (!arguments.length) return oversold;
    oversold = _;
    return bind();
  };

  accessor.middle = function(_) {
    if (!arguments.length) return middle;
    middle = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.r = rsi;
    accessor.ob = overbought;
    accessor.os = oversold;
    accessor.m = middle;

    return accessor;
  }

  return bind();
};
},{}],5:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      volume = function(d) { return d.volume; };

  function accessor(d) {
    return accessor.v(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.volume = function(_) {
    if (!arguments.length) return volume;
    volume = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.v = volume;

    return accessor;
  }

  return bind();
};
},{}],6:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  return {
    supstance: _dereq_('./supstance')(d3.scale.linear)
  };
};
},{"./supstance":7}],7:[function(_dereq_,module,exports){
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
},{}],8:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_ohlc, plot) {  // Injected dependencies
  return function() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_ohlc();

    function candlestickPlot(g, data) {
      var group = plot.groupSelect(g, data, accessor.date()),
          volumeOpacityScale = d3_scale_linear().domain(d3_extent(data.map(accessor.v))).range([0.2, 1]);

      function volumeOpacity(d) {
        return volumeOpacityScale(accessor.v(d));
      }

      // Two path's as wick and body can be styled slightly differently (stroke and fills)
      group.entry.append('path').attr({ class: 'candle body' }).classed(plot.classedUpDown(accessor));
      group.entry.append('path').attr({ class: 'candle wick' }).classed(plot.classedUpDown(accessor));
      group.selection.selectAll('path').style('opacity', volumeOpacity);

      candlestickPlot.refresh(g);
    }

    candlestickPlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale);
    };

    candlestickPlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return candlestickPlot;
    };

    candlestickPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return candlestickPlot;
    };

    candlestickPlot.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return candlestickPlot;
    };

    return candlestickPlot;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.candle.body').attr({ d: candleBodyPath(accessor, x, y) });
  g.selectAll('path.candle.wick').attr({ d: candleWickPath(accessor, x, y) });
}

function candleBodyPath(accessor, x, y) {
  return function(d) {
    var path = [],
        xValue = x(accessor.d(d)),
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.rangeBand();

    path.push('M', xValue, open);
    path.push('l', rangeBand, 0);

    // Draw body only if there is a body (there is no stroke, so will not appear anyway)
    if(open != close) {
      path.push('L', xValue + rangeBand, close);
      path.push('l', -rangeBand, 0);
      path.push('L', xValue, open);
    }

    return path.join(' ');
  };
}

function candleWickPath(accessor, x, y) {
  return function(d) {
    var path = [],
        xValue = x(accessor.d(d)),
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.rangeBand(),
        xPoint = xValue + rangeBand/2;

    // Top
    path.push('M', xPoint, y(accessor.h(d)));
    path.push('L', xPoint, Math.min(open, close));

    // Draw another cross wick if there is no body
    if(open == close) {
      path.push('M', xValue, open);
      path.push('l', rangeBand, 0);
    }
    // Bottom
    path.push('M', xPoint, Math.max(open, close));
    path.push('L', xPoint, y(accessor.l(d)));

    return path.join(' ');
  };
}
},{}],9:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  var scale = _dereq_('../scale')(d3),
      accessor = _dereq_('../accessor')(),
      plot = _dereq_('./plot')(d3);

  return {
    candlestick: _dereq_('./candlestick')(d3.scale.linear, d3.extent, scale.financetime, accessor.ohlc, plot),
    volume: _dereq_('./volume')(d3.scale.linear, d3.extent, scale.financetime, accessor.volume, plot),
    rsi: _dereq_('./rsi')(d3.scale.linear, d3.extent, scale.financetime, accessor.rsi, plot),
    macd: _dereq_('./macd')(d3.scale.linear, d3.extent, scale.financetime, accessor.macd, plot)
  };
};
},{"../accessor":1,"../scale":14,"./candlestick":8,"./macd":10,"./plot":11,"./rsi":12,"./volume":13}],10:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_macd, plot) {  // Injected dependencies
  function macd() { // Closure function
    var xScale = techan_scale_financetime(),
      yScale = d3_scale_linear(),
      accessor = accessor_macd();

    function macdPlot(g, data) {
      var group = plot.groupSelect(g, [data], accessor.date());

      var histogramSelection = group.selection
        .append('g').attr({ class: 'difference' })
        .selectAll('g.difference').data(function(data) { return data; });

      histogramSelection.append('path').attr({ class: 'difference' });

      group.selection.append('path').attr({ class: 'zero' });
      group.selection.append('path').attr({ class: 'macd' });
      group.selection.append('path').attr({ class: 'signal' });

      macdPlot.refresh(g);
    }

    macdPlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale, plot);
    };

    macdPlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return macdPlot;
    };

    macdPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return macdPlot;
    };

    macdPlot.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return macdPlot;
    };

    return macdPlot;
  }

  return macd;
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.difference').attr({ d: differencePath(accessor, x, y) });
  g.selectAll('path.zero').attr({ d: plot.horizontalPathLine(x, accessor.z, y) });
  g.selectAll('path.macd').attr({ d: plot.pathLine(accessor.d, x, accessor.m, y) });
  g.selectAll('path.signal').attr({ d: plot.pathLine(accessor.d, x, accessor.s, y) });
}

function differencePath(accessor, x, y) {
  return function(d) {
    var path = [],
        xValue = x(accessor.d(d)),
        zero = y(0),
        height = y(accessor.dif(d)) - zero,
        rangeBand = x.rangeBand();

    path.push('M', xValue, zero);
    path.push('l', 0, height);
    path.push('l', rangeBand, 0);
    path.push('l', 0, -height);

    return path.join(' ');
  };
}
},{}],11:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  function dataSelection(g, data, accessor_date) {
    var selection = g.selectAll('g.data').data(data, accessor_date);
    selection.exit().remove();
    return selection;
  }

  function dataEntry(dataSelection) {
    return dataSelection.enter().append('g').attr({ class: 'data' });
  }

  return {
    dataSelection: dataSelection,
    dataEntry: dataEntry,
    groupSelect: function(g, data, accessor_date) {
      var selection = dataSelection(g, data, accessor_date),
          entry = dataEntry(selection);
      return {
        selection: selection,
        entry: entry
      };
    },
    classedUpDown: function(accessor) {
      return {
        up: function(d) { return accessor.o(d) < accessor.c(d); },
        down: function(d) { return accessor.o(d) > accessor.c(d); }
      };
    },
    horizontalPathLine: function(x, accessor_value, y) {
      return function(d) {
        var path = [],
            rangeExtent = x.rangeExtent();

        path.push('M', rangeExtent[0], y(accessor_value(d)));
        path.push('l', rangeExtent[1]-rangeExtent[1], 0);

        return path.join(' ');
      };
    },
    pathLine: function(accessor_date, x, accessor_value, y) {
      return d3.svg.line().interpolate('monotone')
        .x(function(d) { return x(accessor_date(d)); } )
        .y(function(d) { return y(accessor_value(d)); } );
    }
  };
};
},{}],12:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_rsi, plot) {  // Injected dependencies
  function rsi() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_rsi();

    function rsiPlot(g, data) {
      var group = plot.groupSelect(g, [data], accessor.date());

      group.entry.append('path').attr({ class: 'overbought' });
      group.entry.append('path').attr({ class: 'middle' });
      group.entry.append('path').attr({ class: 'oversold' });
      group.entry.append('path').attr({ class: 'rsi' });

      rsiPlot.refresh(g);
    }

    rsiPlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale, plot);
    };

    rsiPlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return rsiPlot;
    };

    rsiPlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return rsiPlot;
    };

    rsiPlot.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return rsiPlot;
    };

    return rsiPlot;
  }

  return rsi;
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.overbought').attr({ d: plot.horizontalPathLine(x, accessor.ob, y) });
  g.selectAll('path.middle').attr({ d: plot.horizontalPathLine(x, accessor.m, y) });
  g.selectAll('path.oversold').attr({ d: plot.horizontalPathLine(x, accessor.os, y) });
  g.selectAll('path.rsi').attr({ d: plot.pathLine(accessor.d, x, accessor.r, y) });
}
},{}],13:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, techan_scale_financetime, accessor_volume, plot) {  // Injected dependencies
  function volume() { // Closure function
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear(),
        accessor = accessor_volume();

    function volumePlot(g, data) {
      var volume = plot.groupSelect(g, data, accessor.date())
        .entry.append('path')
          .attr({ class: 'volume' });

        if(accessor.o && accessor.c) {
          volume.classed(plot.classedUpDown(accessor));
        }

      volumePlot.refresh(g);
    }

    volumePlot.refresh = function(g) {
      refresh(g, accessor, xScale, yScale);
    };

    volumePlot.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return volumePlot;
    };

    volumePlot.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return volumePlot;
    };

    volumePlot.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return volumePlot;
    };

    return volumePlot;
  }

  return volume;
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.volume').attr({ d: volumePath(accessor, x, y) });
}

function volumePath(accessor, x, y) {
  return function(d) {
    var path = [],
        xValue = x(accessor.d(d)),
        zero = y(0),
        height = y(accessor.v(d)) - zero,
        rangeBand = x.rangeBand();

    path.push('M', xValue, zero);
    path.push('l', 0, height);
    path.push('l', rangeBand, 0);
    path.push('l', 0, -height);

    return path.join(' ');
  };
}
},{}],14:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  return {
    // Temporarily disabled until the scale implementation is fixed
    //financetime: require('./financetime')(d3.scale.linear, d3.scale.ordinal, d3.rebind),
    financetime: function() {
      var ordinal = d3.scale.ordinal();
      var originalRange = ordinal.range;
      ordinal.range = function(range) {
        if(!arguments.length) return originalRange();
        return ordinal.rangeRoundBands(range, 0.2);
      };
      return ordinal;
    },
    analysis: {
      supstance: function(accessor, data) {
        return d3.scale.linear();
      },
      trendline: function(accessor, data) {
        return d3.scale.linear();
      }
    },
    plot: {
      percent: function (scale, reference) {
        var domain = scale.domain();
        return scale.copy().domain([((domain[0] - reference) / reference), ((domain[1] - reference) / reference)]);
      },
      ohlc: function (accessor, data) {
        return d3.scale.linear()
          .domain([d3.min(data.map(accessor.low())) * 0.98, d3.max(data.map(accessor.high())) * 1.03])
          .range([1, 0]);
      },
      volume: function (accessor, data) {
        return d3.scale.linear()
          .domain([0, d3.max(data.map(accessor)) * 1.15])
          .range([1, 0]);
      },
      rsi: function (accessor, data) {
        return d3.scale.linear().domain([0, 100])
          .range([1, 0]);
      },
      path: function(accessor, data) {
        return pathScale(d3, accessor, data);
      },
      momentum: function(accessor, data) {
        return pathScale(d3, accessor, data);
      },
      moneyflow: function(accessor, data) {
        return pathScale(d3, accessor, data);
      },
      macd: function(accessor, data) {
        return pathScale(d3, accessor, data);
      }
    },
    position: {

    }
  };
};

function pathDomain(d3, accessor, data) {
  return data.length > 0 ? d3.extent(data, accessor) : null;
}

function pathScale(d3, accessor, data) {
  return d3.scale.linear().domain(pathDomain(d3, accessor, data))
    .range([1, 0]);
}
},{}],15:[function(_dereq_,module,exports){
'use strict';

module.exports = (function(d3) {
  return {
    version: '0.1.0', // TODO Dynamically populate/tokenize
    accessor: _dereq_('./accessor')(),
    analysis: _dereq_('./analysis')(d3),
    plot: _dereq_('./plot')(d3),
    scale: _dereq_('./scale')(d3)
  };
})(d3);
},{"./accessor":1,"./analysis":6,"./plot":9,"./scale":14}]},{},[15])
(15)
});