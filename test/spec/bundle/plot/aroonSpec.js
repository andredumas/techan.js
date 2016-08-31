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
                plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 7);
                plotMixinShouldBeSetup(scope);

                function assertDom(scope) {
                    var childElements;

                    beforeEach(function() {
                        childElements = scope.childElements;
                    });

                    describe('And on obtaining the data element', function() {
                        it('Then contains overbought', function() {
                            expect(childElements[0].outerHTML)
                              .toEqual('<path class="overbought" d="M 0.17105263157894737 70 L 0.8289473684210527 70"></path>');
                        });

                        it('Then contains oversold', function() {
                            expect(childElements[1].outerHTML)
                              .toEqual('<path class="oversold" d="M 0.17105263157894737 30 L 0.8289473684210527 30"></path>');
                        });

                        it('Then contains oscillator', function() {
                            expect(childElements[2].outerHTML)
                              .toEqual('<path class="aroon oscillator" d="M0.17105263157894737,25C0.22587719298245615,25,0.39035087719298245,25,0.5,25S0.7741228070175439,25,0.8289473684210527,25"></path>');
                        });

                        it('Then contains oscillatorArea', function() {
                            expect(childElements[3].outerHTML)
                              .toEqual('<path class="aroon oscillatorArea" d="M0.17105263157894737,25C0.22587719298245615,25,0.39035087719298245,25,0.5,25S0.7741228070175439,25,0.8289473684210527,25L0.8289473684210527,0C0.7741228070175439,0,0.6096491228070176,0,0.5,0S0.22587719298245615,0,0.17105263157894737,0Z"></path>');
                        });

                        it('Then contains middle', function() {
                            expect(childElements[4].outerHTML)
                              .toEqual('<path class="aroon middle" d="M0.17105263157894737,0C0.22587719298245615,0,0.39035087719298245,0,0.5,0S0.7741228070175439,0,0.8289473684210527,0"></path>');
                        });

                        it('Then contains up', function() {
                            expect(childElements[5].outerHTML)
                              .toEqual('<path class="aroon up" d="M0.17105263157894737,90C0.1712889036070611,89.99640866517267,0.49952745594377257,85.00718266965465,0.5,85S0.8287110963929389,80.00359133482733,0.8289473684210527,80"></path>');
                        });
                        it('Then contains up', function() {
                            expect(childElements[6].outerHTML)
                              .toEqual('<path class="aroon down" d="M0.17105263157894737,65C0.1712889036070611,64.99640866517267,0.49952745594377257,60.007182669654654,0.5,60S0.8287110963929389,55.00359133482733,0.8289473684210527,55"></path>');
                        });
                    });
                }
            });
        });
    });
});