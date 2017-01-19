import $ from 'jquery';
import {ReportCard} from 'resources/report-card';
import {inject} from 'aurelia-framework';

//start-non-standard
@inject(ReportCard)
//end-non-standard
export class Terms {
  constructor(ReportCard) {
    this.locale = ReportCard.locale;
  }
}
