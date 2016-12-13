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
  @bindable pkey;
  @bindable city;
  //end-non-standard

  attached() {
    if (this.pkey) {
      this.hreftext = "https://twitter.com/intent/tweet?text=Check%20out%20my%20flood%20report%0A&url=http://dev.petabencana.id/%23/map/" + this.city + "/" + this.pkey;
    }
  }
}
