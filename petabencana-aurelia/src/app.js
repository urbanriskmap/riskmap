export class App {

  configureRouter(config, router) {
    config.title = 'Petabencana.id';
    
    config.map([
      {route: 'map',               moduleId: 'routes/map/map'},
      {route: 'map/:city',         moduleId: 'routes/map/map'},
      {route: 'cards/:id',         moduleId: 'routes/cards/cards'}
    ]);
    this.router = router;
  }
}
