techanModule('indicator/atr', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/atr');

  var actualInit = function() {
    return techan.indicator.atr;
  };

  specBuilder.require(require('../../../../src/indicator/atr'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And atr is initialised with defaults', function () {
        var atr;

        beforeEach(function () {
          atr = scope.atr;
        });

        it('Then on default invoke, atr should calculate correct values', function() {
          atr(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});