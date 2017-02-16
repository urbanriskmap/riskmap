import {inject} from 'aurelia-framework';
import {ReportCard} from 'resources/report-card';

//start-non-standard
@inject(ReportCard)
//end-non-standard
export class Description {
  constructor(ReportCard) {
    this.reportcard = ReportCard;
    if (/Mobi/.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  clearText() {
    this.reportcard.description.value = null;
  }

  onBlur() {
    if (this.isMobile) {
      this.focussed = false;
      $('#textarea').css({
        'height': 192 + 'px'
      });
    }
  }

  onFocus() {
    if (this.isMobile) {
      this.focussed = true;
      $('#textarea').css({
        'height': 80 + 'px'
      });
    }
  }

  setFocus() {
    $('#textarea').focus();
    this.onFocus();
  }
}
