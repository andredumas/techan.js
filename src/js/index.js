var techanSite = techanSite || {};

(function(d3, techan) {
  'use strict';

  techanSite.bigchart = function() {

    var trendlineData = [
      { start: { date: new Date(2014, 2, 11), value: 72.50 }, end: { date: new Date(2014, 5, 9), value: 63.34 } },
      { start: { date: new Date(2013, 10, 21), value: 43 }, end: { date: new Date(2014, 2, 17), value: 70.50 } }
    ];

    var supstanceData = [
      { start: new Date(2014, 2, 11), end: new Date(2014, 5, 9), value: 63.64 },
      { start: new Date(2013, 10, 21), end: new Date(2014, 2, 17), value: 55.50 }
    ];

    var dim = {
      width: null, height: null,
      margin: { top: 20, right: 50, bottom: 30, left: 50 },
      plot: { width: null, height: null },
      ohlc: { height: null },
      indicator: { height: null, padding: null, top: null, bottom: null }
    };

    var x = techan.scale.financetime(),
        y = d3.scale.linear(),
        yPercent = y.copy(),
        indicatorTop = d3.scale.linear(),
        yVolume = d3.scale.linear(),
        candlestick = techan.plot.candlestick().xScale(x).yScale(y),
        sma0 = techan.plot.sma().xScale(x).yScale(y),
        sma1 = techan.plot.sma().xScale(x).yScale(y),
        ema2 = techan.plot.ema().xScale(x).yScale(y),
        volume = techan.plot.volume().accessor(candlestick.accessor()).xScale(x).yScale(yVolume),
        trendline = techan.plot.trendline().xScale(x).yScale(y),
        supstance = techan.plot.supstance().xScale(x).yScale(y),
        xAxis = d3.svg.axis().scale(x).orient("bottom"),
        timeAnnotation = techan.plot.axisannotation().axis(xAxis).format(d3.time.format('%Y-%m-%d')).width(65),
        yAxis = d3.svg.axis().scale(y).orient("right"),
        ohlcAnnotation = techan.plot.axisannotation().axis(yAxis).format(d3.format(',.2fs')),
        closeAnnotation = techan.plot.axisannotation().axis(yAxis).format(d3.format(',.2fs')),
        percentAxis = d3.svg.axis().scale(yPercent).orient("left").tickFormat(d3.format('+.1%')),
        percentAnnotation = techan.plot.axisannotation().axis(percentAxis),
        volumeAxis = d3.svg.axis().scale(yVolume).orient("right").ticks(3).tickFormat(d3.format(",.3s")),
        volumeAnnotation = techan.plot.axisannotation().axis(volumeAxis).width(35),
        macdScale = d3.scale.linear(),
        rsiScale = d3.scale.linear(),
        macd = techan.plot.macd().xScale(x).yScale(macdScale),
        macdAxis = d3.svg.axis().scale(macdScale).ticks(3).orient("right"),
        macdAnnotation = techan.plot.axisannotation().axis(macdAxis).format(d3.format(',.2fs')),
        macdAxisLeft = d3.svg.axis().scale(macdScale).ticks(3).orient("left"),
        macdAnnotationLeft = techan.plot.axisannotation().axis(macdAxisLeft).format(d3.format(',.2fs')),
        rsi = techan.plot.rsi().xScale(x).yScale(rsiScale),
        rsiAxis = d3.svg.axis().scale(rsiScale).ticks(3).orient("right"),
        rsiAnnotation = techan.plot.axisannotation().axis(rsiAxis).format(d3.format(',.2fs')),
        rsiAxisLeft = d3.svg.axis().scale(rsiScale).ticks(3).orient("left"),
        rsiAnnotationLeft = techan.plot.axisannotation().axis(rsiAxisLeft).format(d3.format(',.2fs')),
        ohlcCrosshair = techan.plot.crosshair().xAnnotation(timeAnnotation).yAnnotation([ohlcAnnotation, percentAnnotation, volumeAnnotation]),
        macdCrosshair = techan.plot.crosshair().xAnnotation(timeAnnotation).yAnnotation([macdAnnotation, macdAnnotationLeft]),
        rsiCrosshair = techan.plot.crosshair().xAnnotation(timeAnnotation).yAnnotation([rsiAnnotation, rsiAnnotationLeft]);

    function bigchart(selection) {
      selection.each(function() {
        var selection = d3.select(this),
            svg = selection.append("svg"),
            defs = svg.append("defs");

        defs.append("clipPath")
            .attr("id", "ohlcClip")
          .append("rect")
            .attr("x", 0)
            .attr("y", 0);

        defs.selectAll(".indicatorClip").data([0, 1])
          .enter()
          .append("clipPath")
            .attr("id", function(d, i) { return "indicatorClip-" + i; })
            .attr("class", "indicatorClip")
          .append("rect")
            .attr("x", 0);

        svg = svg.append("g")
          .attr("class", "chart");

        svg.append('text')
          .attr("class", "symbol")
          .attr("x", 20)
          .text("Twitter, Inc. (TWTR)");

        svg.append("g")
          .attr("class", "x axis");

        var ohlcSelection = svg.append("g")
          .attr("class", "ohlc")
          .attr("transform", "translate(0,0)");

        ohlcSelection.append("g")
            .attr("class", "y axis");

        ohlcSelection.append("g")
          .attr("class", "closeValue annotation up");

        ohlcSelection.append("g")
          .attr("class", "volume")
          .attr("clip-path", "url(#ohlcClip)");

        ohlcSelection.append("g")
          .attr("class", "candlestick")
          .attr("clip-path", "url(#ohlcClip)");

        ohlcSelection.append("g")
          .attr("class", "indicator sma ma-0")
          .attr("clip-path", "url(#ohlcClip)");

        ohlcSelection.append("g")
          .attr("class", "indicator sma ma-1")
          .attr("clip-path", "url(#ohlcClip)");

        ohlcSelection.append("g")
          .attr("class", "indicator ema ma-2")
          .attr("clip-path", "url(#ohlcClip)");

        ohlcSelection.append("g")
          .attr("class", "percent axis");

        ohlcSelection.append("g")
          .attr("class", "volume axis");

        var indicatorSelection = svg.selectAll("svg > g.indicator").data(["macd", "rsi"]).enter()
          .append("g")
          .attr("class", function(d) { return d + " indicator"; });

        indicatorSelection.append("g")
          .attr("class", "axis right");

        indicatorSelection.append("g")
          .attr("class", "axis left");

        indicatorSelection.append("g")
          .attr("class", "indicator-plot")
          .attr("clip-path", function(d, i) { return "url(#indicatorClip-" + i + ")"; });

        // Add trendlines and other interactions last to be above zoom pane
        svg.append('g')
          .attr("class", "crosshair ohlc");

        svg.append('g')
          .attr("class", "crosshair macd");

        svg.append('g')
          .attr("class", "crosshair rsi");

        svg.append("g")
          .attr("class", "trendlines analysis")
          .attr("clip-path", "url(#ohlcClip)");
        svg.append("g")
          .attr("class", "supstances analysis")
          .attr("clip-path", "url(#ohlcClip)");

        var accessor = candlestick.accessor(),
          indicatorPreRoll = 33;  // Don't show where indicators don't have data

        var data = techanSite.aapl;

        x.domain(techan.scale.plot.time(data).domain());
        y.domain(techan.scale.plot.ohlc(data.slice(indicatorPreRoll)).domain());
        yPercent.domain(techan.scale.plot.percent(y, accessor(data[indicatorPreRoll])).domain());
        yVolume.domain(techan.scale.plot.volume(data).domain());

        var macdData = techan.indicator.macd()(data);
        macdScale.domain(techan.scale.plot.macd(macdData).domain());
        var rsiData = techan.indicator.rsi()(data);
        rsiScale.domain(techan.scale.plot.rsi(rsiData).domain());

        x.zoomable().domain([indicatorPreRoll, data.length]); // Zoom in a little to hide indicator preroll
        bigchart.resize(selection);

        svg.select("g.candlestick").datum(data).call(candlestick);
        svg.select("g.closeValue.annotation").datum([{value:data[data.length-1].close}]).call(closeAnnotation);
        svg.select("g.volume").datum(data).call(volume);
        svg.select("g.sma.ma-0").datum(techan.indicator.sma().period(10)(data)).call(sma0);
        svg.select("g.sma.ma-1").datum(techan.indicator.sma().period(20)(data)).call(sma1);
        svg.select("g.ema.ma-2").datum(techan.indicator.ema().period(50)(data)).call(ema2);
        svg.select("g.macd .indicator-plot").datum(macdData).call(macd);
        svg.select("g.rsi .indicator-plot").datum(rsiData).call(rsi);

        svg.select("g.crosshair.ohlc").call(ohlcCrosshair);
        svg.select("g.crosshair.macd").call(macdCrosshair);
        svg.select("g.crosshair.rsi").call(rsiCrosshair);
      //    svg.select("g.trendlines").datum(trendlineData).call(trendline);//.call(trendline.drag);
      //    svg.select("g.supstances").datum(supstanceData).call(supstance);//.call(supstance.drag);
      });
    }

    bigchart.resize = function(selection) {
      selection.each(function() {
        // TODO Ensure the aspect ratio is within 'pretty' limits
        dim.width = this.offsetWidth;
        dim.height = this.offsetHeight;
        dim.plot.width = dim.width - dim.margin.left - dim.margin.right;
        dim.plot.height = dim.height - dim.margin.top - dim.margin.bottom;
        dim.ohlc.height = dim.plot.height * 0.67777777;
        dim.indicator.height = dim.plot.height * 0.144444;
        dim.indicator.padding = dim.plot.height * 0.01111111111;
        dim.indicator.top = dim.ohlc.height + dim.indicator.padding;
        dim.indicator.bottom = dim.indicator.top + dim.indicator.height + dim.indicator.padding;

        var xRange = [0, dim.plot.width],
            yRange = [dim.ohlc.height, 0],
            selection = d3.select(this);

        indicatorTop.range([dim.indicator.top, dim.indicator.bottom]);
        x.range(xRange);
        y.range(yRange);
        yPercent.range(y.range());   // Same as y at this stage, will get a different domain later
        yVolume.range([yRange[0], yRange[0]-0.2*yRange[0]]);
        timeAnnotation.translate([0, dim.plot.height]);
        ohlcAnnotation.translate([xRange[1], 0]);
        closeAnnotation.translate([xRange[1], 0]);
        macdScale.range([indicatorTop(0) + dim.indicator.height, indicatorTop(0)]);
        rsiScale.range([indicatorTop(1) + dim.indicator.height, indicatorTop(1)]);
        macdAnnotation.translate([xRange[1], 0]);
        rsiAnnotation.translate([xRange[1], 0]);
        ohlcCrosshair.verticalWireRange([0, dim.plot.height]);
        macdCrosshair.verticalWireRange([0, dim.plot.height]);
        rsiCrosshair.verticalWireRange([0, dim.plot.height]);

        // TODO Adjust tick count when chart gets too small, ticks get a bit crowded

        selection.select("svg")
          .attr("width", dim.width)
          .attr("height", dim.height);

        selection.selectAll("defs #ohlcClip > rect")
          .attr("width", dim.plot.width)
          .attr("height", dim.ohlc.height);

        selection.selectAll("defs .indicatorClip > rect")
          .attr("y", function (d, i) {
            return indicatorTop(i);
          })
          .attr("width", dim.plot.width)
          .attr("height", dim.indicator.height);

        selection.select("g.chart")
          .attr("transform", "translate(" + dim.margin.left + "," + dim.margin.top + ")");

        selection.select("g.x.axis")
          .attr("transform", "translate(0," + dim.plot.height + ")");

        selection.select("g.ohlc g.y.axis")
          .attr("transform", "translate(" + xRange[1] + ",0)");

        selection.selectAll("g.indicator g.axis.right")
          .attr("transform", "translate(" + xRange[1] + ",0)");
        selection.selectAll("g.indicator g.axis.left")
          .attr("transform", "translate(" + xRange[0] + ",0)");

        draw(selection.select("svg"));
      });
    };

    bigchart.refresh = function(selection) {
      selection.each(function() {
        var selection = d3.select(this);
        draw(selection.select("svg"));
      });
    };

    function draw(svg) {
      svg.select("g.x.axis").call(xAxis);
      svg.select("g.ohlc .axis").call(yAxis);
      svg.select("g.volume.axis").call(volumeAxis);
      svg.select("g.percent.axis").call(percentAxis);
      svg.select("g.macd .axis.right").call(macdAxis);
      svg.select("g.rsi .axis.right").call(rsiAxis);
      svg.select("g.macd .axis.left").call(macdAxisLeft);
      svg.select("g.rsi .axis.left").call(rsiAxisLeft);

      // We know the data does not change, a simple refresh that does not perform data joins will suffice.
      svg.select("g.candlestick").call(candlestick.refresh);
      svg.select("g.closeValue.annotation").call(closeAnnotation.refresh);
      svg.select("g.volume").call(volume.refresh);
      svg.select("g .sma.ma-0").call(sma0.refresh);
      svg.select("g .sma.ma-1").call(sma1.refresh);
      svg.select("g .ema.ma-2").call(ema2.refresh);
      svg.select("g.macd .indicator-plot").call(macd.refresh);
      svg.select("g.rsi .indicator-plot").call(rsi.refresh);
      svg.select("g.crosshair.ohlc").call(ohlcCrosshair.refresh);
      svg.select("g.crosshair.macd").call(macdCrosshair.refresh);
      svg.select("g.crosshair.rsi").call(rsiCrosshair.refresh);
      svg.select("g.trendlines").call(trendline.refresh);
      svg.select("g.supstances").call(supstance.refresh);
    }

    return bigchart;
  };

  var bigchart = techanSite.bigchart();

  d3.select('div#bigChart').call(bigchart);

  window.onresize = function() {
    d3.select('div#bigChart').call(bigchart.resize);
  };

}(d3, techan));