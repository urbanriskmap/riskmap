import {inject} from 'aurelia-framework';
import * as config from './config';
inject(config);

export class Map {

  constructor(){
    this.config = config;
  }

  parseMapRoute(route){
    if (route in this.config.routes){
      return this.config.instance_regions[this.config.routes[route]]
    }
    else {
      return this.config.instance_regions.java;
    }
  }
  activate(params, navigationInstruction){
    this.route = navigationInstruction.route;
    this.city = this.parseMapRoute(navigationInstruction.route);
  }
  attached(){
    //alert(this.route);
    this.map = L.map('map');
    let Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
    	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	subdomains: 'abcd',
    	minZoom: 0,
    	maxZoom: 18,
    	ext: 'png'
    }).addTo(this.map);
    this.map.fitBounds([this.city.bounds.sw, this.city.bounds.ne]);

    //this.map.flyTo([-7, 109],15);
  }
}
