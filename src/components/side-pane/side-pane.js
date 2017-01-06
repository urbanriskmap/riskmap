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
  //end-non-standard

  constructor() {
    this.tabs = ["map", "watch", "info"]; //elements match names of fontello icons
    this.selTab = "map";
    this.languages = ["en", "id"];
    //initial language, TODO: set using detected browser language
    this.selLanguage = "en";
    this.locale = {};
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
    $('#button-' + this.selTab).addClass("active");
  }

  switchTab(tab) {
    $('.tabLinks').removeClass("active");
    $('#button-' + tab).addClass("active");
    this.selTab = tab;
  }

  switchLang(lang) {
    this.changeLanguage(lang);
    $('.langLabels').removeClass("active");
    $('#' + lang).addClass("active");
  }

  switchCity(city) {
    this.changeCity(city, true);
  }
}
