import {Config} from 'resources/config';
import {inject} from 'aurelia-framework';

//start-aurelia-decorators
@inject(Config)
//end-aurelia-decorators
export class App {
  constructor(Config) {
    this.config = Config;
  }

  configureRouter(config, router) {
    config.title = this.config.title;
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: ['', 'map', 'map/:city', 'map/:city/:report'],   name: 'map',  moduleId: 'routes/landing/landing'}
    ]);
    config.mapUnknownRoutes({moduleId: 'routes/landing/landing'});
    this.router = router;
  }
}
