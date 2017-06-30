import env from '../environment';
import dep from '../deployment';
import {noView} from 'aurelia-framework';

//start-non-standard
@noView
//end-non-standard
export class Config {
  constructor() {
    this.cards = {
      "data_server" : env[dep.name].data_server,
      "tile_layer": env[dep.name].tile_layer,
      "enable_test_cardid": env.enable_test_cardid
    };

    this.map = dep.map;
    this.map.data_server = env[dep.name].data_server;
    this.map.tile_layer = env[dep.name].tile_layer;
    this.map.app = env[dep.name].app;

    this.supported_languages = env[dep.name].supported_languages;
    this.default_language = env[dep.name].default_language;
  }
}
