techanModule('indicator/wilderma', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/movingaverage');

  var actualInit = function() {
    return techan.indicator.wilderma;
  };

  specBuilder.require(techan.indicator.wilderma, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And wilderma is initialised with defaults', function () {
        var wilderma;

        beforeEach(function () {
          wilderma = scope.wilderma;
        });

        it('Then on default invoke, sma should calculate correct values', function() {
          wilderma(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected.wilderma[i]);
          });
        });
      });
    });
  });
});