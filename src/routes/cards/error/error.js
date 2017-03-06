import {inject} from 'aurelia-framework';
import {ReportCard} from 'resources/report-card';

//start-non-standard
@inject(ReportCard)
//end-non-standard
export class Error {
  constructor(ReportCard) {
    this.reportcard = ReportCard;
  }

  activate(params, routerConfig) {
    this.errorCode = routerConfig.settings.errorCode;
    this.errorText = routerConfig.settings.errorText;
  }
}
