techanModule('plot/plotmixin', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    var plot = require('../../../../src/plot/plot')(d3.line, d3.select);

    return module(d3.scaleLinear, d3.functor, techan.scale.financetime, plot.dataSelector);
  };

  specBuilder.require(require('../../../../src/plot/plotmixin'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(bucket) {
      var object,
          priv,
          accessor;

      beforeEach(function() {
        object = {};
        priv = {};
      });

      describe('And used to mixin plot with a blank object, private object and value accessor', function() {
        beforeEach(function() {
          accessor  = techan.accessor.value();
          bucket.plotmixin(object, priv).plot(accessor).dataSelector();
        });

        it('Then the plotmixin data mappers should be defined', function() {
          expect(bucket.plotmixin.dataMapper).toBeDefined();
          expect(bucket.plotmixin.dataMapper.unity).toBeDefined();
          expect(bucket.plotmixin.dataMapper.array).toBeDefined();
        });

        it('Then the plot mixin method xScale should be defined', function () {
          expect(object.xScale).toBeDefined();
        });

        it('Then the plot mixin method yScale should be defined', function () {
          expect(object.yScale).toBeDefined();
        });

        it('Then the plot mixin method accessor should be defined', function () {
          expect(object.accessor).toBeDefined();
        });

        it('Then the plot mixin method accessor should return the set value accessor', function () {
          expect(object.accessor()).toEqual(accessor);
        });

        it('Then the plot mixin method group should be defined', function () {
          expect(priv.dataSelector).toBeDefined();
        });

        it('Then the plot mixin private member xScale should be defined', function () {
          expect(priv.xScale).toBeDefined();
        });

        it('Then the plot mixin private member yScale should be defined', function () {
          expect(priv.yScale).toBeDefined();
        });

        it('Then the plot mixin private member accessor should be defined', function () {
          expect(priv.accessor).toBeDefined();
        });

        it('Then the plot mixin private member accessor should equal the set value accessor', function () {
          expect(priv.accessor).toEqual(accessor);
        });

        it('Then the plot mixin private member width should not be defined', function() {
          expect(priv.width).not.toBeDefined();
        });

        it('Then the plot mixin private member on should not be defined', function() {
          expect(priv.on).not.toBeDefined();
        });
      });

      describe('And used to mixin "on" with a blank object', function() {
        beforeEach(function() {
          var dispatch = {};
          bucket.plotmixin(object, priv).on(dispatch);
        });

        it('Then the plot mixin method "on" should be defined', function() {
          expect(object.on).toBeDefined();
        });
      });
    });
  });
});