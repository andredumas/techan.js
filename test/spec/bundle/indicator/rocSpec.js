techanModule('indicator/roc', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/roc');

  var actualInit = function() {
    return techan.indicator.roc;
  };

  specBuilder.require(techan.indicator.roc, function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And roc is initialised with defaults', function () {
        var roc;

        beforeEach(function () {
          roc = scope.roc;
          roc.period(10);
        });

        it('Then on default invoke, roc should calculate correct values', function() {
          roc(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});