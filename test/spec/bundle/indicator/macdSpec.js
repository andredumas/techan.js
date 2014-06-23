techanModule('indicator/macd', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = require('./../_fixtures/data/macd');

  var actualInit = function() {
    return techan.indicator.macd;
  };

  specBuilder.require(require('../../../../src/indicator/macd'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And macd is initialised with defaults', function () {
        var macd;

        beforeEach(function () {
          macd = scope.macd;
        });

        it('Then on default invoke, macd should calculate correct values', function() {
          macd(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});