techanModule('plot/stochastic', function(specBuilder) {
    'use strict';

    var techan = require('../../../../src/techan'),
        data = require('./../_fixtures/data/stochastic').plot,
        domFixtures = require('../_fixtures/dom');

    var actualInit = function() {
        return techan.plot.stochastic;
    };

    specBuilder.require(require('../../../../src/plot/stochastic'), function(instanceBuilder) {
        instanceBuilder.instance('actual', actualInit, function(scope) {
            describe('And stochastic is initialised with defaults', function () {
                plotShouldRenderWithoutError(scope, data, domFixtures);
                plotMixinShouldBeSetup(scope);
            });
        });
    });
});