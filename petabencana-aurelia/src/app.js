import {I18N} from 'aurelia-i18n';
import {WebAPI} from './api/web-api';

export class App {
  static inject() { return [I18N, WebAPI]; }

  constructor(i18n, api) {
    this.api = api;
    this.i18n = i18n;
    console.log(this.i18n.getLocale());
  }

  configureRouter(config, router){
    config.title = 'Contacts';
    config.map([
      { route: '',              moduleId: 'routes/home/home',               title: 'Home'},
      { route: 'map',           moduleId: 'routes/map/map',                 title: 'Map'},
      { route: 'cards',         moduleId: 'routes/cards/card',              title: 'Card'},
      { route: 'cards/:id',     moduleId: 'routes/cards/card',              title: 'Card'},
      { route: 'login',         moduleId: 'routes/account/login',           title: 'Login'},
      { route: 'contacts',      moduleId: 'routes/contacts/no-selection',   title: 'Select'},
      { route: 'contacts/:id',  moduleId: 'routes/contacts/contact-detail', name:'contacts' },
      { route: 'test',          moduleId: 'routes/test/test',               title: 'Test' }
    ]);

    this.router = router;
  }
}
