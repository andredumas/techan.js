function techanSpec(techan) {
  'use strict';

  return function() {
    it('Then techan should be defined', function () {
      expect(techan).toBeDefined();
    });

    it('Then techan.version should be defined', function () {
      expect(techan.version).toBeDefined();
    });

    it('Then techan.analysis should be defined', function () {
      expect(techan.analysis).toBeDefined();
    });

    it('Then techan.analysis.supstance should be defined', function () {
      expect(techan.analysis.supstance).toBeDefined();
    });

    it('Then techan.plot should be defined', function () {
      expect(techan.plot).toBeDefined();
    });

    it('Then techan.plot.candlestick should be defined', function () {
      expect(techan.plot.candlestick).toBeDefined();
    });

    it('Then techan.scale should be defined', function () {
      expect(techan.scale).toBeDefined();
    });

    it('Then techan.scale.financetime should be defined', function () {
      expect(techan.scale.financetime).toBeDefined();
    });

    it('Then techan.undefinedControl should be undefined', function() {
      expect(techan.undefinedControl).not.toBeDefined();
    });
  };
}