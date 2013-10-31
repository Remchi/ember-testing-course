// Karma configuration
// Generated on Thu Oct 31 2013 02:08:02 GMT+0200 (EET)

module.exports = function(config) {
  config.set({
    basePath: 'js',
    frameworks: ['mocha', 'chai'],
    files: [
      "libs/sinon.js",
      "libs/jquery-1.9.1.js",
      "libs/handlebars-1.0.0.js",
      "libs/ember-1.1.2.js",
      "libs/mocha_adapter.js",
      "app.js",
      "mocha_tests.coffee",
      "templates/*.hbs"
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true,

    plugins: [
      "karma-mocha",
      "karma-chai",
      "karma-ember-preprocessor",
      "karma-coffee-preprocessor",
      "karma-phantomjs-launcher"
    ],

    preprocessors: {
      "**/*.hbs": "ember",
      "**/*.coffee": "coffee"
    }
  });
};
