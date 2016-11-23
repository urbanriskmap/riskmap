export class Terms {
  activate(params, routerConfig) {
    this.backLink = routerConfig.navModel.router.routes[5].route;
    this.router = routerConfig.navModel.router;
    console.log(this.backLink);
  }
  goBack() {
    this.router.navigate(this.backLink);
  }
}
