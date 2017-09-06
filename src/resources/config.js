import env from '../environment';
import dep from '../deployment';
import {noView} from 'aurelia-framework';

//start-aurelia-decorators
@noView
//end-aurelia-decorators
export class Config {
  constructor() {
    this.map = dep.map;
    this.map.data_server = env[dep.name].data_server;
    this.map.tile_layer = env[dep.name].tile_layer;
    this.map.app = env[dep.name].app;
    this.map.report_timeperiod = env.report_timeperiod;

    this.title = env[dep.name].title;
    this.supported_languages = env[dep.name].supported_languages;
    this.default_language = env[dep.name].default_language;
    this.height_units = dep.height_units;
  }
}
