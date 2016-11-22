export class App {

  configureRouter(config, router) {
    config.title = 'Petabencana.id';
    config.map([
      {route: ['', 'maps'],               moduleId: 'routes/maps/maps'},
      {route: 'cards/:id',                moduleId: 'routes/cards/cards'}
    ]);
    this.router = router;
  }
}
