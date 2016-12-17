import environment from './environment';
import {I18N} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
  .standardConfiguration()
  .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.use.plugin('aurelia-i18n', (instance) => {
    instance.i18next.use(Backend);
    return instance.setup({
      backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json'
      },
      lng : 'id',
      attributes : ['t','i18n'],
      fallbackLng : 'en',
      debug : true
    });
  });

  aurelia.start().then(a => a.setRoot());
}
