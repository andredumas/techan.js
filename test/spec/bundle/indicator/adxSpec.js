techanModule('indicator/adx', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/adx');

  var actualInit = function() {
    return techan.indicator.adx;
  };

  specBuilder.require(require('../../../../src/indicator/adx'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And adx is initialised with defaults', function () {
        var adx;

        beforeEach(function () {
          adx = scope.adx;
        });

        it('Then on default invoke, adx should calculate correct values', function() {
          adx(data.input).forEach(function(d, i) {
            expect(d).toEqual(data.expected[i]);
          });
        });
      });
    });
  });
});