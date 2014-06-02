module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            banner:
                '/*\n' +
                ' TechanJS v<%= pkg.version %>\n' +
                " (c) 2014 - <%= grunt.template.today('yyyy') %> André Dumas | https://github.com/andredumas/techan.js\n" +
                '*/'
        },

        clean: {
            dist: ['dist'],
            build: ['build']
        },

        browserify: {
          options: {
            bundleOptions: {
              standalone: 'techan'
            }
          },
          dev: {
            options: {
              bundleOptions: {
                debug: true,
                standalone: '<%= browserify.options.bundleOptions.standalone %>'
              }
            },
            src: 'src/techan.js',
            dest: 'build/techan.js'
          },
          dist: {
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
            dist: {
                src: ['package.json']
            },
            bower: {
                src: ['bower.json']
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
                specs: 'test/spec/**/*Spec.js',
                vendor: ['bower_components/d3/d3.min.js'],
                keepRunner: true,
                outfile : 'build/SpecRunner.html',
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
    grunt.registerTask('dev', ['lint:dev', 'browserify:dev', 'test']);
    grunt.registerTask('test', ['jasmine']);

    grunt.registerTask('default', ['bower', 'clean', 'dev', 'browserify:dist', 'usebanner', 'uglify']);
};