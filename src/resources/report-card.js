// Import environment variables
import env from 'environment';
import {noView, inject} from 'aurelia-framework';
import {LocaleEn} from 'resources/locales/en';
import {LocaleId} from 'resources/locales/id';

//start-non-standard
@noView
@inject(LocaleEn, LocaleId)
//end-non-standard
export class ReportCard {
  static metadata() {
    return Metadata.singleton(true);
  } //true indicates to register in the root container

  // Support language changing
  // TODO - error handling for
  changeLanguage(lang) {
    this.locale = this.lang_obj[lang].translation_strings;
  }

  constructor(LocaleEn, LocaleId) {
    var self = this;
    self.lang_obj = {en: LocaleEn, id: LocaleId};
    self.selLanguage = env.default_language;
    console.log('selected lang' + self.selLanguage);
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
