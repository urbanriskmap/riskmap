import {inject, bindable, customElement} from 'aurelia-framework';
import {Config} from '../../resources/config';

//start-non-standard
@customElement('report-info')
@inject(Config)
//end-non-standard
export class ReportInfo {
  //@bindable attributes do not work with camelCase...
  //start-non-standard
  @bindable locale;
  @bindable imageurl;
  @bindable height;
  @bindable reportevent;
  @bindable title;
  @bindable text;
  @bindable pkey;
  @bindable city;
  @bindable timestamp;
  @bindable source;
  //end-non-standard

  constructor(Config) {
    this.app = Config.map.app;
    this.links = {
      qlue: 'https://play.google.com/store/apps/details?id=org.qluein.android&hl=en',
      detik: 'http://pasangmata.detik.com/',
      //start-non-standard
      grasp: 'javascript:void(0)'
      //end-non-standard
    };
  }

  get msgText() {
    return this.locale.report_info.share_msg;
  }

  get reportUrl() {
    return this.app + "map/" + this.city + "/" + this.pkey;
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
        intent: "https://telegram.me/share/url?url=" + self.reportUrl + " &text= " + self.msgText
      },
      {
        name: "whatsapp",
        intent: "https://api.whatsapp.com/send?text=" + self.msgText + "%20" + self.reportUrl
      },
      {
        name: "facebook",
        intent: "http://www.facebook.com/sharer/sharer.php?u=" + self.reportUrl
      }
    ];
  }
}
