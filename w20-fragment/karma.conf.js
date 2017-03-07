/* globals module: true */
module.exports = function (config) {
    'use strict';

    config.set({
        frameworks: ['jasmine', 'requirejs', 'phantomjs-shim'],
        files: [
            'test-main.js',
            {pattern: 'fragment_sample/**', included: false},
            {pattern: 'bower_components/**/*', included: false}
        ],
        preprocessors: {
            'modules/*.js': 'coverage'
        },
        reporters: ['dots', 'coverage'],
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/',
            subdir: '.'
        },
        port: 9876,
        colors: true,
        logLevel: 'INFO',
        browsers: ['PhantomJS']
    });
};