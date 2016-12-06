export class App {

  configureRouter(config, router) {
    config.title = 'Petabencana.id';
    config.map([
      {route: ['', 'map', 'map/:city'],   moduleId: 'routes/map/map'},
      {route: 'cards/:id',                moduleId: 'routes/cards/cards'}
    ]);
    config.mapUnknownRoutes({redirect: '#/map'});
    this.router = router;

  }
}
