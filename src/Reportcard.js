// Import environment variables
import env from './environment';

export class Reportcard {
  static metadata() {
    return Metadata.singleton(true);
  } //true indicates to register in the root container

  // Support language changing
  changeLanguage(lang) {
    $.getJSON("../../../locales/" + lang + "/translation.json", (data) => {
      $.each(data, (key, val) => {
        this.locale[key] = val;
      });
    });
  }

  constructor() {
    this.location = {markerLocation: null, gpsLocation: null, accuracy: null};
    this.depth = null;
    this.photo = {file: null, rotation: 0};
    this.description = {hint: "Enter description here...", value: null};
    //initial language, TODO: set using detected browser language
    this.selLanguage = env.default_language;
    this.languages = env.supported_languages;
    this.locale = {};
  }
}
