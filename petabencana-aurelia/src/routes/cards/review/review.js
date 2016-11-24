export class Depth {
  activate(params, routerConfig) {
    this.termsLink = routerConfig.navModel.router.routes[6].route;
    this.router = routerConfig.navModel.router;
  }
  readTerms() {
    this.router.navigate(this.termsLink);
  }
}

//window.location.replace('maps');
