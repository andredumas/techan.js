techanModule('plot/bollinger', function(specBuilder) {
    'use strict';

    var techan = require('../../../../src/techan'),
        data = require('./../_fixtures/data/bollinger').plot,
        domFixtures = require('../_fixtures/dom');

    var actualInit = function() {
        return techan.plot.bollinger;
    };

    specBuilder.require(require('../../../../src/plot/bollinger'), function(instanceBuilder) {
        instanceBuilder.instance('actual', actualInit, function(scope) {
            describe('And bollinger is initialised with defaults', function () {
                plotShouldRenderWithoutError(scope, data, domFixtures);
                plotMixinShouldBeSetup(scope);
            });
        });
    });
});