import {Reportcard} from 'Reportcard';
import {inject} from 'aurelia-framework';

@inject(Reportcard)

export class Thanks {

  constructor(rc){
    this.reportcard = rc;
  }

  attached() {
    var self = this;
    console.log(self.reportcard.network);
    window.setTimeout(function () {
      window.location.replace('/map');
    }, 3000);
  }
}
