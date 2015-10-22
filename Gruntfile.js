'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      style: {
        files: {
          "build/css/style.css": "src/sass/style.scss"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/*.css'
      }
    },
    
    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      target: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    
    concat: {
      main: {
        src: [
          'node_modules/mustache/mustache.min.js',
          'node_modules/moment/min/moment-with-locales.min.js',
          'src/js/menu.js',
          'src/js/modals.js',
          'src/js/send.js',
          'src/js/spinner.js'
        ],
        dest: 'build/js/scripts.js'
      }
    },
    
    uglify: {
      main: {
        files: {
          'build/js/scripts.min.js': ['build/js/scripts.js']
        }
      }
    },
    
    clean: {
      build: ["build"]
    },
    
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "font/**",
            "img/**",
            "*.html"
          ],
          dest: "build"
        }]
      }
    },
    
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }] 
      }
    },
    
    watch: {
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
      },
      
      options: {
        livereload: true,
      },

      style: {
        files: ['src/sass/**/*.scss', 'src/sass/*.scss', 'src/js/**/*.js', 'js/*.js', 'src/*.html'],
        tasks: ['clean', 'copy', 'sass', 'cmq', 'postcss', 'cssmin', 'imagemin', 'concat','uglify'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
    
  };
  
  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "cmq",
    "postcss",
    "cssmin",
    "imagemin",
    "concat",
    "uglify"
  ]);

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);
  
//  grunt.loadNpmTasks('grunt-contrib-watch');
};
