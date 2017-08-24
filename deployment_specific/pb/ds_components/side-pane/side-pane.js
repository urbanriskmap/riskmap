import {bindable, customElement, inject} from 'aurelia-framework';
import $ from 'jquery';
import {Config} from 'resources/config';
import {LocaleEn} from 'resources/locales/en';
import {LocaleLocal} from 'resources/locales/local_lang';

//start-non-standard
@customElement('side-pane')
@inject(LocaleEn, LocaleLocal, Config)
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

  constructor(LocaleEn, LocaleLocal, Config) {
    this.languages = Config.supported_languages;
    this.lang_obj = {en: LocaleEn};
    this.lang_obj[this.languages[1]] = LocaleLocal;
    this.config = Config;
    this.locale = {};

    this.seltab = "map"; //default tab to open
    this.tabList = ["report", "map", "info"]; //elements match names of fontello icons
    this.vidWrapperOpened = false;
    this.videos = [
      {
        platform: "twitter", //Match string to locale/*/translation.json > report_content.*
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id&rel=0",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id&rel=0"
        }
      },
      {
        platform: "telegram",
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id&rel=0",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id&rel=0"
        }
      },
      {
        platform: "otherapps",
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id&rel=0",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id&rel=0"
        }
      }
    ];
    this.gauge_levels = [
      {text: {"en": "Alert Level 1", "id": "Siaga 1"}, icon: 'assets/icons/floodgauge_1.svg'},
      {text: {"en": "Alert Level 2", "id": "Siaga 2"}, icon: 'assets/icons/floodgauge_2.svg'},
      {text: {"en": "Alert Level 3", "id": "Siaga 3"}, icon: 'assets/icons/floodgauge_3.svg'},
      {text: {"en": "Alert Level 4", "id": "Siaga 4"}, icon: 'assets/icons/floodgauge_4.svg'}
    ];
    this.flood_depth = [
      {text: {"en": "> 150", "id": "> 150"}, color: '#CC2A41'},
      {text: {"en": "71 - 150", "id": "71 - 150"}, color: '#FF8300'},
      {text: {"en": "10 - 70", "id": "10 - 70"}, color: '#FFFF00'},
      {text: {"en": "Use Caution", "id": "Hati-hati"}, color: '#A0A9F7'}
    ];
  }

  //on the fly language change
  changeLanguage() {
    this.locale = this.lang_obj[this.selLanguage].translation_strings;
  }

  attached() {
    this.selLanguage = (this.querylanguage ? this.querylanguage : this.config.default_language);
    this.changeLanguage();
    $('#label_' + this.selLanguage).addClass("active");
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

  //Cannot use default binding (checked.bind="selLanguage") as
  //radio button is hidden, and never gets checked.
  //Using click.delegate instead of change.delegate &
  //set selLanguage in the click function | Works in card.js,
  //perhaps because here input list is nested within a ul > li ?
  switchLang(lang) {
    this.selLanguage = lang;
    this.changeLanguage();
    $('.langLabels').removeClass("active");
    $('#label_' + lang).addClass("active");
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
