import {inject} from 'aurelia-framework';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Description {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    var reportCardDescription = this.reportcard.getdescription();
    if (reportCardDescription) {
      this.descripText = reportCardDescription;
      this.textLength = this.descripText.length;
    } else {
      this.descripText = "Tell us more...";
      this.textLength = 0;
    }
  }

  clearHint() {
    if (this.textLength === 0) {
      this.descripText = "";
    }
  }

  charCount() {
    this.textLength = this.descripText.length; //this.textLength required to update bound helpers for description.html
    this.reportcard.setdescription(this.descripText);
  }
}
