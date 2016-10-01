techanModule('indicator/indicatormixin', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    return module();
  };

  specBuilder.require(require('../../../../src/indicator/indicatormixin'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(bucket) {
      var object,
          priv,
          accessor;

      beforeEach(function() {
        object = {};
        priv = {};
      });

      describe('And used to mixin indicator with a blank object, private object and value accessor', function() {
        beforeEach(function() {
          accessor  = techan.accessor.value();
          bucket.indicatormixin(object, priv).accessor(accessor);
        });

        it('Then accessor should be defined', function () {
          expect(object.accessor).toBeDefined();
        });

        it('Then preroll should be defined', function () {
          expect(object.preroll).toBeDefined();
        });

        it('Then preroll should default to 0', function () {
          expect(object.preroll()).toEqual(0);
        });

        it('Then the accessor should return the set value accessor', function () {
          expect(object.accessor()).toEqual(accessor);
        });

        it('Then private member accessor should be defined', function () {
          expect(priv.accessor).toBeDefined();
        });

        it('Then private member accessor should equal the set value accessor', function () {
          expect(priv.accessor).toEqual(accessor);
        });
      });

      describe('And used to mixin preroll with a blank object', function() {
        beforeEach(function() {
          bucket.indicatormixin(object, priv).preroll(function() { return 10; });
        });

        it('Then preroll should be correct value of function', function() {
          expect(object.preroll()).toEqual(10);
        });
      });

      describe('And used to mixin period with a blank object', function() {
        beforeEach(function() {
          bucket.indicatormixin(object, priv).period(20);
        });

        it('Then period should be initialised value', function() {
          expect(object.period()).toEqual(20);
        });

        it('Then private period should be initialised', function() {
          expect(priv.period).toEqual(20);
        });

        it('Then preroll should be the period', function() {
          expect(object.preroll()).toEqual(20);
        });
      });
    });
  });
});