import {bindable, customElement, inject} from 'aurelia-framework';
import $ from 'jquery';
import {Config} from 'resources/config';
import {Locales} from 'resources/locales/locales';

//start-aurelia-decorators
@customElement('side-pane')
@inject(Locales, Config)
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

  constructor(Locales, Config) {
    this.config = Config;
    this.languages = this.config.supported_languages;
    this.lang_obj = {};
    for (let lang of this.languages) {
      if (Locales.languages.hasOwnProperty(lang.key)) {
        this.lang_obj[lang.key] = Locales.languages[lang.key];
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
          "tm": "https://www.youtube.com/embed/8aFRL4CaUIs",
          "mh": "https://www.youtube.com/embed/8aFRL4CaUIs",
          "kn": "https://www.youtube.com/embed/8aFRL4CaUIs"
        }
      },
      {
        platform: "twitter", //Match string to locale/*/translation.json > report_content.*
        source: {
          "en": "https://www.youtube.com/embed/OB5dLtFxVWY",
          "tm": "https://www.youtube.com/embed/OB5dLtFxVWY",
          "mh": "https://www.youtube.com/embed/OB5dLtFxVWY",
          "kn": "https://www.youtube.com/embed/OB5dLtFxVWY"
        }
      },
      {
        platform: "telegram",
        source: {
          "en": "https://www.youtube.com/embed/Sp1JbFd9KhM",
          "tm": "https://www.youtube.com/embed/Sp1JbFd9KhM",
          "mh": "https://www.youtube.com/embed/Sp1JbFd9KhM",
          "kn": "https://www.youtube.com/embed/Sp1JbFd9KhM"
        }
      },
      {
        platform: "facebook",
        source: {
          "en": "https://www.youtube.com/embed/unz-qCNUJzU",
          "tm": "https://www.youtube.com/embed/unz-qCNUJzU",
          "mh": "https://www.youtube.com/embed/unz-qCNUJzU",
          "ka": "https://www.youtube.com/embed/unz-qCNUJzU"
        }
      }
    ];
    this.report_type = [
      {text: {"en": "Flood report", "tm": "எச்சரிக்கை நிலை 1","mh": "पुराची नोंद","ka": "Flood report"}, icon: 'flood', icon_color: '#31aade'},
      {text: {"en": "Blocked Drains", "tm": "வடிகால் அடைப்ப","mh": "तुंबलेले ड्रेन","ka": "Blocked Drains"}, icon: 'drain', icon_color: '#782a07'},
      {text: {"en": "Desilting", "tm": "தூர் எடுப்பு","mh": "गाळाचा निचरा","ka": "Desilting"}, icon: 'desilting', icon_color: '#d14d11'},
      {text: {"en": "Canal Repairs", "tm": "கால்வாய் பழுது","mh": "कालव्याची दुरुस्ती","ka": "Canal Repairs"}, icon: 'canalrepair', icon_color: '#ba870d'},
      {text: {"en": "Fallen Tree", "tm": "உடைந்த மரம்","mh": "पडलेले झाड","ka": "Fallen Tree"}, icon: 'treeclearing', icon_color: '#006b3b'}
    ];
    this.gauge_levels = [
      {text: {"en": "Alert Level 1", "tm": "எச்சரிக்கை நிலை 1","mh": "इशाऱ्याची पातळी 1","ka": "Alert Level 1"}, icon: 'assets/icons/floodgauge_1.svg'},
      {text: {"en": "Alert Level 2", "tm": "எச்சரிக்கை நிலை 2","mh": "इशाऱ्याची पातळी 2","ka": "Alert Level 2"}, icon: 'assets/icons/floodgauge_2.svg'},
      {text: {"en": "Alert Level 3", "tm": "எச்சரிக்கை நிலை 3","mh": "इशाऱ्याची पातळी 3","ka": "Alert Level 3"}, icon: 'assets/icons/floodgauge_3.svg'},
      {text: {"en": "Alert Level 4", "tm": "எச்சரிக்கை நிலை 4","mh": "इशाऱ्याची पातळी 4","ka": "Alert Level 4"}, icon: 'assets/icons/floodgauge_4.svg'}
    ];
    this.flood_depth = [
      {text: {"en": "> 150", "tm": "> 150","mh": "१५० से. मी. च्या वर","ka": "> 150"}, color: '#CC2A41'},
      {text: {"en": "71 - 150", "tm": "71 - 150","mh": "७१ ते १५० से. मी.","ka": "71 - 150"}, color: '#FF8300'},
      {text: {"en": "10 - 70", "tm": "10 - 70","mh": "१० ते ७० से. मी.","ka": "10 - 70"}, color: '#FFFF00'},
      {text: {"en": "Use Caution", "tm": "எச்சரிக்கையுடன் செயல்படவும","mh": "सावधानीं बाळगा","ka": "Use Caution"}, color: '#A0A9F7'}
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
