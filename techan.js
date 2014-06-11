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
    volume: _dereq_('./volume')
  };
};
},{"./ohlc":2,"./volume":3}],2:[function(_dereq_,module,exports){
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
},{}],3:[function(_dereq_,module,exports){
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
},{}],4:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  return {
    supstance: _dereq_('./supstance')(d3.scale.linear)
  };
};
},{"./supstance":5}],5:[function(_dereq_,module,exports){
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
},{}],6:[function(_dereq_,module,exports){
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
},{}],7:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  var scale = _dereq_('../scale')(d3),
      accessor = _dereq_('../accessor')(),
      plot = _dereq_('./plot')();

  return {
    candlestick: _dereq_('./candlestick')(d3.scale.linear, d3.extent, scale.financetime, accessor.ohlc, plot),
    volume: _dereq_('./volume')(d3.scale.linear, d3.extent, scale.financetime, accessor.volume, plot)
  };
};
},{"../accessor":1,"../scale":11,"./candlestick":6,"./plot":8,"./volume":9}],8:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
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
    }
  };
};
},{}],9:[function(_dereq_,module,exports){
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
},{}],10:[function(_dereq_,module,exports){
'use strict';

/*
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.
 */
module.exports = function(d3_scale_linear, d3_scale_ordinal, d3_rebind) {  // Injected dependencies
  function financetime(linear, ordinal) { // Closure function
    linear = linear || d3_scale_linear();
    ordinal = ordinal || d3_scale_ordinal();
    var inverter = d3_scale_linear().clamp(true);

    function scale(x) {
      return ordinal(x);
    }

    scale.invert = function (y) {
      var domain = ordinal.domain(),
          index = Math.min(domain.length-1, Math.max(0, Math.round(inverter.invert(y))));
      return domain[index];
    };

    scale.linear = function () {
      return linear;
    };

    scale.ordinal = function () {
      return ordinal;
    };

    scale.domain = function (domain) {
      if (!arguments.length) return ordinal.domain();
      linear.domain([0, domain.length]);
      inverter.domain(linear.domain());
      ordinal.domain(domain);

      return scale;
    };

    scale.range = function (range) {
      if (!arguments.length) return linear.range();
      linear.range(range);
      ordinal.rangeRoundBands([linear(0), linear(scale.domain().length)], 0.2);
      var ordinalRange = ordinal.range();
      inverter.range([ordinalRange[0], ordinalRange[ordinalRange.length-1]+ordinal.rangeBand()]);

      return scale;
    };

    scale.point = function(x) {
      return scale(x) + scale.rangeBand()/2;
    };

    scale.copy = function () {
      return financetime(linear.copy(), ordinal.copy());
    };

    // TODO D3 rebind "rangeBand"
    return d3_rebind(scale, ordinal, "rangeBand");
  }

  return financetime;
};
},{}],11:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  return {
    financetime: _dereq_('./financetime')(d3.scale.linear, d3.scale.ordinal, d3.rebind),
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
},{"./financetime":10}],12:[function(_dereq_,module,exports){
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
},{"./accessor":1,"./analysis":4,"./plot":7,"./scale":11}]},{},[12])
(12)
});