import {bindable, customElement} from 'aurelia-framework';
import env from '../../environment';

//start-non-standard
@customElement('report-info')
//end-non-standard
export class ReportInfo {
  //@bindable attributes do not work with camelCase...
  //start-non-standard
  @bindable locale;
  @bindable imageurl;
  @bindable height;
  @bindable title;
  @bindable text;
  @bindable pkey;
  @bindable city;
  @bindable timestamp;
  //end-non-standard

  get msgText() {
    return this.locale.share_msg;
  }

  get reportUrl() {
    return env.app + "map/" + this.city + "/" + this.pkey;
  }

  attached() {
    var self = this;
    self.shareButtons = [ // Name string should match fontello icons name
      {
        name: "twitter",
        intent: "https://twitter.com/intent/tweet?text=" + self.msgText + "%20" + self.reportUrl
      },
      {
        name: "telegram",
        intent: "https://telegram.me/share/url?url={" + self.reportUrl + "}&text={" + self.msgText + "}"
      },
      {
        name: "whatsapp",
        intent: "whatsapp://send?text=" + self.msgText + "%20" + self.reportUrl
      },
      {
        name: "facebook",
        intent: "http://www.facebook.com/sharer/sharer.php?u=" + self.reportUrl
      }
    ];
  }
}
