var istanbul = require('browserify-istanbul');

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['mocha', 'browserify'],



    // list of files / patterns to load in the browser
    files: [
      'test/mocker.js',
      'test/test.js',
      'js/*.js'
    ],


    // list of files to exclude
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*.js': ['browserify', 'coverage'],
      'js/src/*.js': ['browserify', 'coverage'],
      'js/*.js': ['coverage']
    },

    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: [
      'PhantomJS',

      // Uncomment for easier local development.
      //'Chrome'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    plugins: [
      'karma-mocha',
      'karma-bro',
      'karma-phantomjs-launcher',

      // Also uncomment this for local dev.
      //'karma-chrome-launcher',
      'karma-coverage'
    ],
    browserify: {
      debug: true,
      transform: [istanbul({
        ignore: ['**/node_modules/**', '**/test/**']
      })]
    },
    coverageReporter: {
      type : 'html'
    }
  });
};
