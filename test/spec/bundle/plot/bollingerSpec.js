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
                plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 3);
                plotMixinShouldBeSetup(scope);

                function assertDom(scope) {
                    var childElements;

                    beforeEach(function() {
                        childElements = scope.childElements;
                    });

                    describe('And on obtaining the data element', function() {
                        it('Then contains an upper', function() {
                            expect(childElements[0].outerHTML)
                              .toEqual('<path class="upper" d="M0.17105263157894737,1.3282805139039244C0.22587577177356072,1.3280013810779785,0.39035312866794186,1.327102530840288,0.5,1.3266056735316132S0.774123671675522,1.3255170328526158,0.8289473684210527,1.3252993088374463"></path>');
                        });

                        it('Then contains an middle', function() {
                            expect(childElements[1].outerHTML)
                              .toEqual('<path class="middle" d="M0.17105263157894737,1.3051935000000001C0.22587653452636444,1.3050035022819455,0.39035298570276916,1.3045343240870961,0.5,1.3040535S0.7741243497867957,1.3025993251492511,0.8289473684210527,1.3023085"></path>');
                        });
                        it('Then contains an lower', function() {
                            expect(childElements[2].outerHTML)
                              .toEqual('<path class="lower" d="M0.17105263157894737,1.2821064860960758C0.22587700743254213,1.282005626499481,0.39035284742646553,1.2819661172722165,0.5,1.2815013264683868S0.7741252228310831,1.2796816143434153,0.8289473684210527,1.279317691162554"></path>');
                        });
                    });
                }

            });
        });
    });
});