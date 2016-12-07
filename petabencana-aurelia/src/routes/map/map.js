/*
PetaBencana.id Leaflet Map for CogniCity data, built within Aurelia framework
*/
import * as config from './config'; // Map config
import {Layers} from './layers';
import $ from 'jquery';
import * as L from 'leaflet';
import {activationStrategy} from 'aurelia-router';
import {notify} from 'notifyjs-browser'; //Jquery plugin

$.notify.addStyle('mapInfo', {
  html: "<div id=notification><span data-notify-text/></div>",
  classes: {
    info: {
            "background-color": "rgba(0, 0, 0, 0.5)",
          },
    error: {
      "background-color": "rgba(255, 0, 0, 0.4)",
      }
  }
});

// DEFAULT CITY TO RENDER
let DEFAULT_CITY = 'jakarta';
let START_POINT = [-7, 109];
let START_ZOOM = 8;

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
    this.report_id = params.report;
  }

  //Allows page refresh when adding query parameters
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  togglePane(action, pane) {
    if ($(pane).css('display') === 'block' && (action === 'close' || action === 'toggle')) {
      $(pane).fadeOut(200);
      //clear popup content
      if (pane === '#reportPane') {
        this.layers.popupContent = {};
      }
    } else if ($(pane).css('display') === 'none' && (action === 'open' || action === 'toggle')) {
      $(pane).fadeIn(200);
    }
  }

  openWatch() {
    this.togglePane('close', '#reportPane');
    this.togglePane('toggle', '#watchPane');
  }

  // Get parameters from config based on city name, else return default
  parseMapCity(city) {
    if (typeof(city) == 'undefined' ) {
      this.city_name = DEFAULT_CITY;
      return this.config.instance_regions[DEFAULT_CITY];
    } else if (city in this.config.instance_regions) {
      this.city_name = city;
      return this.config.instance_regions[city];
    }
    else {
      $.notify('Unsupported city: '+JSON.stringify(city), {style:"mapInfo", className:"info" });
      console.log('Unsupported city: '+JSON.stringify(city));
      this.city_name = DEFAULT_CITY;
      return this.config.instance_regions[DEFAULT_CITY];
    }
  }

  // Change city from within map without reloading window
  changeCity(city_name) {
    var self = this;
    var stateObj = {map: "city"};
    this.city = this.parseMapCity(city_name);
    this.layers.removeReports();
    this.layers.addReports(this.city_name, this.togglePane)
    .then(() => {
      if (self.report_id && self.layers.pkeyList.hasOwnProperty(self.report_id)) {
        self.map.flyTo(self.layers.pkeyList[self.report_id]._latlng, 16);
        self.layers.popupContent = self.layers.pkeyList[self.report_id].feature.properties;
        self.togglePane('open', '#reportPane');
        history.pushState(stateObj, "map", '#/map/' + self.city_name + '/' + self.report_id);
      } else if (self.report_id && !self.layers.pkeyList.hasOwnProperty(self.report_id)) {
        $.notify("No such report key in " + self.city_name, {style:"mapInfo", className:"error" });
        self.flyToCity(self.city, stateObj);
      } else {
        self.flyToCity(self.city, stateObj);
      }
    }).catch((err) => {
      $.notify("No reports found for " + self.city_name, {style:"mapInfo", className:"info" });
      self.flyToCity(self.city, stateObj);
    });
  }

  flyToCity(city, stateObj) {
    this.report_id = null;
    this.map.flyToBounds([city.bounds.sw, city.bounds.ne], 20);
    this.togglePane('close', '#reportPane');
    history.pushState(stateObj, "map", '#/map/' + this.city_name);
  }

  attached() {
    // Modify popup pane css on the fly
    $('#watchPane').css({
      'height': ($(window).height() - $('#topBar').height() - $('#bottomBar').height()) + 'px'
    });

    // Create Leaflet map
    this.map = L.map('mapContainer', {
      zoomControl: false, //default position: 'topleft'
      attributionControl: false //include in bottom popup panel
    }).setView(START_POINT, START_ZOOM);
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

    var self = this;

    // Zoom to city
    this.changeCity(this.city_name);

    this.map.on('move', () => {
      START_POINT = self.map.getCenter();
      START_ZOOM = self.map.getZoom();
    });

  }
}
