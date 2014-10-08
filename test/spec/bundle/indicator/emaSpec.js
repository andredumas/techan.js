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

        describe('And on default invoke', function() {
          var result;

          beforeEach(function() {
            result = ema(data.input);
          });

          it('Then ema should calculate correct values', function() {
            result.forEach(function(d, i) {
              expect(d).toEqual(data.expected.ema[i]);
            });
          });

          describe('And on second default invoke', function() {
            beforeEach(function() {
              result = ema(data.input);
            });

            it('Then ema should calculate the same correct values', function() {
              result.forEach(function(d, i) {
                expect(d).toEqual(data.expected.ema[i]);
              });
            });
          });
        });
      });
    });
  });
});