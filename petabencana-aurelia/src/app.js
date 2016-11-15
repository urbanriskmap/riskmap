/* jshint esversion: 6 */

export class App {

  configureRouter(config, router) {
    config.title = 'Petabencana.id';
    config.map([
      {route: '',                         moduleId: 'routes/map/landing',   title: 'Home'},
      /*{route: 'jakarta',                moduleId: 'routes/map/jakarta',   title: 'PetaBencana Jakarta',    name: 'jakarta'},
      {route: 'jakarta',                  moduleId: 'routes/map/surbaya',   title: 'PetaBencana Surbaya',    name: 'surbaya'},
      {route: 'jakarta',                  moduleId: 'routes/map/bandung',   title: 'PetaBencana Bandung',    name: 'bandung'},*/
      {route: 'cards/:id',                moduleId: 'routes/cards/cards'}
    ]);

    this.router = router;
  }
}
