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

        concat: {
            options: {
                // TODO Strip comments
                banner: '<%= config.banner %>\n'
            },
            dist: {
                src: ['src/intro.js', 'src/*/*.js', 'src/outro.js'],
                dest: 'dist/techan.js'
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
            dev: {
                src: ['src/**/*.js', 'lib/**/*.js', 'Gruntfile.js', 'test/**/*.js']
            },
            dist: {
                src: '<%= concat.dist.dest %>'
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
                src: '<%= concat.dist.dest %>'
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
                    'dist/techan.min.js': '<%= concat.dist.dest %>'
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('lib/grunt');

    grunt.registerTask('lint:dev', ['jshint:dev', 'jscs:dev']);
    grunt.registerTask('lint:dist', ['jshint:dist', 'jscs:dist']);
    grunt.registerTask('dev', ['lint:dev', 'concat', 'lint:dist', 'test']);
    grunt.registerTask('test', ['jasmine']);

    grunt.registerTask('default', ['bower', 'clean', 'dev', 'uglify']);
};