import $ from 'jquery';
import {ReportCard} from 'resources/report-card';
import {inject} from 'aurelia-framework';

//start-non-standard
@inject(ReportCard)
//end-non-standard
export class Terms {
  constructor(ReportCard) {
    this.reportcard = ReportCard;
    this.tab = 'u_a';
  }

  switchTab(tabName) {
    $('.tabs').removeClass('active');
    $('#tab-' + tabName).addClass('active');
    this.tab = tabName;
  }

  attached() {
    this.switchTab('u_a');
  }
}
