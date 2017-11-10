import {inject, bindable, customElement, computedFrom} from 'aurelia-framework';
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
  @bindable popupcontent;
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

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get reportUrl() {
    return this.app + "map/" + this.city + "/" + this.popupcontent.pkey;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get height() {
    if (this.popupcontent.report_data.flood_depth) {
      return this.popupcontent.report_data.flood_depth;
    } else {
      return null;
    }
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get imageurl() {
    return this.popupcontent.image_url;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get fullsizeimg() {
    if (this.popupcontent.image_url) {
      return this.popupcontent.image_url.replace(/(\/[-a-zA-Z0-9]*)(?=\.jpg)/, '/large' + '$1');
    } else {
      return null;
    }
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get title() {
    return this.popupcontent.title;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get reportevent() {
    return this.popupcontent.report_data.report_type;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get source() {
    return this.popupcontent.source;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get timestamp() {
    return this.popupcontent.timestamp;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get text() {
    return this.popupcontent.text;
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
