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
                              .toEqual('<path class="williams up" d="M0.17105263157894737,20.82841787914555C0.1711850279974611,20.831108798461468,0.49986830481270605,27.517976752967222,0.5,27.51417900124517S0.8289383585378035,1.8571223439755373,0.8289473684210527,1.8564195767883156"></path>');
                        });
                    });
                }
            });
        });
    });
});
