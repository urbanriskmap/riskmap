import {bindable, customElement} from 'aurelia-framework';
import env from '../../environment';

var messageText = "Laporan banjir pada petabencana.id";

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
      this.twitterText = "https://twitter.com/intent/tweet?text=" + messageText + "%20"+ env.app + "map/" + this.city + "/" + this.pkey;
      this.whatsappText = "whatsapp://send?text=" + messageText + "%20" + env.app + "map/" + this.city + "/" + this.pkey;
      this.facebookText = "http://www.facebook.com/sharer/sharer.php?u=" + env.app + "map/" + this.city + "/" + this.pkey;
    }
  }
}
