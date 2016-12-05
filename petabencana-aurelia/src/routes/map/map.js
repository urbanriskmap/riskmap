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

  activate(params) {
    this.city_name = params.city;
  }

  togglePane(action, pane) {
    if ((($(window).height() - $(pane).offset().top) > 10) && (action === 'close' || action === 'toggle')) {
      $(pane).animate({
        'bottom': -$(pane).height() + 'px'
      }, 200);
      /*$('#mapContainer').animate({
        'height': $(window).height() + 'px'
      }, 200);*/
      //clear popup content
      if (pane === '#reportPane') {
        this.layers.popupContent = {};
      }
    } else if ((($(window).height() - $(pane).offset().top) < 10) && (action === 'open' || action === 'toggle')) {
      $(pane).animate({
        'bottom': 0 + 'px'
      }, 200);
      /*$('#mapContainer').animate({
        'height': (($(window).height() - $(pane).height()) * 100 / $(window).height()) + '%'
      }, 200);*/
    }
  }

  openWatch() {
    this.togglePane('close', '#reportPane');
    this.togglePane('toggle', '#watchPane');
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
    this.city = this.parseMapCity(city_name);
    this.layers.removeReports();
    this.layers.addReports(city_name, this.togglePane);
    this.map.flyToBounds([this.city.bounds.sw, this.city.bounds.ne], 20);
    var stateObj = { map: "city" };
    history.pushState(stateObj, "page 2", '#/map/' + this.city_name);
  }

  attached() {
    // Create Leaflet map
    this.map = L.map('mapContainer', {
      zoomControl: false, //default position: 'topleft'
      attributionControl: false //include in bottom popup panel
    }).setView(START_POINT, 8);
    // Create Layer instance
    this.layers = new Layers(this.map);


    let Mapbox_Custom = L.tileLayer('https://api.mapbox.com/styles/v1/urbanriskmap/ciwce3tim00532pocrokb7ojf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNpdmVhbTFraDAwNHIyeWw1ZDB6Y2hhbTYifQ.tpgt1PB5lkJ-wITS02c96Q', {

    	//attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	subdomains: 'abcd',
    	minZoom: 0,
    	maxZoom: 18,
    	ext: 'png'
    }).addTo(this.map);

    //add zoom control
    L.control.zoom({
      position:'topleft'
    }).addTo(this.map);

    /*var that = this; //REPLACE with close button on panes
    this.map.on('move', function() {
      that.togglePane('close', '#reportPane');
    });*/

    // Zoom to city
    this.changeCity(this.city_name);
  }
}
