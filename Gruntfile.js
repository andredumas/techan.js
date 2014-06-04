module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      banner: '/*\n' +
        ' TechanJS v<%= pkg.version %>\n' +
        " (c) 2014 - <%= grunt.template.today('yyyy') %> André Dumas | https://github.com/andredumas/techan.js\n" +
        '*/'
    },

    clean: {
      dist: ['dist'],
      build: ['build']
    },

    browserify: {
      dev: {
        options: {
          // Thanks https://github.com/amitayd/grunt-browserify-jasmine-node-example/blob/2488181e29b09226f2a87202a851f996820eafb6/Gruntfile.js#L51
          require: grunt.file.expand({filter: 'isFile'}, './src/**/*.js'),
          bundleOptions: {
            debug: true
          }
        },
        src: 'src/techan.js',
        dest: 'build/techan-bundle.js'
      },
      test: {
        options: {
          external: ['src/**/*.js'],
          bundleOptions: {
            debug: true
          }
        },
        src: ['test/spec/**/*.js'],
        dest: 'build/specs-bundle.js'
      },
      dist: {
        options: {
          bundleOptions: {
            standalone: 'techan'
          }
        },
        src: 'src/techan.js',
        dest: 'dist/techan.js'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= config.banner %>',
        linebreak: true
      },
      dist: {
        files: {
          src: '<%= browserify.dist.dest %>'
        }
      }
    },

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
        src: ['src/**/*.js', 'lib/**/*.js', 'Gruntfile.js', 'test/**/*.js']
      },
      dist: {
        src: '<%= browserify.dist.dest %>'
      }
    },

    jscs: {
      options: {
        config: '.jscs.json'
      },
      dev: ['src/**/*.js', 'Gruntfile.js', 'test/**/*.js'],
      dist: 'dist/*.js'
    },

    watch: {
      files: '<%= jshint.dev.src %>',
      tasks: 'dev'
    },

    jasmine: {
      options: {
        specs: '<%= browserify.test.dest %>',
        vendor: ['bower_components/d3/d3.min.js'],
        keepRunner: true,
        outfile: 'build/SpecRunner.html',
        junit: {
          path: 'build/reports/test'
        }
      },
      test: {
        src: '<%= browserify.dev.dest %>'
      }
    },

    uglify: {
      options: {
        banner: '<%= config.banner %>',
        sourceMap: true,
        report: 'min'
      },
      dist: {
        files: {
          'dist/techan.min.js': '<%= browserify.dist.dest %>'
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('lib/grunt');

  grunt.registerTask('lint:dev', ['jshint:dev', 'jscs:dev']);
  grunt.registerTask('lint:dist', ['jshint:dist', 'jscs:dist']);
  grunt.registerTask('dev', ['lint:dev', 'browserify:dev', 'browserify:test', 'test']);
  grunt.registerTask('test', ['jasmine']);

  grunt.registerTask('default', ['bower', 'clean', 'dev', 'browserify:dist', 'usebanner', 'uglify']);
};