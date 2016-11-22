//imports

export class Maps {
  configureRouter(config, router) {
    config.title = 'Flood map';
    config.map([
      {route: '',             redirect: 'maps/jakarta'}, //add city variable for redirect based on a get request
      {route: 'jakarta',      moduleId: './jakarta/jakarta'},
      {route: 'surbaya',      moduleId: './surbaya/surbaya'}
    ]);
    this.router = router;
  }
}
