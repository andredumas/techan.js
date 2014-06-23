techanModule('indicator/rsi', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/rsi');

  var actualInit = function() {
    return techan.indicator.rsi;
  };

  specBuilder.require(require('../../../../src/indicator/rsi'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And rsi is initialised with defaults', function () {
        var rsi;

        beforeEach(function () {
          rsi = scope.rsi;
        });

        it('Then on default invoke, rsi should calculate correct values', function() {
          rsi(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});