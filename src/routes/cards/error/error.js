import {ReportCard} from 'resources/report-card';
import {inject} from 'aurelia-framework';

//start-non-standard
@inject(ReportCard)
//end-non-standard
export class Error {
  constructor(ReportCard) {
    this.reportcard = ReportCard;
    this.errorCode = this.reportcard.errors.code;
    this.errorText = this.reportcard.errors.text;
    this.locale = this.reportcard.locale;
  }

  attached() {
    /*
    // Redirect to /map
    window.setTimeout(function () {
      window.location.replace('/map');
    }, 3000);
    */
  }
}
