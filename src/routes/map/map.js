/*
PetaBencana.id Leaflet Map for CogniCity data, built within Aurelia framework
*/
import * as config from './config'; // Map config
import {Layers} from './layers';
import $ from 'jquery';
import * as L from 'leaflet';
import {notify} from 'notifyjs-browser'; //Jquery plugin

//start_dev_stage_only
import {activationStrategy} from 'aurelia-router';
//end_dev_stage_only

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

// Map class, requires map config.js (injected as Aurelia dependency)
export class Map {
  constructor() {
    this.config = config;
    this.city_regions = [];
    for (let city_region in this.config.instance_regions) {
      this.city_regions.push(city_region);
    }
  }

  activate(params) {
    this.city_name = params.city;
    this.report_id = params.report;
  }

  //start_dev_stage_only
  //Allows page refresh when testing query parameters
  /*
  determineActivationStrategy() {
    return activationStrategy.replace;
  }
  */
  //end_dev_stage_only

  togglePane(action, pane) {
    if ($(pane).css('display') === 'block' && (action === 'close' || action === 'toggle')) {
      $(pane).fadeOut(200);
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
      return this.config.default_region;
    } else if (city in this.config.instance_regions) {
      this.city_name = city;
      return this.config.instance_regions[city];
    } else {
      $.notify('Unsupported city: ' + JSON.stringify(city), {style:"mapInfo", className:"info" });
      return this.config.default_region;
    }
  }

  // Change city from within map without reloading window
  changeCity(city_name) {
    var self = this;
    var stateObj = {map: "city"};
    this.city = this.parseMapCity(city_name);
    this.flyToCity(self.city, stateObj);
    this.layers.removeReports();
    this.layers.addReports(this.city_name, this.city.region, this.togglePane)
    .then(() => {
      if (self.report_id && self.layers.pkeyList.hasOwnProperty(self.report_id)) {
        //Case 1: Valid report id
        self.map.flyTo(self.layers.pkeyList[self.report_id]._latlng, 16);
        self.layers.popupContent = self.layers.pkeyList[self.report_id].feature.properties;
        self.togglePane('open', '#reportPane');
      } else if (self.report_id && !self.layers.pkeyList.hasOwnProperty(self.report_id)) {
        //Case 2: Invalid report id
        $.notify("No such report key in " + self.city_name, {style:"mapInfo", className:"error" });
        self.report_id = null;
      } else {
        //Case 3: No report id, .addReports resolved
      }
    }).catch((err) => {
      //Case 4: .addReports not resolved
      $.notify("No reports found for " + self.city_name, {style:"mapInfo", className:"info" });
      self.report_id = null;
    });
  }

  flyToCity(city, stateObj) {
    this.map.flyToBounds([city.bounds.sw, city.bounds.ne], {'zoom': 20, 'duration': 1.50});
    this.togglePane('close', '#reportPane');
  }

  drawGpsMarkers(center, accuracy, map) {
    this.gpsAccuracy = L.circle(center, {
      weight: 0,
      fillColor: '#31aade',
      fillOpacity: 0.15,
      radius: accuracy / 2
    });
    this.gpsMarker = L.circleMarker(center, {
      color: 'white',
      weight: 1,
      fillColor: '#31aade',
      fillOpacity: 1,
      radius: 8
    });
    this.gpsAccuracy.addTo(map);
    this.gpsMarker.addTo(map);
  }

  findLocation() {
    var self = this;
    if (this.gpsMarker) {
      this.map.flyTo(self.gpsMarker._latlng);
    } else if (this.clientLocation) {
      var inValidCity;
      for (let city_region in this.config.instance_regions) {
        inValidCity = false;
        if (self.clientLocation.latitude > self.config.instance_regions[city_region].bounds.sw[0] && self.clientLocation.longitude > self.config.instance_regions[city_region].bounds.sw[1] && self.clientLocation.latitude < self.config.instance_regions[city_region].bounds.ne[0] && self.clientLocation.longitude < self.config.instance_regions[city_region].bounds.ne[1]) {
          //self.changeCity(city_region); //also add reports for city
          self.map.flyTo(self.clientLocation.latlng, 16); //dev, use self.changeCity()
          self.drawGpsMarkers(self.clientLocation.latlng, self.clientLocation.accuracy, self.map);
          inValidCity = true;
          break;
        }
      }
      if (!inValidCity) {
        $.notify("Location out of bounds", {style: "mapInfo", className: "error"});
      }
    } else {
      $.notify("GPS location not found", {style: "mapInfo", className: "error"});
    }
  }

  attached() {
    // Modify popup pane css on the fly
    $('#watchPane').css({
      'height': ($(window).height() - $('#topBar').height() - $('#bottomBar').height()) + 'px'
    });

    var self = this;

    // Create Leaflet map
    this.map = L.map('mapContainer', {
      zoomControl: false, //default position: 'topleft'
      attributionControl: false //include in bottom popup panel
    }).fitBounds([self.config.default_region.bounds.sw, self.config.default_region.bounds.ne]);
    // Create Layer instance
    this.layers = new Layers(this.map);

    // Find user location & store in background
    this.map.locate({
      setView: false
    });
    this.map.on('locationfound', (e) => {
      self.clientLocation = e;
    });
    this.map.on('locationerror', () => {
      self.clientLocation = null;
    });

    let Mapbox_Custom = L.tileLayer('https://api.mapbox.com/styles/v1/urbanriskmap/ciwce3tim00532pocrokb7ojf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNpdmVhbTFraDAwNHIyeWw1ZDB6Y2hhbTYifQ.tpgt1PB5lkJ-wITS02c96Q', {
    	//attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      detectRetina: true,
      subdomains: 'abcd',
    	minZoom: 0,
    	maxZoom: 18,
    	ext: 'png'
    }).addTo(this.map);

    //add zoom control
    L.control.zoom({position: 'topleft'}).addTo(this.map);

    //Add custom leaflet control, to navigate back to browser located user location
    L.Control.GeoLocate = L.Control.extend({
      onAdd: (map) => {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.backgroundImage = 'url(assets/icons/geolocate.svg)';
        container.style.backgroundSize = '26px 26px';
        container.style.width = '26px';
        container.style.height = '26px';
        container.onclick = () => {
          self.findLocation();
        };
        return container;
      }
    });
    L.control.geoLocate = (opts) => {
      return new L.Control.GeoLocate(opts);
    };
    L.control.geoLocate({position: 'topleft'}).addTo(self.map);

    // Zoom to city
    this.changeCity(this.city_name);
  }
}
