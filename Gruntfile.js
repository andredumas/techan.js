module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      banner: '/*\n' +
        ' TechanJS v<%= pkg.version %>\n' +
        " (c) 2014 - <%= grunt.template.today('yyyy') %> Andre Dumas | https://github.com/andredumas/techan.js\n" +
        '*/',
      dist: 'techan-<%= pkg.version %>'
    },

    clean: {
      dist: 'dist',
      build: 'build'
    },

    filegen: {
      version: {
        options: {
          content: "'use strict';module.exports='<%= pkg.version %>';"
        },
        dest: '<%= clean.build %>/version.js'
      }
    },

    watchify: {
      dev: {
        options: {
          // Thanks https://github.com/amitayd/grunt-browserify-jasmine-node-example/blob/2488181e29b09226f2a87202a851f996820eafb6/Gruntfile.js#L51
          //require: grunt.file.expand({filter: 'isFile'}, './src/**/*.js', './<%= filegen.version.dest %>'),
          bundleOptions: {
            debug: true,
            standalone: 'techan'
          }
        },
        src: './src/techan.js',
        dest: '<%= clean.build %>/techan-bundle.js'
      },
      test: {
        options: {
          //external: ['src/**/*.js'], // Put this back in to NOT include source in test bundle.
          bundleOptions: {
            debug: true
          }
        },
        src: './test/spec/bundle/**/*.js',
        dest: '<%= clean.build %>/specs-bundle.js'
      }
    },

    browserify: {
      dist: {
        options: {
          bundleOptions: {
            standalone: 'techan'
          }
        },
        src: './src/techan.js',
        dest: '<%= clean.dist %>/techan.js'
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
        src: 'bower.json'
      },
      dist: {
        src: 'package.json'
      }
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      dev: {
        src: ['src/**/*.js', 'lib/**/*.js', 'Gruntfile.js', 'test/**/*.js', '<%= filegen.version.dest %>']
      }
    },

    jscs: {
      options: {
        config: '.jscs.json'
      },
      dev: {
        src: ['src/**/*.js', 'Gruntfile.js', 'test/**/*.js', '<%= filegen.version.dest %>']
      }
    },

    watch: {
      files: ['<%= jshint.dev.src %>', 'examples/**'],
      tasks: ['examples', 'dev']
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        files: ['bower_components/d3/d3.js', 'test/spec/common/**/*.js']
      },
      watch: {
        background: true,
        singleRun: false,
        options: {
          files: ['<%= karma.options.files %>', '<%= watchify.test.dest %>'] // Single browserify bundle that includes src under test
        }
      },
      test: {
        //background: true,
        options: {
          files: ['<%= karma.options.files %>', '<%= watchify.test.dest %>'] // Single browserify bundle that includes src under test
        }
      },
      dist: {
        options: {
          files: ['<%= karma.options.files %>', '<%= browserify.dist.dest %>', 'test/spec/standalone/**/*.js']
        }
      },
      minify: {
        options: {
          files: ['<%= karma.options.files %>', '<%= uglify.dist.dest %>', 'test/spec/standalone/**/*.js']
        }
      }
    },

    uglify: {
      options: {
        banner: '<%= config.banner %>',
        sourceMap: true,
        report: 'min'
      },
      dist: {
        src: '<%= browserify.dist.dest %>',
        dest: '<%= clean.dist %>/techan.min.js'
      }
    },

    compress: {
      dist: {
        options: {
          archive: '<%= clean.dist %>/techan.zip'
        },
        expand: true,
        cwd: '<%= clean.dist %>',
        src: ['*.js*'],
        dest: '<%= config.dist %>'
      }
    },

    bump: {
      options: {
        commit: true,
        commitMessage: 'Release %VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: '%VERSION%',
        push: false
      }
    },

    connect: {
      server: {}
    },

    copy: {
      examples: {
        files: [
          { expand: true, cwd: 'examples', src: ['**', '!**/*.html'], dest: '<%= clean.build %>/examples/' }
        ]
      }
    },

    replace: {
      main: {
        options: {
          patterns: [
            { match: /http:\/\/d3js\.org\/d3\.v3\.min\.js/g, replacement: '/bower_components/d3/d3.js' },
            { match: /http:\/\/techanjs\.org\/techan\.min\.js/g, replacement: '/<%= watchify.dev.dest %>' }
          ]
        },
        files: [
          { expand: true, cwd: 'examples', src: '**/*.html', dest: '<%= clean.build %>/examples/' }
        ]
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('lib/grunt');

  grunt.registerTask('lint', ['newer:jshint', 'newer:jscs']);
  grunt.registerTask('dev', ['lint', 'watchify:dev', 'watchify:test', 'karma:watch:run']);
  grunt.registerTask('test', ['lint', 'watchify:dev', 'watchify:test', 'karma:test']);
  grunt.registerTask('examples', ['newer:replace', 'newer:copy']);
  grunt.registerTask('dist', ['browserify:dist', 'usebanner', 'karma:dist']);
  grunt.registerTask('minify', ['uglify', 'karma:minify']);
  grunt.registerTask('serve', ['clean', 'filegen:version', 'examples', 'test', 'connect', 'karma:watch:start', 'watch']);
  grunt.registerTask('release:pre', ['bump-only:prerelease', 'default']);
  grunt.registerTask('release:minor', ['bump-only:minor', 'default', 'bump-commit']);
  grunt.registerTask('release:major', ['bump-only:major', 'default', 'bump-commit']);

  grunt.registerTask('default', ['jsonlint', 'bower', 'clean', 'filegen:version', 'test', 'dist', 'minify', 'compress']);
};