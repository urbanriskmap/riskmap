import {bindable, customElement} from 'aurelia-framework';
import $ from 'jquery';

//start-non-standard
@customElement('side-pane')
//end-non-standard
export class SidePane {
  //@bindable attributes do not work with camelCase...
  //start-non-standard
  @bindable cities;
  @bindable selected;
  @bindable changeCity;
  @bindable closePane;
  @bindable reportId;
  //end-non-standard

  constructor() {
    this.tabList = ["map", "report", "info"]; //elements match names of fontello icons
    this.tab = "map";
    this.languages = ["en", "id"];
    //initial language, TODO: set using detected browser language
    this.selLanguage = "en";
    this.locale = {};
    this.videos = [
      {
        platform: "twitter", //Match string to locale/*/translation.json > report_content.*
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id"
        }
      },
      {
        platform: "telegram",
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id"
        }
      },
      {
        platform: "other",
        source: {
          "id": "https://www.youtube.com/embed/Gb_BAAiRw2U?autoplay=0&origin=https://petabencana.id",
          "en": "https://www.youtube.com/embed/EfJRa9sF89Y?autoplay=0&origin=https://petabencana.id"
        }
      }
    ];
  }

  //on the fly language change
  changeLanguage(lang) {
    $.getJSON("../../../locales/" + lang + "/translation.json", (data) => {
      $.each(data, (key, val) => {
        this.locale[key] = val;
      });
    });
  }

  attached() {
    this.changeLanguage(this.selLanguage);
    $('#' + this.selLanguage).addClass("active");
    $('#button-' + this.tab).addClass("active");
  }

  switchTab(tab) {
    $('.tabLinks').removeClass("active");
    $('#button-' + tab).addClass("active");
    this.tab = tab;
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
    $('#down_' + video).toggle();
    $('#up_' + video).toggle();
  }
}
