// Import environment variables
import env from '../environment';
import {noView} from 'aurelia-framework';

//start-non-standard
@noView
//end-non-standard
export class ReportCard {
  static metadata() {
    return Metadata.singleton(true);
  } //true indicates to register in the root container

  // Support language changing
  // TODO - error handling for
  changeLanguage(lang) {
    $.getJSON("../../../locales/" + lang + "/translation.json", (data) => {
      $.each(data, (key, val) => {
        this.locale[key] = val;
      });
    });
  }

  constructor() {
    var self = this;
    //initial language, TODO: set using detected browser language
    self.selLanguage = env.default_language;
    self.languages = env.supported_languages;
    self.location = {markerLocation: null, gpsLocation: null, accuracy: null, supported: false};
    self.depth = null;
    self.photo = {file: null, rotation: 0};
    self.description = {value: null};
    self.network = null;
    self.locale = {};
    self.changeLanguage(this.selLanguage);
  }
}
