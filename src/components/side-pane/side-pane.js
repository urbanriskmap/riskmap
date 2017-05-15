import {bindable, customElement, inject} from 'aurelia-framework';
import $ from 'jquery';
import env from 'environment';
import {LocaleEn} from 'resources/locales/en';
import {LocaleId} from 'resources/locales/id';

//start-non-standard
@customElement('side-pane')
@inject(LocaleEn, LocaleId)
//end-non-standard
export class SidePane {
  //@bindable attributes do not work with camelCase...
  //start-non-standard
  @bindable cities;
  @bindable selcity;
  @bindable changeCity;
  @bindable closePane;
  @bindable reportId;
  @bindable querylanguage;
  @bindable switchTerms;
  //end-non-standard

  constructor(LocaleEn, LocaleId) {
    this.lang_obj = {en: LocaleEn, id: LocaleId};
    this.languages = env.supported_languages;
    this.locale = {};
    this.seltab = "map"; //default tab to open
    this.tabList = ["report", "map", "info"]; //elements match names of fontello icons
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
      {text: {"en": "Use Caution", "tm": "Hati-hati"}, color: '#A0A9F7'}
    ];
  }

  //on the fly language change
  changeLanguage(lang) {
    this.locale = this.lang_obj[lang].translation_strings;
  }

  attached() {
    this.selLanguage = (this.querylanguage ? this.querylanguage : env.default_language);
    this.changeLanguage(this.selLanguage);
    $('#' + this.selLanguage).addClass("active");
    //$('#button-' + this.seltab).addClass("active");
  }

  switchTab(tab) {
    $('.tabLinks').removeClass("active");
    $('#button-' + tab).addClass("active");
    this.seltab = tab;
  }

  switchLang(lang) {
    this.changeLanguage(lang);
    $('.langLabels').removeClass("active");
    $('#' + lang).addClass("active");
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
  openTermsPopup(type) {
    this.closePane();
    $('#screen').show();
    $('#termsPopup').show();
    this.switchTerms(type);
  }
}
