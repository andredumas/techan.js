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
    rsi: _dereq_('./rsi'),
    value: _dereq_('./value')
  };
};
},{"./macd":2,"./ohlc":3,"./rsi":4,"./value":5,"./volume":6}],2:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      macd = function(d) { return d.macd; },
      zero = function(d) { return d.zero; },
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
      overbought = function(d) { return d.overbought; },
      oversold = function(d) { return d.oversold; },
      middle = function(d) { return d.middle; };

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
      value = function(d) { return d.value;},
      zero = function(d) { return d.zero; };

  function accessor(d) {
    return accessor.v(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.value = function(_) {
    if (!arguments.length) return value;
    value = _;
    return bind();
  };

  accessor.zero = function(_) {
    if (!arguments.length) return zero;
    zero = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.v = value;
    accessor.z = zero;

    return accessor;
  }

  return bind();
};
},{}],6:[function(_dereq_,module,exports){
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
},{}],7:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  return {
    supstance: _dereq_('./supstance')(d3.scale.linear)
  };
};
},{"./supstance":8}],8:[function(_dereq_,module,exports){
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
},{}],9:[function(_dereq_,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
      period = 10,
      previous,
      alpha,
      initialTotal,
      initialCount;

    function indicator(data) {
      indicator.init();
      return data.map(ma).filter(function(d) { return d.value; });
    }

    indicator.init = function() {
      previous = null;
      alpha = 2/(period+1);
      initialTotal = 0;
      initialCount = 0;
      return indicator;
    };

    function ma(d, i) {
      var value = indicator.average(p.accessor(d));
      if (i+1 < period) {
        value = null;
      }

      return { date: p.accessor.d(d), value: value };
    }

    indicator.average = function(value) {
      if(initialCount < period) return (initialTotal += value)/++initialCount;
      else {
        if(initialCount === period) {
          previous = initialTotal/initialCount++;
        }

        return (previous = previous + alpha*(value-previous));
      }
    };

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p, accessor_ohlc());

    return indicator;
  };
};
},{}],10:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
  var indicatorMixin = _dereq_('./indicatormixin')(),
      accessor = _dereq_('../accessor')(),
      ema = _dereq_('./ema')(indicatorMixin, accessor.ohlc);

  return {
    ema: ema,
    macd: _dereq_('./macd')(indicatorMixin, accessor.ohlc, ema),
    rsi: _dereq_('./rsi')(indicatorMixin, accessor.ohlc, ema),
    sma: _dereq_('./sma')(indicatorMixin, accessor.ohlc)
  };
};
},{"../accessor":1,"./ema":9,"./indicatormixin":11,"./macd":12,"./rsi":13,"./sma":14}],11:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
  function indicatorMixin(source, priv, accessor) {
    // Mixin the functions to the source
    source.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return bind();
    };

    // Add in the private, direct access variables
    function bind() {
      priv.accessor = accessor;

      return source;
    }

    bind();
  }

  return indicatorMixin;
};
},{}],12:[function(_dereq_,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        fast = 12,
        slow = 26,
        signal = 9;

    function indicator(data) {
      var minFastSlow = Math.max(fast, slow) - 1,
          minCount = minFastSlow + signal - 1,
          signalLine = indicator_ema().accessor(indicator.accessor()).period(signal).init(),
          fastAverage = indicator_ema().accessor(indicator.accessor()).period(fast).init(),
          slowAverage = indicator_ema().accessor(indicator.accessor()).period(slow).init();

      return data.map(function(d, i) {
        slow = fastAverage.average(p.accessor(d));
        fast = slowAverage.average(p.accessor(d));

        var macd = slow - fast,
            signalValue = i >= minFastSlow ? signalLine.average(macd) : null;

        if(i >= minCount) return datum(p.accessor.d(d), macd, signalValue, macd - signalValue, 0);
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.macd; });
    }

    indicator.fast = function(_) {
      if (!arguments.length) return fast;
      fast = _;
      return indicator;
    };

    indicator.slow = function(_) {
      if (!arguments.length) return slow;
      slow = _;
      return indicator;
    };

    indicator.signal = function(_) {
      if (!arguments.length) return signal;
      signal = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p, accessor_ohlc());

    return indicator;
  };
};

