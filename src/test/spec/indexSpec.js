describe('Given I have index', function() {
  'use strict';

  describe('When I load the page', function() {
    it('Then loads without error', function() {
      expect(techanSite.bigchart).toBeDefined();
    });
  });
});