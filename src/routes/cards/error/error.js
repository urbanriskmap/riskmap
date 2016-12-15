export class Error {
  activate(params, routerConfig) {
    this.errorCode = routerConfig.settings.errorCode;
    this.errorText = routerConfig.settings.errorText;
  }
  attached() {
    /*window.setTimeout(function () {
      window.location.replace('/map');
    }, 3000);*/
  }
}
