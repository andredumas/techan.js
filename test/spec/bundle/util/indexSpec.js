techanModule('util', function(specBuilder) {
  'use strict';

  var target,
      source = {
        // A typical getter/setter type method
        method: function() {
          if(!arguments.length) return 2;
          return source;
        }
      };

  var actualInit = function(module) {
    return module();
  };

  specBuilder.require(require('../../../../src/util'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(bucket) {
      beforeEach(function() {
        target = {};
      });

      describe('And target is bound', function() {
        var rebind;

        beforeEach(function() {
          rebind = bucket.util.rebind;
          rebind(target, source, "method");
        });

        it('Then the target method should be bound', function() {
          expect(target.method).toBeDefined();
        });

        it('Then the target method should return the expected "get" result', function() {
          expect(target.method()).toEqual(2);
        });
      });

      describe('And target is bound', function() {
        var rebindCallback,
            postSetCallback;

        beforeEach(function() {
          postSetCallback = jasmine.createSpy('postSetCallback');
          rebindCallback = bucket.util.rebindCallback;
          rebindCallback(target, source, postSetCallback, "method");
        });

        it('Then the target method should be bound', function() {
          expect(target.method).toBeDefined();
        });

        it('Then the target method should return the expected "get" result', function() {
          expect(target.method()).toEqual(2);
        });

        it('Then on "set" the callback should be invoked', function() {
          target.method("mock value");
          expect(postSetCallback).toHaveBeenCalled();
        });

        it('Then on "get" the callback should not be invoked', function() {
          target.method();
          expect(postSetCallback).not.toHaveBeenCalled();
        });
      });
    });
  });
});