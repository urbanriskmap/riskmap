export class Card {
  constructor() {
    this.title = "Card Page";
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    this.id = params.id;
  }
}
