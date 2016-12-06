export class Error {
  constructor() {
    this.customErrorMsg = "Page not found";
  }
  attached() {
    window.setTimeout(function () {
      window.location.replace('/#/map');
    }, 3000);
  }
}
