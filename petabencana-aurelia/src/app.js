export class App {

  configureRouter(config, router) {
    config.title = 'Petabencana.id';
    config.map([
      {route: 'map',               moduleId: 'routes/map/map'},
      {route: 'map/jakarta',               moduleId: 'routes/map/map'},
      {route: 'map/surabaya',               moduleId: 'routes/map/map'},
      {route: 'map/bandung',               moduleId: 'routes/map/map'},

      {route: 'cards/:id',         moduleId: 'routes/cards/cards'}
    ]);
    this.router = router;
  }
}
