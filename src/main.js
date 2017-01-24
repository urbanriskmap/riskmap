import environment from './environment';

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
  .standardConfiguration();

  aurelia.use.plugin('aurelia-google-analytics', config => {
        config.init('UA-46996603-3');
        config.attach({
            logging: {
                enabled: true // Set to `true` to have some log messages appear in the browser console.
            },
            pageTracking: {
                enabled: true // Set to `false` to disable in non-production environments.
            },
            clickTracking: {
                enabled: false // Set to `false` to disable in non-production environments.
            }
    });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(a => a.setRoot());
}
