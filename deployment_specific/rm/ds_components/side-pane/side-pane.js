import {bindable, customElement, inject} from 'aurelia-framework';
import $ from 'jquery';
import {Config} from 'resources/config';
import {LocaleLocal} from 'resources/locales/local_lang';

//start-aurelia-decorators
@customElement('side-pane')
@inject(LocaleLocal, Config)
//end-aurelia-decorators
export class SidePane {
  //@bindable attributes do not work with camelCase...
  //start-aurelia-decorators
  @bindable cities;
  @bindable selcity;
  @bindable changeCity;
  @bindable closePane;
  @bindable reportId;
  @bindable querylanguage;
  //end-aurelia-decorators

  constructor(LocaleLocal, Config) {
    this.config = Config;
    this.languages = this.config.supported_languages;

    this.lang_obj = {};
    for (let lang of this.languages) {
      if (LocaleLocal.languages.hasOwnProperty(lang.key)) {
        this.lang_obj[lang.key] = LocaleLocal.languages[lang.key];
      }
    }
    this.locale = {};

    this.seltab = "map"; //default tab to open
    this.tabList = ["report", "map", "info"]; //elements match names of fontello icons
    this.vidWrapperOpened = false;
    this.videos = [
      {
        platform: "flood",
        source: {
          "en": "https://www.youtube.com/embed/8aFRL4CaUIs",
          "tm": "https://www.youtube.com/embed/8aFRL4CaUIs"
        }
      },
      {
        platform: "twitter", //Match string to locale/*/translation.json > report_content.*
        source: {
          "en": "https://www.youtube.com/embed/OB5dLtFxVWY",
          "tm": "https://www.youtube.com/embed/OB5dLtFxVWY"
        }
      },
      {
        platform: "telegram",
        source: {
          "en": "https://www.youtube.com/embed/Sp1JbFd9KhM",
          "tm": "https://www.youtube.com/embed/Sp1JbFd9KhM"
        }
      },
      {
        platform: "facebook",
        source: {
          "en": "https://www.youtube.com/embed/unz-qCNUJzU",
          "tm": "https://www.youtube.com/embed/unz-qCNUJzU"
        }
      }
    ];
    this.report_type = [
      {text: {"en": "Flood report", "tm": "எச்சரிக்கை நிலை 1"}, icon: 'flood', icon_color: '#31aade'},
      {text: {"en": "Blocked Drains", "tm": "வடிகால் அடைப்ப"}, icon: 'drain', icon_color: '#782a07'},
      {text: {"en": "Desilting", "tm": "தூர் எடுப்பு"}, icon: 'desilting', icon_color: '#d14d11'},
      {text: {"en": "Canal Repairs", "tm": "கால்வாய் பழுது"}, icon: 'canalrepair', icon_color: '#ba870d'},
      {text: {"en": "Fallen Tree", "tm": "உடைந்த மரம்"}, icon: 'treeclearing', icon_color: '#006b3b'}
    ];
    this.gauge_levels = [
      {text: {"en": "Alert Level 1", "tm": "எச்சரிக்கை நிலை 1"}, icon: 'assets/icons/floodgauge_1.svg'},
      {text: {"en": "Alert Level 2", "tm": "எச்சரிக்கை நிலை 2"}, icon: 'assets/icons/floodgauge_2.svg'},
      {text: {"en": "Alert Level 3", "tm": "எச்சரிக்கை நிலை 3"}, icon: 'assets/icons/floodgauge_3.svg'},
      {text: {"en": "Alert Level 4", "tm": "எச்சரிக்கை நிலை 4"}, icon: 'assets/icons/floodgauge_4.svg'}
    ];
    this.flood_depth = [
      {text: {"en": "> 150", "tm": "> 150"}, color: '#CC2A41'},
      {text: {"en": "71 - 150", "tm": "71 - 150"}, color: '#FF8300'},
      {text: {"en": "10 - 70", "tm": "10 - 70"}, color: '#FFFF00'},
      {text: {"en": "Use Caution", "tm": "எச்சரிக்கையுடன் பயன்படுத்துங்கள்"}, color: '#A0A9F7'}
    ];
  }

  //on the fly language change
  changeLanguage() {
    this.locale = this.lang_obj[this.selLanguage.key];
  }

  //get language object from key
  getLangObj(key) {
    let selLang;
    for (let lang of this.languages) {
      if (key === lang.key) {
        selLang = lang;
      } else {
        selLang = this.config.default_language;
      }
    }
    return selLang;
  }

  attached() {
    this.selLanguage = (this.querylanguage ? this.getLangObj(this.querylanguage) : this.config.default_language);
    this.changeLanguage();
  }

  switchTab(tab) {
    this.seltab = tab;
    $('.tabLinks').removeClass("active");
    $('#button-' + tab).addClass("active");
    if (tab === 'report' && !this.vidWrapperOpened) {
      $('#vid_' + this.videos[0].platform).ready(() => {
        this.showVideo(this.videos[0].platform);
        this.vidWrapperOpened = true; //prevents report pane videos to toggle after user closes then reopens side pane
      });
    }
  }

  switchCity(city) {
    this.changeCity(city, true);
    this.reportId = null;
    this.closePane();
  }

  showVideo(video) {
    $('.videoWrapper:not(#vid_' + video + ')').slideUp("fast");
    $('#vid_' + video).slideToggle("fast");
    $('.labelRow:not(#label_' + video + ')').removeClass("active");
    $('#label_' + video).toggleClass("active");
    $('#down_' + video + ', #up_' + video).toggle();
    $('.up:not(#up_' + video + ')').hide();
    $('.down:not(#down_' + video + ')').show();
  }

  // When the user clicks on div, open the popup
  openTermsPopup() {
    this.closePane();
    $('#screen').show();
    $('#termsPopup').show();
  }
}