function datum(date, macd, signal, difference, zero) {
  if(macd) return { date: date, macd: macd, signal: signal, difference: difference, zero: zero };
  else return { date: date, macd: null, signal: null, difference: null, zero: null };
}
},{}],13:[function(_dereq_,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 14,
        overbought = 70,
        middle = 50,
        oversold = 30;

    function indicator(data) {
      var lossAverage = indicator_ema().accessor(indicator.accessor()).period(period).init(),
          gainAverage = indicator_ema().accessor(indicator.accessor()).period(period).init();

      return data.map(function(d, i) {
        if(i < 1) return datum(p.accessor.d(d));

        var difference = p.accessor(d) - p.accessor(data[i-1]),
            averageGain = gainAverage.average(Math.max(difference, 0)),
            averageLoss = Math.abs(lossAverage.average(Math.min(difference, 0)));

        if(i >= period) {
          var rsi = 100 - (100/(1+(averageGain/averageLoss)));
          return datum(p.accessor.d(d), rsi, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.rsi; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    indicator.overbought = function(_) {
      if (!arguments.length) return overbought;
      overbought = _;
      return indicator;
    };

    indicator.middle = function(_) {
      if (!arguments.length) return middle;
      middle = _;
      return indicator;
    };

    indicator.oversold = function(_) {
      if (!arguments.length) return oversold;
      oversold = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p, accessor_ohlc());

    return indicator;
  };
};

function datum(date, rsi, middle, overbought, oversold) {
  if(rsi) return { date: date, rsi: rsi, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, rsi: null, middle: null, overbought: null, oversold: null };
}
},{}],14:[function(_dereq_,module,exports){
'use strict';

module.exports = function(indicatorMixin, accessor_ohlc) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 10,
        samples,
        currentIndex,
        total;

    function indicator(data) {
      indicator.init();
      return data.map(ma).filter(function(d) { return d.value; });
    }

    indicator.init = function() {
      total = 0;
      samples = [];
      currentIndex = 0;
      return indicator;
    };

    function ma(d, i) {
      var value = indicator.average(p.accessor(d));
      if (i+1 < period) value = null;
      return { date: p.accessor.d(d), value: value };
    }

    indicator.average = function(value) {
      total += value;

      if(samples.length+1 < period) {
        samples.push(value);
        return total/++currentIndex;
      }
      else {
        if(samples.length < period) {
          samples.push(value);
          total += value;
        }

        total -= samples[currentIndex];
        samples[currentIndex] = value;
        if(++currentIndex === period) {
          currentIndex = 0;
        }

        return total/period;
      }
    };

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p, accessor_ohlc());

    return indicator;
  };
};
},{}],15:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {},  // Container for private, direct access mixed in variables
        volumeOpacity = false;

    function candlestickPlot(g) {
      var group = plot.groupSelect(g, plot.dataMapper.unity, p.accessor.d);

      // Two path's as wick and body can be styled slightly differently (stroke and fills)
      group.entry.append('path').attr({ class: 'candle body' }).classed(plot.classedUpDown(p.accessor));
      group.entry.append('path').attr({ class: 'candle wick' }).classed(plot.classedUpDown(p.accessor));

      if(volumeOpacity) {
        var volumeOpacityScale = d3_scale_linear()
          .domain(d3_extent(group.selection.data().map(p.accessor.v)))
          .range([0.2, 1]);

        group.selection.selectAll('path').style('opacity', function(d) {
          return volumeOpacityScale(p.accessor.v(d));
        });
      }

      candlestickPlot.refresh(g);
    }

    candlestickPlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    candlestickPlot.volumeOpacity = function(_) {
      if (!arguments.length) return volumeOpacity;
      volumeOpacity = _;
      return candlestickPlot;
    };

    // Mixin 'superclass' methods and variables
    plotMixin(candlestickPlot, p, accessor_ohlc());

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
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.rangeBand(),
        xValue = x(accessor.d(d)) - rangeBand/2;

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
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.rangeBand(),
        xPoint = x(accessor.d(d)),
        xValue = xPoint - rangeBand/2;

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
},{}],16:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  var scale = _dereq_('../scale')(d3),
      accessor = _dereq_('../accessor')(),
      plot = _dereq_('./plot')(d3),
      plotMixin = _dereq_('./plotmixin')(d3.scale.linear, scale.financetime),
      line = _dereq_('./line');

  return {
    candlestick: _dereq_('./candlestick')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    ema: line(accessor.value, plot, plotMixin),
    ohlc: _dereq_('./ohlc')(d3.scale.linear, d3.extent, accessor.ohlc, plot, plotMixin),
    close: line(accessor.ohlc, plot, plotMixin),
    volume: _dereq_('./volume')(accessor.volume, plot, plotMixin),
    rsi: _dereq_('./rsi')(accessor.rsi, plot, plotMixin),
    macd: _dereq_('./macd')(accessor.macd, plot, plotMixin),
    momentum: line(accessor.value, plot, plotMixin, true),
    moneyflow: line(accessor.value, plot, plotMixin, true),
    sma: line(accessor.value, plot, plotMixin)
  };
};
},{"../accessor":1,"../scale":25,"./candlestick":15,"./line":17,"./macd":18,"./ohlc":19,"./plot":20,"./plotmixin":21,"./rsi":22,"./volume":23}],17:[function(_dereq_,module,exports){
'use strict';

module.exports = function(accessor_value, plot, plotMixin, showZero) {  // Injected dependencies
  showZero = showZero || false;

  function line() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function linePlot(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.date());

      group.entry.append('path').attr({ class: 'line' });

      if(showZero) {
        group.selection.append('path').attr({ class: 'zero' });
      }

      linePlot.refresh(g);
    }

    linePlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot, showZero);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(linePlot, p, accessor_value());

    return linePlot;
  }

  return line;
};

