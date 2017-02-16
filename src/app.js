export class App {

  configureRouter(config, router) {
    config.title = 'Petabencana.id';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: ['', 'map', 'map/:city', 'map/:city/'],   name: 'map',  moduleId: 'routes/landing/landing'},
      {route: 'map/:city/:report',                                    moduleId: 'routes/landing/landing'},
      {route: 'cards/:disaster/:id',                                  moduleId: 'routes/cards/cards'}
    ]);
    config.mapUnknownRoutes({moduleId: 'routes/landing/landing'});
    this.router = router;
  }
}
