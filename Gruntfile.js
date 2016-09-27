module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      banner: '/*\n' +
        ' TechanJS v<%= pkg.version %>\n' +
        " (c) 2014 - <%= grunt.template.today('yyyy') %> Andre Dumas | https://github.com/andredumas/techan.js\n" +
        '*/',
      dist: 'techan-<%= pkg.version %>',
      dep: {
        d3: 'bower_components/d3/d3.js'
      },
      src: {
        test: {
          common: 'test/spec/common/**/*.js',
          standalone: 'test/spec/standalone/**/*.js'
        }
      }
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
      options: {
        debug: true,
        callback: function(browserify) {
          browserify.external('d3');
          return browserify;
        }
      },
      dev: {
        options: {
          standalone: 'techan'
        },
        src: './src/techan.js',
        dest: '<%= clean.build %>/techan-bundle.js'
      },
      test: {
        src: './test/spec/bundle/**/*.js',
        dest: '<%= clean.build %>/specs-bundle.js'
      }
    },

    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            standalone: 'techan'
          },
          external: ['d3']
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
      config: {
        src: ['Gruntfile.js']
      },
      dev: {
        src: ['src/**/*.js', 'lib/**/*.js', 'test/**/*.js', '<%= filegen.version.dest %>']
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
      config: {
        files: [ 'Gruntfile.js'],
        tasks: ['lint'],
        options: {
          reload: true
        }
      },
      dev: {
        files: ['<%= jshint.dev.src %>', 'examples/**/*'],
        tasks: ['examples', 'dev'],
        options: {
          reload: false,
          livereload: true
        }
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      watch: {
        background: true,
        singleRun: false,
        files: {
          src: ['<%= config.dep.d3 %>', '<%= config.src.test.common %>', '<%= watchify.test.dest %>'] // Single browserify bundle that includes src under test
        }
      },
      test: {
        //background: true,
        files: '<%= karma.watch.files %>'
      },
      dist: {
        files: {
          src: ['<%= config.dep.d3 %>', '<%= config.src.test.common %>', '<%= browserify.dist.dest %>', '<%= config.src.test.standalone %>']
        }
      },
      minify: {
        files: {
          src: ['<%= config.dep.d3 %>', '<%= config.src.test.common %>', '<%= uglify.dist.dest %>', '<%= config.src.test.standalone %>']
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
        updateConfigs: ['pkg'],
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
      server: {
        options: {
          open: 'http://localhost:8000/build/examples/',
          livereload: true
        }
      }
    },

    copy: {
      examples: {
        files: [
          { expand: true, cwd: 'examples', src: ['**', '!**/*.html', '!**/node_modules/**'], dest: '<%= clean.build %>/examples/' }
        ]
      }
    },

    replace: {
      main: {
        options: {
          patterns: [
            { match: /http:\/\/d3js\.org\/d3.*.js/g, replacement: '/bower_components/d3/d3.js' },
            { match: /http:\/\/techanjs\.org\/techan\.min\.js/g, replacement: '/<%= watchify.dev.dest %>' },
            // Append the livereload script to the end of the example files
            { match: /^<\/script>/m, replacement: '</script>\n<script src="//localhost:35729/livereload.js"></script>' }
          ]
        },
        files: [
          { expand: true, cwd: 'examples', src: ['**/*.html', '!**/node_modules/**'], dest: '<%= clean.build %>/examples/' }
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
  grunt.registerTask('serve', ['bower', 'clean', 'filegen:version', 'examples', 'test', 'connect', 'karma:watch:start', 'watch']);
  grunt.registerTask('release:pre', ['bump-only:prerelease', 'default']);
  grunt.registerTask('release:patch', ['bump-only:patch', 'default', 'bump-commit']);
  grunt.registerTask('release:minor', ['bump-only:minor', 'default', 'bump-commit']);
  grunt.registerTask('release:major', ['bump-only:major', 'default', 'bump-commit']);

  grunt.registerTask('default', ['jsonlint', 'bower', 'clean', 'filegen:version', 'test', 'dist', 'minify', 'compress']);
};