/*
PetaBencana.id Leaflet Map for CogniCity data, built within Aurelia framework
*/

import {inject} from 'aurelia-framework';
import * as config from './config'; // Map config
inject(config);

// DEFAULT CITY TO RENDER
let DEFAULT_CITY = 'jakarta';
let START_POINT = [-7, 109]

// Map class, requires map config.js (injected as Aurelia dependency)
export class Map {

  // Aurelia constructor
  constructor(){
    this.config = config;
  }

  // Get parameters from config based on city name, else return default
  parseMapCity(city){
    if (city in this.config.instance_regions){
      this.city_name = city;
      return this.config.instance_regions[city]
    }
    else {
      this.city_name = DEFAULT_CITY;
      return this.config.instance_regions[DEFAULT_CITY];
    }
  }

  // Change city from within map without reloading window
  changeCity(city_name){
    var stateObj = { map: "city" };

    this.city = this.parseMapCity(city_name);
    this.map.flyToBounds([this.city.bounds.sw, this.city.bounds.ne], 20);
    history.pushState(stateObj, "page 2", '#/map/'+this.city_name);
  }

  // Aurelia activate
  activate(params){
    this.city_name = params.city;
  }

  // Aurelia attached
  attached(){

    // Create Leaflet map
    this.map = L.map('map');
    let Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
    	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	subdomains: 'abcd',
    	minZoom: 0,
    	maxZoom: 18,
    	ext: 'png'
    }).addTo(this.map);

    // Zoom to city
    this.map.setView(START_POINT, 8);
    this.changeCity(this.city_name);
  }
}
