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
                plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 4);
                plotMixinShouldBeSetup(scope);

                function assertDom(scope) {
                    var childElements;

                    beforeEach(function() {
                        childElements = scope.childElements;
                    });

                    describe('And on obtaining the data element', function() {
                        it('Then contains a overbought', function() {
                            expect(childElements[0].outerHTML)
                              .toEqual('<path class="overbought" d="M 0.17105263157894737 80 L 0.8289473684210527 80"></path>');
                        });

                        it('Then contains a oversold', function() {
                            expect(childElements[1].outerHTML)
                              .toEqual('<path class="oversold" d="M 0.17105263157894737 20 L 0.8289473684210527 20"></path>');
                        });

                        it('Then contains a stochastic up', function() {
                            expect(childElements[2].outerHTML)
                              .toEqual('<path class="stochastic up" d="M0.17105263157894737,21.294498381877336C0.2807017543859649,12.682132911869058,0.39035087719298245,4.069767441860778,0.5,4.069767441860778C0.6096491228070176,4.069767441860778,0.7192982456140351,6.601093766592526,0.8289473684210527,9.132420091324274"></path>');
                        });

                        it('Then contains a stochastic down', function() {
                            expect(childElements[3].outerHTML)
                              .toEqual('<path class="stochastic down" d="M0.17105263157894737,16.88836565330361C0.2807017543859649,12.980963726739544,0.39035087719298245,9.073561800175478,0.5,9.073561800175478C0.6096491228070176,9.073561800175478,0.7192982456140351,10.286228552598136,0.8289473684210527,11.498895305020795"></path>');
                        });
                    });
                }
            });
        });
    });
});