import environment from './environment';

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: false,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
  .standardConfiguration();

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(a => a.setRoot());
}
