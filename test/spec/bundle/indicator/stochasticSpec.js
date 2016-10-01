techanModule('indicator/stochastic', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/stochastic');

  var actualInit = function() {
    return techan.indicator.stochastic;
  };

  specBuilder.require(require('../../../../src/indicator/stochastic'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And stochastic is initialised with defaults', function () {
        var stochastic;

        beforeEach(function () {
          stochastic = scope.stochastic;
        });

        it('Then preroll should equal the slow value', function() {
          expect(stochastic.preroll()).toEqual(stochastic.period()+stochastic.periodD());
        });

        it('Then on default invoke, stochastic should calculate correct values', function() {
          stochastic(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});
