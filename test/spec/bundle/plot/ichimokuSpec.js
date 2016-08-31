techanModule('plot/ichimoku', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      data = require('./../_fixtures/data/ichimoku').plot,
      domFixtures = require('../_fixtures/dom');

  var actualInit = function() {
    return techan.plot.ichimoku;
  };

  specBuilder.require(require('../../../../src/plot/ichimoku'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And ichimoku is initialised with defaults', function () {
        plotMixinShouldBeSetup(scope);
        plotShouldRenderWithoutError(scope, data, domFixtures, assertDom, 1, 9);

        function assertDom(scope) {
          var childElements,
              kumoclipupId,
              kumoclipdownId;

          beforeEach(function() {
            childElements = scope.childElements;
            var g = scope.g;
            kumoclipupId = g.selectAll('clippath.kumoclipup').attr('id');
            kumoclipdownId = g.selectAll('clippath.kumoclipdown').attr('id');

          });

          describe('And on obtaining the data element', function() {
            it('Then contains a kumo clip down', function() {
              expect(childElements[0].outerHTML)
                .toEqual('<clippath id="' + kumoclipdownId + '" class="kumoclipdown"><path d="M8.723684210526315,0C8.778508771929824,0,8.942982456140351,0,9.052631578947368,0S9.326754385964913,0,9.381578947368421,0L9.381578947368421,59.805C9.326754385964913,59.805,9.162280701754385,59.805,9.052631578947368,59.805S8.778508771929824,59.805,8.723684210526315,59.805Z"></path></clippath>');
            });

            it('Then contains a kumo clip up', function() {
              expect(childElements[1].outerHTML)
                .toEqual('<clippath id="' + kumoclipupId + '" class="kumoclipup"><path d="M8.723684210526315,1C8.778508771929824,1,8.942982456140351,1,9.052631578947368,1S9.326754385964913,1,9.381578947368421,1L9.381578947368421,59.805C9.326754385964913,59.805,9.162280701754385,59.805,9.052631578947368,59.805S8.778508771929824,59.805,8.723684210526315,59.805Z"></path></clippath>');
            });

            it('Then contains a kumo down', function() {
              expect(childElements[2].outerHTML)
                .toEqual('<path class="kumo down" clip-path="url(#' + kumoclipdownId + ')" d="M8.723684210526315,59.805C8.778508771929824,59.805,8.942982456140351,59.805,9.052631578947368,59.805S9.326754385964913,59.805,9.381578947368421,59.805L9.381578947368421,61.6925C9.326754385964913,61.6925,9.162280701754385,61.6925,9.052631578947368,61.6925S8.778508771929824,61.6925,8.723684210526315,61.6925Z"></path>');
            });

            it('Then contains a kumo up', function() {
              expect(childElements[3].outerHTML)
                .toEqual('<path class="kumo up" clip-path="url(#' + kumoclipupId + ')" d="M8.723684210526315,59.805C8.778508771929824,59.805,8.942982456140351,59.805,9.052631578947368,59.805S9.326754385964913,59.805,9.381578947368421,59.805L9.381578947368421,61.6925C9.326754385964913,61.6925,9.162280701754385,61.6925,9.052631578947368,61.6925S8.778508771929824,61.6925,8.723684210526315,61.6925Z"></path>');
            });

            it('Then contains a senkou span b', function() {
              expect(childElements[4].outerHTML)
                .toEqual('<path class="senkouspanb" d="M8.723684210526315,59.805C8.778508771929824,59.805,8.942982456140351,59.805,9.052631578947368,59.805S9.326754385964913,59.805,9.381578947368421,59.805"></path>');
            });

            it('Then contains a senkou span a', function() {
              expect(childElements[5].outerHTML)
                .toEqual('<path class="senkouspana" d="M8.723684210526315,61.6925C8.778508771929824,61.6925,8.942982456140351,61.6925,9.052631578947368,61.6925S9.326754385964913,61.6925,9.381578947368421,61.6925"></path>');
            });

            it('Then contains a chikou span', function() {
              expect(childElements[6].outerHTML)
                .toEqual('<path class="chikouspan" d="M-8.381578947368421,62.88C-8.326754385964913,62.88,-8.162280701754385,62.88,-8.052631578947368,62.88S-7.7785087719298245,62.88,-7.723684210526316,62.88"></path>');
            });

            it('Then contains a kijun sen', function() {
              expect(childElements[7].outerHTML)
                .toEqual('<path class="kijunsen" d="M0.17105263157894737,60.31C0.22587719298245615,60.31,0.39035087719298245,60.31,0.5,60.31S0.7741228070175439,60.31,0.8289473684210527,60.31"></path>');
            });

            it('Then contains a tenkan sen', function() {
              expect(childElements[8].outerHTML)
                .toEqual('<path class="tenkansen" d="M0.17105263157894737,63.075C0.22587719298245615,63.075,0.39035087719298245,63.075,0.5,63.075S0.7741228070175439,63.075,0.8289473684210527,63.075"></path>');
            });
          });
        }
      });
    });
  });
});