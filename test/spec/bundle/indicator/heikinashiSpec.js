techanModule('indicator/heikinashi', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/heikinashi');

  var actualInit = function() {
    return techan.indicator.heikinashi;
  };

  specBuilder.require(require('../../../../src/indicator/heikinashi'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And heikinashi is initialised with defaults', function () {
        var heikinashi;

        beforeEach(function () {
          heikinashi = scope.heikinashi;
        });

        it('Then on default invoke, heikinashi should calculate correct values', function() {
          heikinashi(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});