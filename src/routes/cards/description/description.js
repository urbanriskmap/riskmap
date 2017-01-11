import {inject} from 'aurelia-framework';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Description {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
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
      this.keypadEnabled = false;
      $('#textarea').css({
        'height': 192 + 'px'
      });
    }
  }

  onFocus() {
    if (this.isMobile) {
      this.keypadEnabled = true;
      $('#textarea').css({
        'height': 80 + 'px'
      });
    }
  }
}
