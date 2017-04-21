import $ from 'jquery';
import {ReportCard} from 'resources/report-card';
import {inject} from 'aurelia-framework';

//start-non-standard
@inject(ReportCard)
//end-non-standard
export class Terms {
  constructor(ReportCard) {
    this.reportcard = ReportCard;
    this.contents = ['user_agreement', 'privacy_policy'];
    this.tab = 'user_agreement';
  }

  switchTab(tabName) {
    $('.tabs').removeClass('active');
    $('#tab-' + tabName).addClass('active');
    this.tab = tabName;
  }

  attached() {
    $('#tab-user_agreement').addClass('active');
  }
}
