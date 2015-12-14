techanModule('plot/aroon', function(specBuilder) {
    'use strict';

    var techan = require('../../../../src/techan'),
        data = require('./../_fixtures/data/aroon').plot,
        domFixtures = require('../_fixtures/dom');

    var actualInit = function() {
        return techan.plot.aroon;
    };

    specBuilder.require(require('../../../../src/plot/aroon'), function(instanceBuilder) {
        instanceBuilder.instance('actual', actualInit, function(scope) {
            describe('And aroon is initialised with defaults', function () {
                plotShouldRenderWithoutError(scope, data, domFixtures);
                plotMixinShouldBeSetup(scope);
            });
        });
    });
});