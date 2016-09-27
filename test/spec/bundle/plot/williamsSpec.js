techanModule('plot/williams', function(specBuilder) {
    'use strict';

    var techan = require('../../../../src/techan'),
        data = require('./../_fixtures/data/williams').plot,
        domFixtures = require('../_fixtures/dom');

    var actualInit = function() {
        return techan.plot.williams;
    };

    specBuilder.require(require('../../../../src/plot/williams'), function(instanceBuilder) {
        instanceBuilder.instance('actual', actualInit, function(scope) {
            describe('And williams is initialised with defaults', function () {
                plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 1);
                plotMixinShouldBeSetup(scope);

                function assertDom(scope) {
                    var childElements;

                    beforeEach(function() {
                        childElements = scope.childElements;
                    });

                    describe('And on obtaining the data element', function() {
                        it('Then contains a up', function() {
                            expect(childElements[0].outerHTML)
                              .toEqual('<path class="williams up" d="M0.17105263157894737,20.82841787914555C0.2807017543859649,24.17129844019536,0.39035087719298245,27.51417900124517,0.5,27.51417900124517C0.6096491228070176,27.51417900124517,0.7192982456140351,14.685299289016744,0.8289473684210527,1.8564195767883156"></path>');
                        });
                    });
                }
            });
        });
    });
});
