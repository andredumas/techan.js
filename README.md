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

* [Ichimoku Cloud](http://bl.ocks.org/andredumas/ef212e7c26d2b7ba5403)
* [Moving Averages (Simple & Exponential)](http://bl.ocks.org/andredumas/274b54b4d2c2ffa19fca)
* [RSI](http://bl.ocks.org/andredumas/6da267f1c51a13dea35b)
* [MACD](http://bl.ocks.org/andredumas/10d701ccb3b8b1e99878)
* [ATR](http://bl.ocks.org/andredumas/5cb069d5cc38397d6fc1)
* [ATR Trailing Stop](http://bl.ocks.org/andredumas/55cacf3a2a4881f0be66)

## Getting Started

### Manual Download

Download the latest release [https://github.com/andredumas/techan.js/releases/latest](https://github.com/andredumas/techan.js/releases/latest)

### npm

```
npm install --save techan
```

### Bower Dependency

```
bower install --save techan
```

### Build From Source

Cloning and building the base project:

```shell
git clone https://github.com/andredumas/techan.js.git
cd techan.js
npm install

# Then to build
npm test
# OR
grunt
```

### Build From Source With Examples

Cloning the project with all examples and usage:

```shell
git clone --recursive https://github.com/andredumas/techan.js.git
cd techan.js
npm install
npm start
```

Once running browse to [http://localhost:8000/examples/](http://localhost:8000/examples/) to see examples using the remote
[(development stable) techanjs](http://techanjs.org/techan.min.js) and d3. Alternatively browse to
[http://localhost:8000/build/examples/](http://localhost:8000/build/examples/) for the same examples using the locally
built techanjs and bower obtained d3 but **be aware** that the examples are built to work with the latest, development
stable version of techanjs located at [http://techanjs.org/techan.min.js](http://techanjs.org/techan.min.js). Expect that
HEAD of master will contain unstable features under development. They may not always be compatible with all
the examples. I will attempt to keep the release tags functional together with correctly referenced examples.

### Docker

Run techan.js in a consistent environment using Docker. To see the examples, all submodules are required (recursive 
clone or update, init) locally.

**NOTE:** On build the project is copied into the docker image and as such any changes made will not be refreshed into a
running container.


```shell
git clone --recursive https://github.com/andredumas/techan.js.git
cd techan.js
docker build -t andredumas/techan.js .
docker run --rm -it -p 8000:8000 andredumas/techan.js
```

As above, browse to [http://localhost:8000/examples/](http://localhost:8000/examples/) to see the examples.