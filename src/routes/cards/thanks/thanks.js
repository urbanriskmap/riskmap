import {Reportcard} from 'Reportcard';
import {inject} from 'aurelia-framework';

@inject(Reportcard)

export class Thanks {

  constructor(rc){
    this.reportcard = rc;
  }

  attached() {
    var self = this;
    self.network_name = this.reportcard.network.charAt(0).toUpperCase() + this.reportcard.network.slice(1);
    window.setTimeout(function () {
      window.location.replace('/map');
    }, 3000);
  }
}
