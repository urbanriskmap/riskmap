export class App {

  configureRouter(config, router) {
    config.title = 'Petabencana.id';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: ['', 'map', 'map/:city', 'map/:city/'],   name: 'map', moduleId: 'routes/map/map'},
      {route: 'map/:city/:report',   moduleId: 'routes/map/map'},
      {route: 'cards/:id',                                     moduleId: 'routes/cards/cards'}
    ]);
    config.mapUnknownRoutes({moduleId: 'routes/map/map'});
    this.router = router;

  }
}
