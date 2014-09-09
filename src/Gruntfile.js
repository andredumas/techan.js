module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jsonlint: {
      bower: {
        src: ['bower.json']
      },
      dist: {
        src: ['package.json']
      }
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      dev: {
        src: ['js/**/*.js', 'lib/**/*.js', 'Gruntfile.js', 'test/spec/**/*.js']
      }
    },

    jscs: {
      options: {
        config: '.jscs.json'
      },
      dev: ['js/**/*.js', 'Gruntfile.js', 'test/spec/**/*.js']
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! TechanJS Site */' + grunt.util.linefeed + grunt.util.linefeed,
        separator: grunt.util.linefeed + grunt.util.linefeed
      },
      dev: {
        src: ['js/**/*.js'],
        dest: 'build/dev.js'
      },
      dep: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/d3/d3.min.js'
        ],
        dest: 'dist/dependencies.js'
      },
      dist: {
        src: [
          'bower_components/techanjs/dist/techan.min.js',
          '<%= uglify.dist.dest %>'
        ],
        dest: 'dist/site.js'
      }
    },

    watch: {
      files: '<%= jshint.dev.src %>',
      tasks: ['dev', 'deploy']
    },

    jasmine: {
      options: {
        vendor: ['bower_components/d3/d3.js', 'bower_components/techanjs/dist/techan.js'],
        keepRunner: true
      },
      dest: {
        options: {
          specs: 'test/spec/**/*.js',
          outfile: 'build/specRunner.html'
        },
        src: '<%= uglify.dist.dest %>'
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        report: 'min'
      },
      dist: {
        src: '<%= concat.dev.dest %>',
        dest: 'build/dev.min.js'
      }
    },

    copy: {
      deploy: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              '<%= concat.dep.dest %>',
              '<%= concat.dist.dest %>'
            ],
            dest: '../js/'
          },
          {
            expand: true,
            flatten: true,
            src: 'bower_components/techanjs/dist/*',
            dest: '../'
          }
          // TODO Copy css
        ]
      }
    },

    connect: {
      server: {
        options: {
          base: '../'
        }
      }
    }

  });

  // TODO CSS: Combination, Minifaction

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('lib/grunt');

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('dev', ['lint', 'concat:dev', 'uglify', 'concat:dist', 'jasmine']);
  grunt.registerTask('deploy', ['copy:deploy']);
  grunt.registerTask('serve', ['connect', 'watch']);

  grunt.registerTask('default', ['jsonlint', 'bower', 'concat:dep', 'dev', 'deploy']);
};