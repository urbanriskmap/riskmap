import {bindable, customElement} from 'aurelia-framework';

var messageText;

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
      this.twitterText = "https://twitter.com/intent/tweet?text=" + messageText + "%20https://dev.petabencana.id/map/" + this.city + "/" + this.pkey;
      this.whatsappText = messageText + "https://dev.petabencana.id/map/" + this.city + "/" + this.pkey;
      this.facebookText = "https://www.facebook.com/dialog/share?app_id=637960346329078&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdev.petabencana.id%2Fmap%2F" + this.city + "%2F" + this.pkey;
    }
  }
}