function refresh(g, accessor, x, y, plot, showZero) {
  g.selectAll('path.line').attr({ d: plot.pathLine(accessor.d, x, accessor, y) });

  if(showZero) {
    g.selectAll('path.zero').attr({ d: plot.horizontalPathLine(x, accessor.z, y) });
  }
}
},{}],18:[function(_dereq_,module,exports){
'use strict';

module.exports = function(accessor_macd, plot, plotMixin) {  // Injected dependencies
  function macd() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function macdPlot(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      var histogramSelection = group.selection
        .append('g').attr({ class: 'difference' })
        .selectAll('g.difference').data(function(data) { return data; });

      histogramSelection.exit().remove();
      histogramSelection.enter().append('path').attr({ class: 'difference' });

      group.selection.append('path').attr({ class: 'zero' });
      group.selection.append('path').attr({ class: 'macd' });
      group.selection.append('path').attr({ class: 'signal' });

      macdPlot.refresh(g);
    }

    macdPlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(macdPlot, p, accessor_macd());

    return macdPlot;
  }

  return macd;
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.difference').attr({ d: differencePath(accessor, x, y) });
  g.selectAll('path.zero').attr({ d: plot.horizontalPathLine(accessor.d, x, accessor.z, y) });
  g.selectAll('path.macd').attr({ d: plot.pathLine(accessor.d, x, accessor.m, y) });
  g.selectAll('path.signal').attr({ d: plot.pathLine(accessor.d, x, accessor.s, y) });
}

function differencePath(accessor, x, y) {
  return function(d) {
    var path = [],
        zero = y(0),
        height = y(accessor.dif(d)) - zero,
        rangeBand = x.rangeBand(),
        xValue = x(accessor.d(d)) - rangeBand/2;

    path.push('M', xValue, zero);
    path.push('l', 0, height);
    path.push('l', rangeBand, 0);
    path.push('l', 0, -height);

    return path.join(' ');
  };
}
},{}],19:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3_scale_linear, d3_extent, accessor_ohlc, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure constructor
    var p = {};  // Container for private, direct access mixed in variables

    function ohlcPlot(g) {
      plot.groupSelect(g, plot.dataMapper.unity, p.accessor.d)
        .entry.append('path').attr({ class: 'ohlc' }).classed(plot.classedUpDown(p.accessor));

      ohlcPlot.refresh(g);
    }

    ohlcPlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(ohlcPlot, p, accessor_ohlc());

    return ohlcPlot;
  };
};

