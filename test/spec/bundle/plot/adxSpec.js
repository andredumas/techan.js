techanModule('plot/adx', function(specBuilder) {
    'use strict';

    var techan = require('../../../../src/techan'),
        data = require('./../_fixtures/data/adx').plot,
        domFixtures = require('../_fixtures/dom');

    var actualInit = function() {
        return techan.plot.adx;
    };

    specBuilder.require(require('../../../../src/plot/adx'), function(instanceBuilder) {
        instanceBuilder.instance('actual', actualInit, function(scope) {
            describe('And adx is initialised with defaults', function () {
                plotShouldRenderWithoutError(scope, data, domFixtures);
                plotMixinShouldBeSetup(scope);
            });
        });
    });
});