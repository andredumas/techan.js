techanModule('indicator/ema', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = require('./../_fixtures/data/movingaverage');

  var actualInit = function() {
    return techan.indicator.ema;
  };

  specBuilder.require(require('../../../../src/indicator/ema'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And ema is initialised with defaults', function () {
        var ema;

        beforeEach(function () {
          ema = scope.ema;
        });

        it('Then on default invoke, ema should calculate correct values', function() {
          ema(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected.ema[i]);
          });
        });
      });
    });
  });
});