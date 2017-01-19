import {ReportCard} from 'resources/report-card';
import {inject} from 'aurelia-framework';

//start-non-standard
@inject(ReportCard)
//end-non-standard
export class Thanks {
  constructor(ReportCard) {
    this.reportcard = ReportCard;
  }

  attached() {
    var self = this;
    self.network_name = this.reportcard.network.charAt(0).toUpperCase() + this.reportcard.network.slice(1);
    window.setTimeout(function () {
      window.location.replace('/map');
    }, 3000);
  }
}
