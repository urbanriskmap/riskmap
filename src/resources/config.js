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
      "instance_regions": {
        "jakarta": {
          "region": "jbd",
          "bounds": {
            "sw":[-6.733, 106.480],
            "ne":[-5.880, 107.175]
          }
        },
        "surabaya": {
          "region": "sby",
          "bounds": {
            "sw":[-7.5499, 112.3975],
            "ne":[-7.0143, 113.0318]
          }
        },
        "bandung": {
          "region": "bdg",
          "bounds": {
            "sw":[-7.165, 107.369],
            "ne":[-6.668, 107.931]
          }
        }
      },
      "default_region": {
        "region": "java",
        "bounds": {
          "sw":[-10.293, 104.677],
          "ne":[-3.974, 115.290]
        }
      },
      "data_server" : env.data_server,
      "tile_layer": env.tile_layer,
      "app": env.app
    };
  }
}
