# TechanJS [![Build Status](https://travis-ci.org/andredumas/techan.js.svg?branch=master)](https://travis-ci.org/andredumas/techan.js)

> <strong>Te</strong>chnical <strong>Ch</strong>art <strong>An</strong>alysis

A visual, technical analysis and charting library built on [D3](https://github.com/mbostock/d3). Build interactive 
financial charts for modern and mobile browsers. 

[Examples Gallery](https://github.com/andredumas/techan.js/wiki/Gallery)

TechanJS utilises D3's [reusable chart API](http://bost.ocks.org/mike/chart/) pattern and currently supports a 
range of [static and interactive plots](http://bl.ocks.org/andredumas/edf630690c10b89be390).

## Static Plots

* [Candlestick](http://bl.ocks.org/andredumas/27c4a333b0e0813e093d)
* [OHLC](http://bl.ocks.org/andredumas/06ad3573c0053d0e1fc7)
* [Volume](http://bl.ocks.org/andredumas/f9cb47fa9e32ce34011a)
* [Axis Annotations](http://bl.ocks.org/andredumas/06d462978e089323a116)
* [Moving Averages (Simple & Exponential)](http://bl.ocks.org/andredumas/274b54b4d2c2ffa19fca)
* [RSI](http://bl.ocks.org/andredumas/6da267f1c51a13dea35b)
* [MACD](http://bl.ocks.org/andredumas/10d701ccb3b8b1e99878)

## Interactive & Dynamic Plots

* [Updating Data Feed](http://bl.ocks.org/andredumas/95f1f22130fb1a3a8181)
* [Crosshair](http://bl.ocks.org/andredumas/045f550b72ad46301130)
* [Trendlines](http://bl.ocks.org/andredumas/69f49097e9bb5c0c6e4d)
* [Support & Resistence Lines](http://bl.ocks.org/andredumas/10194a84a3e46fe127d4)
* [Plot Zooming](http://bl.ocks.org/andredumas/a48008ea8e2c832144db)

## Algorithms

* [Moving Averages (Simple & Exponential)](http://bl.ocks.org/andredumas/274b54b4d2c2ffa19fca)
* [RSI](http://bl.ocks.org/andredumas/6da267f1c51a13dea35b)
* [MACD](http://bl.ocks.org/andredumas/10d701ccb3b8b1e99878)

## Getting Started

To obtain just the project itself:

```shell
git clone git@github.com:andredumas/techan.js.git
npm install
npm test
# OR
grunt
```

Project with all examples

```shell
git clone --recursive git@github.com:andredumas/techan.js.git
npm install
grunt serve

```

Once running browse to http://localhost:8000/examples/ to see examples using remote techanjs and d3. Alternatively
browse to http://localhost:8000/build/examples/ to see examples using locally built techanjs and bower d3