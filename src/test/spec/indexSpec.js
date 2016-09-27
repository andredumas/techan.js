(function(document, d3) {
  'use strict';

  describe('Given I have access to the bigchart', function() {
    it('Then it is defined', function() {
      expect(techanSite.bigchart).toBeDefined();
    });

    describe('When rendered on a selection', function() {
      var div;

      beforeEach(function() {
        // Attach to body with height and width
        d3.select('body').selectAll('div.chart-test-spec').remove();
        div = d3.select('body').append('div').classed('chart-test-spec', true).attr('width', '1000px').attr('height', '500px');
        techanSite.bigchart(div);
      });

      it('Then the selection contains the svg', function() {
        expect(div.node().innerHTML).toContain('svg');
      });

      it('Then the selection does not have error', function() {
        expect(div.node().innerHTML).not.toContain('NaN');
        expect(div.node().innerHTML).not.toContain('null');
        expect(div.node().innerHTML).not.toContain('undefined');
      });

      describe('When resized on the same selection', function() {
        beforeEach(function() {
          techanSite.bigchart.resize(div);
        });

        it('Then the selection contains the svg', function() {
          expect(div.node().innerHTML).toContain('svg');
        });

        it('Then the selection does not have error', function() {
          expect(div.node().innerHTML).not.toContain('NaN');
          expect(div.node().innerHTML).not.toContain('null');
          expect(div.node().innerHTML).not.toContain('undefined');
        });
      });
    });
  });
})(document, d3);
