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
        files: ['sass/**/*.scss', 'sass/*.scss'],
        tasks: ['sass', 'cmq', 'postcss', 'cssmin'],
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
