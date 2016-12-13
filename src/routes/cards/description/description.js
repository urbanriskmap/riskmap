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
  }

  clearHint() {
    if (this.textLength === 0) {
      this.text = this.reportcard.description.value;
    }
  }

  checkEntry() {
    if (this.textLength === 0) {
      this.text = this.reportcard.description.hint;
    }
  }

  storeInput() {
    this.reportcard.description.value = this.text; 
    this.textLength = this.reportcard.description.value.length;
  }
}
