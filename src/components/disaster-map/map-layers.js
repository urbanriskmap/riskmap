//Utility functions for manipulating leaflet map layers

import {noView} from 'aurelia-framework';
import * as L from 'leaflet';

//start-non-standard
@noView
//end-non-standard
export class MapLayers {
  constructor() {
    this.activeReports = {}; // List of available reports (filtered by city, time: last 1 hour)
  }

  onEachFeature() {

  }

  addReports(city_name, data, onEachFeature) {

  }
}
