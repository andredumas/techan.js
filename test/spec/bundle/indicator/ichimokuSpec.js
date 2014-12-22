techanModule('indicator/ichimoku', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/ichimoku');

  var actualInit = function() {
    return techan.indicator.ichimoku;
  };

  specBuilder.require(require('../../../../src/indicator/ichimoku'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And ichimoku is initialised with defaults', function () {
        var ichimoku;

        beforeEach(function () {
          ichimoku = scope.ichimoku;
        });

        it('Then on default invoke with no data, ichimoku should return no data', function() {
          expect(ichimoku([])).toEqual([]);
        });

        it('Then on default invoke, ichimoku should calculate correct values', function() {
          ichimoku(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});