function refresh(g, accessor, x, y) {
  g.selectAll('path.ohlc').attr({ d: ohlcPath(accessor, x, y) });
}

function ohlcPath(accessor, x, y) {
  return function(d) {
    var path = [],
        open = y(accessor.o(d)),
        close = y(accessor.c(d)),
        rangeBand = x.rangeBand(),
        xPoint = x(accessor.d(d)),
        xValue = xPoint - rangeBand/2;

    path.push('M', xValue, open);
    path.push('l', rangeBand/2, 0);

    path.push('M', xPoint, y(accessor.h(d)));
    path.push('L', xPoint, y(accessor.l(d)));

    path.push('M', xPoint, close);
    path.push('l', rangeBand/2, 0);

    return path.join(' ');
  };
}
},{}],20:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  function dataSelection(g, dataMapper, accessor_date) {
    var selection = g.selectAll('g.data').data(dataMapper, accessor_date);
    selection.exit().remove();
    return selection;
  }

  function dataEntry(dataSelection) {
    return dataSelection.enter().append('g').attr({ class: 'data' });
  }

  return {
    dataMapper: {
      unity: function(d) { return d; },
      array: function(d) { return [d]; }
    },

    dataSelection: dataSelection,

    dataEntry: dataEntry,

    groupSelect: function(g, dataMapper, accessor_date) {
      var selection = dataSelection(g, dataMapper, accessor_date),
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

    horizontalPathLine: function(accessor_date, x, accessor_value, y) {
      return function(d) {
        var path = [],
            firstDatum = d[0],
            lastDatum = d[d.length-1];

        path.push('M', x(accessor_date(firstDatum)), y(accessor_value(firstDatum)));
        path.push('L', x(accessor_date(lastDatum)), y(accessor_value(lastDatum)));

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
},{}],21:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3_scale_linear, techan_scale_financetime) {
  function plotMixin(source, priv, accessor) {
    var xScale = techan_scale_financetime(),
        yScale = d3_scale_linear();

    // Mixin the functions to the source
    source.accessor = function(_) {
      if (!arguments.length) return accessor;
      accessor = _;
      return bind();
    };

    source.xScale = function(_) {
      if (!arguments.length) return xScale;
      xScale = _;
      return bind();
    };

    source.yScale = function(_) {
      if (!arguments.length) return yScale;
      yScale = _;
      return bind();
    };

    // Add in the private, direct access variables
    function bind() {
      priv.xScale = xScale;
      priv.yScale = yScale;
      priv.accessor = accessor;

      return source;
    }

    bind();
  }

  return plotMixin;
};
},{}],22:[function(_dereq_,module,exports){
'use strict';

module.exports = function(accessor_rsi, plot, plotMixin) {  // Injected dependencies
  function rsi() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function rsiPlot(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      group.entry.append('path').attr({ class: 'overbought' });
      group.entry.append('path').attr({ class: 'middle' });
      group.entry.append('path').attr({ class: 'oversold' });
      group.entry.append('path').attr({ class: 'rsi' });

      rsiPlot.refresh(g);
    }

    rsiPlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(rsiPlot, p, accessor_rsi());

    return rsiPlot;
  }

  return rsi;
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.overbought').attr({ d: plot.horizontalPathLine(accessor.d, x, accessor.ob, y) });
  g.selectAll('path.middle').attr({ d: plot.horizontalPathLine(accessor.d, x, accessor.m, y) });
  g.selectAll('path.oversold').attr({ d: plot.horizontalPathLine(accessor.d, x, accessor.os, y) });
  g.selectAll('path.rsi').attr({ d: plot.pathLine(accessor.d, x, accessor.r, y) });
}
},{}],23:[function(_dereq_,module,exports){
'use strict';

module.exports = function(accessor_volume, plot, plotMixin) {  // Injected dependencies
  function volume() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function volumePlot(g) {
      var volume = plot.groupSelect(g, plot.dataMapper.unity, p.accessor.d)
        .entry.append('path')
          .attr({ class: 'volume' });

      if(p.accessor.o && p.accessor.c) {
        volume.classed(plot.classedUpDown(p.accessor));
      }

      volumePlot.refresh(g);
    }

    volumePlot.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(volumePlot, p, accessor_volume());

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
        zero = y(0),
        height = y(accessor.v(d)) - zero,
        rangeBand = x.rangeBand(),
        xValue = x(accessor.d(d)) - rangeBand/2;

    path.push('M', xValue, zero);
    path.push('l', 0, height);
    path.push('l', rangeBand, 0);
    path.push('l', 0, -height);

    return path.join(' ');
  };
}
},{}],24:[function(_dereq_,module,exports){
'use strict';

/*
 Finance time scale which is not necessarily continuous, is required to be plot continuous. Finance scale
 generally contains data points on days where a market is open but no points when closed, such as weekday
 and weekends respectively. When plot, is done so without weekend gaps.

 TODO Possibly rename to arraytime
 */
module.exports = function(d3_scale_linear, d3_rebind, zoomable, techan_util_rebindCallback) {  // Injected dependencies
  function financetime(index, domain) {
    var dateIndexMap = {},
        rangeBounds,
        rangeBand = 3;

    index = index || d3_scale_linear();
    domain = domain || [0, 1];
    rangeBounds = index.range();

    function rescale() {
      index.domain([0, domain.length-1]);

      dateIndexMap = {};
      domain.forEach(function(d, i) {
        dateIndexMap[d] = i;
      });

      var range = index.range(),
          rangeBand = calculateRangeBand(index, domain);
      rangeBounds = [range[0]-rangeBand*0.65, range[1]+rangeBand*0.65];
      index.domain([index.invert(rangeBounds[0]), index.invert(rangeBounds[1])]);

      zoomed();

      return scale;
    }

    function zoomed() {
      rangeBand = calculateRangeBand(index, domain);
    }

    function scale(x) {
      return index(dateIndexMap[x]);
    }

    scale.invert = function(y) {
      var i = scale.invertToIndex(y);
      return i === null ? null : domain[i];
    };

    scale.invertToIndex = function(y) {
      var i = Math.round(index.invert(y));
      return domain[i] ? Math.abs(i) : null;
    };

    /**
     * Returns a 2 element array representing the minimum and maximum pixel bounds for this scale.
     * @returns {*}
     */
    scale.rangeBounds = function() {
      return rangeBounds;
    };

    /**
     * As the underlying structure relies on a full array, ensure the full domain is passed here,
     * not just min and max values.
     *
     * @param _ The full domain array
     * @returns {*}
     */
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return rescale();
    };

    scale.copy = function() {
      return financetime(index.copy(), domain);
    };

    scale.rangeBand = function() {
      return rangeBand;
    };

    scale.zoomable = function() {
      return zoomable(index, zoomed);
    };

    // TODO Implement tick support
    scale.ticks = delegateGetOrSetAndChain(scale, index.ticks);
    scale.tickFormat = delegateGetOrSetAndChain(scale, index.tickFormat);

    techan_util_rebindCallback(scale, index, rescale, 'range', 'interpolate', 'clamp', 'nice');

    return rescale();
  }

  return financetime;
};

function delegateGetOrSetAndChain(target, thefunction) {
  return function() {
    if (!arguments.length) return thefunction.apply(this);
    thefunction.apply(this, arguments);
    return target;
  };
}


function calculateRangeBand(linear, domain) {
  var band = (Math.abs(linear(domain.length-1) - linear(0))/Math.max(1, domain.length-1));
  return band*0.8;
}
},{}],25:[function(_dereq_,module,exports){
'use strict';

module.exports = function(d3) {
  var zoomable = _dereq_('./zoomable')(),
      util = _dereq_('../util')(),
      financetime = _dereq_('./financetime')(d3.scale.linear, d3.rebind, zoomable, util.rebindCallback);

  return {
    financetime: financetime,

    analysis: {
      supstance: function(data, accessor) {
        return d3.scale.linear();
      },

      trendline: function(data, accessor) {
        return d3.scale.linear();
      }
    },

    plot: {
      time: function(data, accessor) {
        return financetime().domain(data.map(accessor.d));
      },

      percent: function (scale, reference) {
        var domain = scale.domain();
        return scale.copy().domain([((domain[0] - reference) / reference), ((domain[1] - reference) / reference)]);
      },

      ohlc: function (data, accessor) {
        return d3.scale.linear()
          .domain([d3.min(data.map(accessor.low())) * 0.98, d3.max(data.map(accessor.high())) * 1.03])
          .range([1, 0]);
      },

      volume: function (data, accessor) {
        return d3.scale.linear()
          .domain([0, d3.max(data.map(accessor)) * 1.15])
          .range([1, 0]);
      },

      rsi: function (data, accessor) {
        return d3.scale.linear().domain([0, 100])
          .range([1, 0]);
      },

      path: function(data, accessor) {
        return pathScale(d3, data, accessor);
      },

      momentum: function(data, accessor) {
        return pathScale(d3, data, accessor);
      },

      moneyflow: function(data, accessor) {
        return pathScale(d3, data, accessor);
      },

      macd: function(data, accessor) {
        return pathScale(d3, data, accessor);
      },

      movingaverage: function(data, accessor) {
        return pathScale(d3, data, accessor);
      }
    },

    position: {

    }
  };
};

function pathDomain(d3, data, accessor) {
  return data.length > 0 ? d3.extent(data, accessor) : null;
}

function pathScale(d3, data, accessor) {
  return d3.scale.linear().domain(pathDomain(d3, data, accessor))
    .range([1, 0]);
}
},{"../util":28,"./financetime":24,"./zoomable":26}],26:[function(_dereq_,module,exports){
'use strict';

/**
 * Creates a decorated zoomable view of the passed scale. As the finance scale deals with an array and integer positions within the
 * array, it does not support the d3 zoom behaviour. d3 zoom behaviour rescales the input domain.
 * Finance scale is composed of an array of dates which is fixed in length and position and a linear scale mapping index
 * to range. The linear scale can be zoomed. This object decorates the scale with only the methods required by zoom
 * (invert, domain, copy). On zoom, calls the based zoomed callback.
 *
 * NOTE: This is not a complete scale, it will throw errors if it is used for anything else but zooming
 */
module.exports = function() {
  function zoomable(linear, zoomed) {
    var scale = {},
        domainLimit = linear.domain();

    scale.invert = linear.invert;

    scale.domain = function(_) {
      if(!arguments.length) throw "zoomable is a write only domain. Use this scale for zooming only";
      linear.domain([Math.max(domainLimit[0], _[0]), Math.min(domainLimit[1], _[1])]);
      if(zoomed) zoomed(); // Callback to that we have been zoomed
      return scale;
    };

    scale.range = function(_) {
      if(!arguments.length) return linear.range();
      throw "zoomable is a read only range. Use this scale for zooming only";
    };

    scale.copy = function() {
      return zoomable(linear.copy(), zoomed);
    };

    return scale;
  }

  return zoomable;
};
},{}],27:[function(_dereq_,module,exports){
'use strict';

module.exports = (function(d3) {
  return {
    version: '0.1.0', // TODO Dynamically populate/tokenize
    accessor: _dereq_('./accessor')(),
    analysis: _dereq_('./analysis')(d3),
    indicator: _dereq_('./indicator')(),
    plot: _dereq_('./plot')(d3),
    scale: _dereq_('./scale')(d3)
  };
})(d3);
},{"./accessor":1,"./analysis":7,"./indicator":10,"./plot":16,"./scale":25}],28:[function(_dereq_,module,exports){
'use strict';

module.exports = function() {
  return {
    rebindCallback: rebindCallback,

    rebind: function(target, source) {
      var newArgs = Array.prototype.slice.call(arguments, 0);
      newArgs.splice(2, 0, undefined);
      return rebindCallback.apply(this, newArgs);
    }
  };
};

/*
 Slight modification to d3.rebind taking a post set callback
 https://github.com/mbostock/d3/blob/master/src/core/rebind.js
 */
function rebindCallback(target, source, postSetCallback) {
  var i = 2, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = doRebind(target, source, source[method], postSetCallback);
  return target;
}

function doRebind(target, source, method, postSetCallback) {
  return function() {
    var value = method.apply(source, arguments);
    if(postSetCallback) postSetCallback();
    return value === source ? target : value;
  };
}
},{}]},{},[27])
(27)
});