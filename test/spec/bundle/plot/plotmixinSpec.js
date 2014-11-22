techanModule('plot/plotmixin', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    return module(d3.scale.linear, techan.scale.financetime);
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
          bucket.plotmixin(object, priv).plot(accessor);
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