import {inject, bindable, customElement} from 'aurelia-framework';
import {Config} from '../../resources/config';

//start-aurelia-decorators
@customElement('report-info')
@inject(Config)
//end-aurelia-decorators
export class ReportInfo {
  //@bindable attributes do not work with camelCase...
  //start-aurelia-decorators
  @bindable locale;
  @bindable city;
  @bindable height;
  @bindable imageurl;
  @bindable pkey;
  @bindable reportevent;
  @bindable source;
  @bindable text;
  @bindable title;
  @bindable timestamp;
  //end-aurelia-decorators

  constructor(Config) {
    this.config = Config;
    this.app = Config.map.app;
    this.links = {
      qlue: 'https://play.google.com/store/apps/details?id=org.qluein.android&hl=en',
      detik: 'http://pasangmata.detik.com/',
      //start-aurelia-decorators
      grasp: 'javascript:void(0)'
      //end-aurelia-decorators
    };
  }

  get msgText() {
    return this.locale.report_info.share_msg;
  }

  get reportUrl() {
    return this.app + "map/" + this.city + "/" + this.pkey;
  }

  // Tried using recurring getters
  // get height() {
  //   return this.popupcontent.report_data.flood_depth;
  // }
  //
  // get imageurl() {
  //   return this.popupcontent.image_url;
  // }
  //
  // get title() {
  //   return this.popupcontent.title;
  // }
  //
  // get reportevent() {
  //   return this.popupcontent.report_data.report_type;
  // }
  //
  // get source() {
  //   return this.popupcontent.source;
  // }
  //
  // get timestamp() {
  //   return this.popupcontent.timestamp;
  // }

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

  // Databinding engine working as expected,
  // View not picking up bound parameters, after info pane closed.
  bind() {
    console.log('Bind: ' + this.height);
  }

  unbind() {
    console.log(this.height);
  }
}
