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
                              .toEqual('<path class="stochastic up" d="M0.17105263157894737,21.294498381877336C0.1710726193673225,21.29345175767572,0.4996800858576397,4.075681489546152,0.5,4.069767441860778S0.8287168837240323,9.1288728248797,0.8289473684210527,9.132420091324274"></path>');
                        });

                        it('Then contains a stochastic down', function() {
                            expect(childElements[3].outerHTML)
                              .toEqual('<path class="stochastic down" d="M0.17105263157894737,16.88836565330361C0.17114959837126595,16.88606201285841,0.49839008830695797,9.086750188601643,0.5,9.073561800175478S0.8279570642117158,11.491593778364958,0.8289473684210527,11.498895305020795"></path>');
                        });
                    });
                }
            });
        });
    });
});