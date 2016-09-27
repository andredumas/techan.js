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
                              .toEqual('<path class="upper" d="M0.17105263157894737,1.3282805139039244C0.2807017543859649,1.3276915274733088,0.39035087719298245,1.3271025410426929,0.5,1.3266056735316132C0.6096491228070176,1.3261088060205335,0.7192982456140351,1.32570405742899,0.8289473684210527,1.3252993088374463"></path>');
                        });

                        it('Then contains an middle', function() {
                            expect(childElements[1].outerHTML)
                              .toEqual('<path class="middle" d="M0.17105263157894737,1.3051935000000001C0.2807017543859649,1.3048639166666667,0.39035087719298245,1.3045343333333332,0.5,1.3040535C0.6096491228070176,1.3035726666666667,0.7192982456140351,1.3029405833333334,0.8289473684210527,1.3023085"></path>');
                        });
                        it('Then contains an lower', function() {
                            expect(childElements[2].outerHTML)
                              .toEqual('<path class="lower" d="M0.17105263157894737,1.2821064860960758C0.2807017543859649,1.2820056261581276,0.39035087719298245,1.2819047662201795,0.5,1.2815013264683868C0.6096491228070176,1.281097886716594,0.7192982456140351,1.280207788939574,0.8289473684210527,1.279317691162554"></path>');
                        });
                    });
                }

            });
        });
    });
});