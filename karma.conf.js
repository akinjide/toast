// Karma configuration
// Generated on Fri Sep 22 2017 17:57:50 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['qunit'],

    files: [
      'node_modules/qunitjs/qunit/qunit.js',
      'node_modules/jquery/dist/jquery.min.js',
      'build/toast.css',
      'toast.js',
      'tests/unit/qunit-helper.js',
      'tests/unit/toast-test.js',
      'tests/unit/x.js'
    ],

    exclude: [],

    preprocessors: {
      'toast.js': 'coverage'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'lcov',
      dir: 'tests/coverage'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: true
  })
}
