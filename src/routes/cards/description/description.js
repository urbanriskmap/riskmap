import {inject} from 'aurelia-framework';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Description {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    if (this.reportcard.description.value) {
      this.textLength = this.reportcard.description.value.length;
      this.text = this.reportcard.description.value;
    } else {
      this.textLength = 0;
      this.text = this.reportcard.description.hint;
    }
    if (/Mobi/.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  clearText() {
    this.textLength = 0;
    this.text = this.reportcard.description.hint;
    this.reportcard.description.value = null;
  }

  onBlur() {
    if (this.textLength === 0) {
      this.text = this.reportcard.description.hint;
    }
    if (this.isMobile) {
      this.keypadEnabled = false;
      $('#textarea').css({
        'height': 192 + 'px'
      });
    }
  }

  storeInput() {
    this.reportcard.description.value = this.text;
    this.textLength = this.reportcard.description.value.length;
  }

  onFocus() {
    if (this.textLength === 0) {
      this.text = this.reportcard.description.value;
    }
    if (this.isMobile) {
      this.keypadEnabled = true;
      $('#textarea').css({
        'height': 80 + 'px'
      });
    }
  }
}
