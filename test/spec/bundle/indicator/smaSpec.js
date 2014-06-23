techanModule('indicator/sma', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = require('./../_fixtures/data/movingaverage');

  var actualInit = function() {
    return techan.indicator.sma;
  };

  specBuilder.require(require('../../../../src/indicator/sma'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And sma is initialised with defaults', function () {
        var sma;

        beforeEach(function () {
          sma = scope.sma;
        });

        it('Then on default invoke, sma should calculate correct values', function() {
          sma(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected.sma[i]);
          });
        });
      });
    });
  });
});