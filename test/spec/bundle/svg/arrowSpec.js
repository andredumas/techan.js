techanModule('svg/arrow', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan');

  var actualInit = function(module) {
    return techan.svg.arrow;
  };

  specBuilder.require(require('../../../../src/svg/arrow'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      var arrow;

      beforeEach(function() {
        arrow = scope.arrow;
      });

      it('And arrow must be defined', function() {
        expect(arrow).toBeDefined();
      });

      describe('And kept at defaults', function() {
        it('Then must draw an arrow with defaults', function() {
          expect(arrow(0)).toEqual('M 0 0 l -6 7.5 l 4 0 l 0 7.5 l 4 0 l 0 -7.5 l 4 0 z');
        });
      });

      describe('And tail disabled', function() {
        beforeEach(function() {
          arrow.tail(false);
        });

        it('Then must draw an arrow with defaults', function() {
          expect(arrow(0)).toEqual('M 0 0 l -6 15 l 4 0 l 4 0 l 4 0 z');
        });
      });

      describe('And arient is down', function() {
        beforeEach(function() {
          arrow.orient('down');
        });

        it('Then must draw an arrow with defaults', function() {
          expect(arrow(0)).toEqual('M 0 0 l -6 -7.5 l 4 0 l 0 -7.5 l 4 0 l 0 7.5 l 4 0 z');
        });
      });

      describe('And orient is left', function() {
        beforeEach(function() {
          arrow.orient('left');
        });

        it('Then must draw an arrow with defaults', function() {
          expect(arrow(0)).toEqual('M 0 0 l 7.5 -6 l 0 4 l 7.5 0 l 0 4 l -7.5 0 l 0 4 z');
        });
      });

      describe('And orient is right', function() {
        beforeEach(function() {
          arrow.orient('right');
        });

        it('Then must draw an arrow with defaults', function() {
          expect(arrow(0)).toEqual('M 0 0 l -7.5 -6 l 0 4 l -7.5 0 l 0 4 l 7.5 0 l 0 4 z');
        });
      });

      describe('And x, y, width, height adjusted', function() {
        beforeEach(function() {
          arrow.x(10).y(20).height(100).width(50);
        });

        it('Then must draw an arrow with defaults', function() {
          expect(arrow(0)).toEqual('M 10 20 l -25 50 l 16.666666666666668 0 l 0 50 l 16.666666666666668 0 l 0 -50 l 16.666666666666668 0 z');
        });
      });
    });
  });
});