function techanModule(moduleName, moduleSpec) {
  'use strict';

  var module = null;
  var specBuilder = {};
  var instanceBuilder = {};

  var actualModuleName = moduleName.split('/').reduce(function(previous, next) { return next; });

  specBuilder.require = function(theModule, requireSpec) {
    module = theModule;

    describe('When I require() it', function () {
      it('Then it should be defined', function () {
        expect(module).toBeDefined();
      });

      if(requireSpec) requireSpec(instanceBuilder);
    });
  };

  instanceBuilder.instance = function(dependencyType, moduleInit, instanceSpec) {
    describe('And initialise with ' + dependencyType +' dependencies', function() {
      var constructor = null;

      beforeEach(function() {
        constructor = moduleInit(module);
      });

      it('Then the constructor should be obtained', function () {
        expect(constructor).toBeDefined();
      });

      describe('And the constructor is used to construct an instance', function () {
        var scope = {};

        beforeEach(function () {
          scope.plot = constructor();
          scope[actualModuleName] = scope.plot;
        });

        it('Then a new default instance should be defined', function () {
          expect(scope[actualModuleName]).toBeDefined();
        });

        if(instanceSpec) {
          instanceSpec(scope);
        }
      });
    });
  };

  instanceBuilder.index = function(description, moduleInit, instanceSpec) {
    describe('And initialise with ' + description +' dependencies', function() {
      var scope = {};

      beforeEach(function() {
        scope[actualModuleName] = moduleInit(module);
      });

      it('Then the instance should be obtained', function () {
        expect(scope[actualModuleName]).toBeDefined();
      });

      if(instanceSpec) {
        instanceSpec(scope);
      }
    });
  };

  describe('Given I have module "' + moduleName + '" available', function () {
    moduleSpec(specBuilder);
  });
}