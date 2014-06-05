techanModule('scale/financetime', function(specBuilder) {
  'use strict';

  var mockInit = function(module) {
    var linear = function() {};
    var ordinal = function() {};

    return module(linear, ordinal);
  };

  var actualInit = function(module) {
    var linear = d3.scale.linear;
    var ordinal = d3.scale.ordinal;

    return module(linear, ordinal);
  };

  specBuilder.require(require('../../../../src/scale/financetime'), function(instanceBuilder) {
    instanceBuilder.instance('mocked', mockInit);
    instanceBuilder.instance('actual', actualInit);
  });
});