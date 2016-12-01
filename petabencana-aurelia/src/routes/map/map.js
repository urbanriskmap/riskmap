/*
PetaBencana.id Leaflet Map for CogniCity data, built within Aurelia framework
*/
import * as config from './config'; // Map config
import {Layers} from './layers';
import $ from 'jquery';
import * as L from 'leaflet';

// DEFAULT CITY TO RENDER
let DEFAULT_CITY = 'jakarta';
let START_POINT = [-7, 109];

// Map class, requires map config.js (injected as Aurelia dependency)
export class Map {
  constructor() {
    this.config = config;
    this.city_regions = []; //get city objects as array, to bind & repeat in router-view
    for (var city_region in this.config.instance_regions) {
      this.city_regions.push(city_region);
    }
  }

  togglePane(action) {
    if ((($(window).height() - $('#optionsPane').offset().top) > 100) && (action === 'close' || action === 'toggle')) {
      $('#optionsPane').animate({
        'bottom': (-176) + 'px'
      }, 200);
      $('#mapContainer').animate({
        'height': $(window).height() - $('#navBar').height() + 'px'
      }, 200);
      $('#optionsIcon').css({
        'transform': 'rotate(' + 0 + 'deg)'
      });
      //clear popup content
      this.layers.popupContent = {};
    } else if ((($(window).height() - $('#optionsPane').offset().top) < 100) && (action === 'open' || action === 'toggle')) {
      $('#optionsPane').animate({
        'bottom': 0 + 'px'
      }, 200);
      $('#mapContainer').animate({
        'height': (($(window).height() - $('#navBar').height() - $('#optionsPane').height()) * 100 / $(window).height()) + '%'
      }, 200);
      $('#optionsIcon').css({
        'transform': 'rotate(' + 180 + 'deg)'
      });
    }
  }

  // Get parameters from config based on city name, else return default
  parseMapCity(city) {
    if (city in this.config.instance_regions) {
      this.city_name = city;
      return this.config.instance_regions[city];
    } else {
      this.city_name = DEFAULT_CITY;
      return this.config.instance_regions[DEFAULT_CITY];
    }
  }

  // Change city from within map without reloading window
  changeCity(city_name) {
    this.layers.removeReports();
    this.layers.addReports(city_name, this.togglePane);
    this.city = this.parseMapCity(city_name);
    this.map.flyToBounds([this.city.bounds.sw, this.city.bounds.ne], 20);
    var stateObj = { map: "city" };
    history.pushState(stateObj, "page 2", '#/map/' + this.city_name);
  }

  activate(params) {
    this.city_name = params.city;
  }

  attached() {
    $('#mapContainer').css({
      'height': $(window).height() - $('#navBar').height() + 'px'
    });

    // Create Leaflet map
    this.map = L.map('mapContainer', {
      zoomControl: false, //default position: 'topleft'
      attributionControl: false //include in bottom popup panel
    }).setView(START_POINT, 8);
    // Create Layer instance
    this.layers = new Layers(this.map);

    let Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
    	//attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	subdomains: 'abcd',
    	minZoom: 0,
    	maxZoom: 18,
    	ext: 'png'
    }).addTo(this.map);

    //add zoom control
    L.control.zoom({
      position:'topright'
    }).addTo(this.map);

    var that = this;
    this.map.on('move', function() {
      that.togglePane('close');
    });

    // Zoom to city
    this.changeCity(this.city_name);
  }
}
