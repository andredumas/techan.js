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
                plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 3);
                plotMixinShouldBeSetup(scope);

                function assertDom(scope) {
                    var childElements;

                    beforeEach(function() {
                        childElements = scope.childElements;
                    });

                    describe('And on obtaining the data element', function() {
                        it('Then contains an adx', function() {
                            expect(childElements[0].outerHTML)
                              .toEqual('<path class="adx" d="M0.17105263157894737,23.81C0.2807017543859649,23.81,0.39035087719298245,23.81,0.5,23.81C0.6096491228070176,23.81,0.7192982456140351,23.81,0.8289473684210527,23.81"></path>');
                        });

                        it('Then contains a plusDi', function() {
                            expect(childElements[1].outerHTML)
                              .toEqual('<path class="plusDi" d="M0.17105263157894737,22.02C0.2807017543859649,22.02,0.39035087719298245,22.02,0.5,22.02C0.6096491228070176,22.02,0.7192982456140351,22.02,0.8289473684210527,22.02"></path>');
                        });

                        it('Then contains a minusDi', function() {
                            expect(childElements[2].outerHTML)
                              .toEqual('<path class="minusDi" d="M0.17105263157894737,27.43C0.2807017543859649,27.43,0.39035087719298245,27.43,0.5,27.43C0.6096491228070176,27.43,0.7192982456140351,27.43,0.8289473684210527,27.43"></path>');
                        });
                    });
                }
            });
        });
    });
});