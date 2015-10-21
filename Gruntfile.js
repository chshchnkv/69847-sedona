'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      style: {
        files: {
          "css/style.css": "sass/style.scss"
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
        src: 'css/*.css'
      }
    },
    
    cmq: {
      style: {
        files: {
          "css/style.css": ["css/style.css"]
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
          "css/style.min.css": ["css/style.css"]
        }
      }
    },
    
    concat: {
      main: {
        src: [
          'node_modules/mustache/mustache.min.js',
          'node_modules/moment/min/moment-with-locales.min.js',
          'js/modals.js',
          'js/send.js',
          'js/spinner.js',
          'js/menu.js'
        ],
        dest: 'js/scripts.js'
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
        files: ['sass/**/*.scss', 'sass/*.scss', 'js/**/*.js', 'js/*.js'],
        tasks: ['sass', 'cmq', 'postcss', 'cssmin', 'concat'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
    
  };

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);
  
//  grunt.loadNpmTasks('grunt-contrib-watch');
};
