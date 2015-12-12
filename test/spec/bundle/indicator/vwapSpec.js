techanModule('indicator/vwap', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
    data = require('./../_fixtures/data/vwap');

  var actualInit = function() {
    return techan.indicator.vwap;
  };

  specBuilder.require(require('../../../../src/indicator/vwap'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And vwap is initialised with defaults', function () {
        var vwap;

        beforeEach(function () {
          vwap = scope.vwap;
        });

        it('Then on default invoke, vwap should calculate correct values', function() {
          vwap(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected.vwap[i]);
          });
        });
      });
    });
  });
});
