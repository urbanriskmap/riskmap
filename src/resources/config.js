import env from '../environment';
import dep from '../deployment';
import {noView} from 'aurelia-framework';

//start-aurelia-decorators
@noView
//end-aurelia-decorators
export class Config {
  constructor() {
    this.map = dep.map;
    this.map.dep_name = dep.name;
    this.map.data_server = env[dep.name].data_server;
    this.map.tile_layer = env[dep.name].tile_layer;
    this.map.app = env[dep.name].app;
    this.map.report_timeperiod = env[dep.name].report_timeperiod;

    this.title = env[dep.name].title;
    this.supported_languages = dep.supported_languages;
    //Save default language as object
    for (let lang of this.supported_languages) {
      if (lang.key === env[dep.name].default_language) {
        this.default_language = lang;
      }
    }
    this.height_units = dep.height_units;
    this.deep_links = env[dep.name].deep_links;
  }
}
