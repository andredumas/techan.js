techanModule('indicator/atrtrailingstop', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/atrtrailingstop');

  var actualInit = function() {
    return techan.indicator.atrtrailingstop;
  };

  specBuilder.require(require('../../../../src/indicator/atrtrailingstop'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And atrtrailingstop is initialised with defaults', function () {
        var atrtrailingstop;

        beforeEach(function () {
          atrtrailingstop = scope.atrtrailingstop;
        });

        it('Then on default invoke, atr should calculate correct values', function() {
          atrtrailingstop(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});