techanModule('indicator/sroc', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/sroc');

  var actualInit = function() {
    return techan.indicator.sroc;
  };

  specBuilder.require(require('../../../../src/indicator/sroc'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And sroc is initialised with defaults', function () {
        var sroc;

        beforeEach(function () {
          sroc = scope.sroc;
          sroc.period(2).ema().period(5);
        });

        it('Then on default invoke, sroc should calculate correct values', function() {
          sroc(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});