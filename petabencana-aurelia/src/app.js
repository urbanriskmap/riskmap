/* jshint esversion: 6 */

export class App {

  configureRouter(config, router) {
    config.title = 'Petabencana.id';
    config.map([
      {route: '',                         moduleId: 'routes/map/landing',   title: 'Home'},
      {route: 'jakarta',                  moduleId: 'routes/map/jakarta',   title: 'Jakarta'},
      {route: 'surbaya',                  moduleId: 'routes/map/surbaya',   title: 'Surbaya'},
      {route: 'bandung',                  moduleId: 'routes/map/bandung',   title: 'Bandung'},
      {route: 'cards/:id',                moduleId: 'routes/cards/cards'}
    ]);

    this.router = router;
  }
}
