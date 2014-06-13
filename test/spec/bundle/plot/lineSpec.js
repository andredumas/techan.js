techanModule('plot/line', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = line;

  var actualInit = function(module) {
    var plot = require('../../../../src/plot/plot')(d3),
      plotMixin = require('../../../../src/plot/plotmixin')(d3.scale.linear, techan.scale.financetime);

    return module(techan.accessor.value, plot, plotMixin);
  };

  specBuilder.require(require('../../../../src/plot/line'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(bucket) {
      describe('And line is initialised with defaults', function () {
        var line,
            accessor,
            g;

        beforeEach(function () {
          line = bucket.line;
          g = d3.select(document.createElement('g'));
        });

        it('Then on default invoke, moving average should be rendered without error', function() {
          // TODO Assert the result/DOM
          line(g, data);
        });

        it('Then on refresh invoke, moving average should be refreshed only', function() {
          // TODO Assert the result/DOM
          line(g, data);
          line.refresh(g);
        });

        it('Then the plot mixin methods should be defined', function () {
          expect(line.xScale).toBeDefined();
          expect(line.yScale).toBeDefined();
          expect(line.accessor).toBeDefined();
        });
      });
    });
  });
});