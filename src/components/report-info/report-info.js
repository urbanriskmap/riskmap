import {bindable, customElement} from 'aurelia-framework';
import env from '../../environment';

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
  @bindable timestamp;
  //end-non-standard

  constructor() {
    this.msgText = "Laporan banjir pada petabencana.id";
  }

  attached() {
    var self = this;
    self.shareButtons = [
      {
        name: "twitter",
        intent: "https://twitter.com/intent/tweet?text=" + self.msgText + "%20"+ env.app + "map/" + self.city + "/" + self.pkey
      },
      {
        name: "telegram",
        intent: "https://telegram.me/share/url?url={" + env.app + "map/" + self.city + "/" + self.pkey + "}&text={" + self.msgText + "}"
      },
      {
        name: "whatsapp",
        intent: "whatsapp://send?text=" + self.msgText + "%20" + env.app + "map/" + self.city + "/" + self.pkey
      },
      {
        name: "facebook",
        intent: "http://www.facebook.com/sharer/sharer.php?u=" + env.app + "map/" + self.city + "/" + self.pkey
      }
    ];
  }
}
