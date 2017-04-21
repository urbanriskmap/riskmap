// An example configuration file.
exports.config = {
  //directConnect: true,

  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  'capabilities': {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_KEY,
    'browserName': 'android',
    'platform': 'ANDROID',
    'device': 'Samsung Galaxy S5',
    'browserstack.local': 'true',
  },

  // Capabilities to be passed to the webdriver instance.
  //capabilities: {
  //  'browserName': 'chrome'
  //},

  // optional: add seleniumServerJar with proper version number
  // seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.53.1.jar',
  specs: ['test/e2e/**/*.js'],

  plugins: [{
    path: './node_modules/aurelia-protractor-plugin'
    //package: 'aurelia-protractor-plugin'
  }],


  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
