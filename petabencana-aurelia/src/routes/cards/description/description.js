import {inject} from 'aurelia-framework';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Description {
  constructor(Reportcard) {
    this.descripText = "Tell us more...";
    this.textLength = 0;
    this.reportcard = Reportcard;
  }
  activate(params, routerConfig) {
    var that = this;
    var reportCardDescription = that.reportcard.getdescription();
    if (reportCardDescription) {
      this.descripText = reportCardDescription;
      this.textLength = this.descripText.length;
    }
  }
  clearHint() {
    if (this.textLength === 0) {
      this.descripText = "";
    }
  }
  charCount() {
    var that = this;
    this.textLength = this.descripText.length; //this.textLength requied to update bound helpers for description.html
    that.reportcard.setdescription(this.descripText);
  }
}
