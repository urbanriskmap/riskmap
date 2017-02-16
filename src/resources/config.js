// PetaBencana.id configuration file, for CogniCity data
// https://github.com/urbanriskmap/urbanriskmap-meta/wiki/Bounding-Boxes-for-Target-Cities

// Import environment variables from Aurelia build
import env from '../environment';
import {noView} from 'aurelia-framework';

//start-non-standard
@noView
//end-non-standard
export class Config {
  constructor() {
    this.cards = {
      "data_server" : env.data_server,
      "tile_layer": env.tile_layer,
      "enable_test_cardid": env.enable_test_cardid
    };

    this.map = {
      "instance_regions":
      {
        "chennai": {
          "region": "chn",
          "bounds": {
            "sw":[ 13.017163, 80.185031],
            "ne":[ 13.151873, 80.309767]
          }
        }
      },
      "default_region": {
        "region": "chn",
        "bounds": {
          "sw":[ 13.017163, 80.185031],
          "ne":[ 13.151873, 80.309767]
        }
      },
      "data_server" : env.data_server,
      "tile_layer": env.tile_layer,
      "app": env.app
    };
  }
}
