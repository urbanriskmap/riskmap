import {Config} from './config';
import {noView, inject} from 'aurelia-framework';
import {LocaleEn} from 'resources/locales/en';
import {LocaleLocal} from 'resources/locales/local_lang';

//start-non-standard
@noView
@inject(LocaleEn, LocaleLocal, Config)
//end-non-standard
export class ReportCard {
  static metadata() {
    return Metadata.singleton(true);
  } //true indicates to register in the root container

  // Support language changing
  changeLanguage() {
    this.locale = this.lang_obj[this.selLanguage].translation_strings;
  }

  constructor(LocaleEn, LocaleLocal, Config) {
    var self = this;

    self.selLanguage = Config.default_language;
    self.languages = Config.supported_languages;
    self.lang_obj = {en: LocaleEn};
    self.lang_obj[self.languages[1]] = LocaleLocal;
    self.locale = {};
    self.changeLanguage(self.selLanguage);

    self.disasterType = null;
    self.location = {markerLocation: null, gpsLocation: null, accuracy: null, supported: false};
    self.depth = null; //TODO: make this object similar to DB structure, i.e. tags: {flood_depth: 50, report_type: 'treeclearing'.... etc}
    self.reportType = null;
    self.photo = {file: null, rotation: 0};
    self.description = {value: null};
    self.network = null;
    self.errors = {code: null, text: null};
  }
}
