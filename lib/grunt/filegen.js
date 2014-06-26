module.exports = function(grunt) {
  'use strict';

  // Thanks AngularJS https://github.com/angular/angular.js/blob/v1.2.16/lib/grunt/plugins.js#L66
  grunt.registerMultiTask('filegen', 'Create a file with contents', function() {
    var content = this.options().content;

    this.files.forEach(function(file) {
      grunt.log.ok('File: ' + file.dest);
      grunt.file.write(file.dest, content);
    });
  });
};