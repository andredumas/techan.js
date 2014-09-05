var bower = require('bower');

module.exports = function(grunt) {
  'use strict';

  // Thanks AngularJS https://github.com/angular/angular.js/blob/v1.2.16/lib/grunt/plugins.js#L66
  grunt.registerTask('bower', 'Install Bower packages.', function() {
    var done = this.async();

    bower.commands.install()
      .on('log', function (result) {
        grunt.log.ok('bower: ' + result.id + ' ' + result.data.endpoint.name);
      })
      .on('error', grunt.fail.warn.bind(grunt.fail))
      .on('end', done);
  });
};