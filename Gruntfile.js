module.exports = function(grunt) {
 
// Project config
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  // Variables
  scssPath:       'style/',
  scssFile:       '<%= scssPath %><%= pkg.name %>.scss',
  scssIncludes:   '<%= scssPath %>**/*.scss',
  jsPath:         'js/',
  jsFiles:        '<%= jsPath %>**/*.js',
  distPath:       'dist/',
  distCSSFile:    '<%= distPath %><%= pkg.name %>.css',
  distCSSMinFile: '<%= distPath %><%= pkg.name %>.min.css',
  distJSFile:     '<%= distPath %><%= pkg.name %>.js',
  distJSMinFile:  '<%= distPath %><%= pkg.name %>.min.js',
  distJSMapFile:  '<%= distPath %><%= pkg.name %>.min.map',
  // Minify CSS - https://github.com/gruntjs/grunt-contrib-cssmin
  cssmin: {
    options: {
      banner: '/*! <%= pkg.name %>.min.css, v<%= pkg.version %>, minified <%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    target: {
      files: {
        '<%= distCSSMinFile %>': ['<%= distCSSFile %>']
      }
    }
  },
  // Compile Sass to CSS - https://github.com/sindresorhus/grunt-sass
  sass: {
    options: {
      sourceMap: true
    },
    target: {
      files: {
        '<%= distCSSFile %>': '<%= scssFile %>' 
      }
    }
  },
  // Minify JS - https://github.com/gruntjs/grunt-contrib-uglify
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %>.min.js, v<%= pkg.version %>, minified <%= grunt.template.today("yyyy-mm-dd") %> */',
      sourceMap: true
    },
    min: {
      files: {
          '<%= distJSMinFile %>': [ '<%= jsFiles %>' ]
      }
    }
  },
  // Run a local web server - https://github.com/gruntjs/grunt-contrib-connect
  connect: {
    server: {
      options: {
        port: 9001,
        keepalive: true,
        base: './',
        hostname: '*',
        open: {
          target: 'http://localhost:9001/'
        }
      }
    }
  },
  // Watch for changes in CSS/JS files - https://github.com/gruntjs/grunt-contrib-watch
  watch: {
    scss: {
      files: ['<%= scssFile %>', '<%= scssIncludes %>'],
      tasks: ['sass', 'cssmin']
    },
    scripts: {
      files: ['<%= jsFiles %>'],
      tasks: ['uglify']
    }
  }
});
 
// Load plugins
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-sass');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');
 
// Register tasks
grunt.registerTask('default', ['serve']);
grunt.registerTask('dev', ['sass', 'cssmin', 'uglify', 'watch']);
grunt.registerTask('serve', ['connect:default']);
 
};