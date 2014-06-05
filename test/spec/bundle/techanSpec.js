describe('Given I have the module "techan" available', function() {
  'use strict';

  describe('When I require() it',
    techanSpec(require('../../../src/techan.js')));
});