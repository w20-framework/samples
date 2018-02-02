/* globals module: true */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jshint: {
          fragment_sample: {
              src: ['material_sample/modules/**/*.js']
          }
      },
      connect: {
        server: {
            options: {
                port: grunt.option('port') || 8888,
                base: '.',
                keepalive: true
            }
        }
      }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint', 'connect']);
};
