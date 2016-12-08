import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('report-info')
//end-non-standard
export class ReportInfo {
  //@bindable attributes do not work with camelCase...

  //start-non-standard
  @bindable imageurl;
  @bindable height;
  @bindable title;
  @bindable text;

  //end-non-standard
attached(){
  if (this.height) {
    this.heighttext="Water depth: " + this.height + "cm";
  }
}

}
