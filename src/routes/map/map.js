/*
PetaBencana.id Leaflet Map for CogniCity data, built within Aurelia framework
*/
import * as config from './config'; // Map config
import {Layers} from './layers';
import $ from 'jquery';
import * as L from 'leaflet';
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

// Map class, requires map config.js (injected as Aurelia dependency)
export class Map {
  constructor() {
    this.config = config;
    this.city_regions = [];
    for (let city_region in this.config.instance_regions) {
      this.city_regions.push(city_region);
    }
  }

  activate(params, routerConfig) {
    this.city_name = params.city;
    this.report_id = params.report;
    if (!this.city_name) {
      routerConfig.navModel.router.navigate('map', {replace: true});
    }
  }

  togglePane(action, pane) {
    if ($(pane).css('display') === 'block' && (action === 'close' || action === 'toggle')) {
      $(pane).fadeOut(200);
      this.sidePaneOpen = false;
    } else if ($(pane).css('display') === 'none' && (action === 'open' || action === 'toggle')) {
      $(pane).fadeIn(200);
    }
  }

  showMenu() {
    this.togglePane('close', '#reportPane');
    this.togglePane('open', '#sidePane');
    this.sidePaneOpen = true;
  }

  // Get parameters from config based on city name, else return default
  parseMapCity(cityName) {
    if (typeof(cityName) === 'undefined' || cityName === null) {
      return this.config.default_region;
    } else if (cityName in this.config.instance_regions) {
      this.city_name = cityName;
      return this.config.instance_regions[cityName];
    } else {
      $.notify('Unsupported city: ' + JSON.stringify(cityName), {style:"mapInfo", className:"info" });
      $('#cityPopup').fadeIn(500);
      return this.config.default_region;
    }
  }

  // Change city from within map without reloading window
  changeCity(cityName, pushState) {
    this.togglePane('close', '#reportPane');
    var cityObj = this.parseMapCity(cityName);
    if (pushState) {
      if (cityObj.region !== 'java') {
        history.pushState({city: cityName}, "city", "map/" + cityName);
      } else {
        history.pushState({city: null}, "city", "map");
      }
    }
    this.map.flyToBounds([cityObj.bounds.sw, cityObj.bounds.ne]);
    /*//Set map bounds after flyToBounds ends
    this.map.once('moveend', (e) => { //execute only once, ignores user map drag events
      this.map.setMaxBounds(e.target.options.maxBounds);
    });*/
    this.layers.removeReports();
    return this.layers.addReports(cityName, cityObj.region, this.togglePane);
  }

  // View all reports for city, or zoom to single queried report id
  viewReport(cityName, pushState) {
    var self = this;
    this.changeCity(cityName, pushState)
    .then(() => {
      if (self.report_id && self.layers.pkeyList.hasOwnProperty(self.report_id)) {
        //Case 1: Valid report id in current city
        self.map.flyTo(self.layers.pkeyList[self.report_id]._latlng, {
          zoom: 16,
          duration: 1
        });
        self.layers.popupContent = self.layers.pkeyList[self.report_id].feature.properties;
        self.togglePane('open', '#reportPane');
      } else if (self.report_id && !self.layers.pkeyList.hasOwnProperty(self.report_id)) {
        //Case 2: Report id not available in current city
        $.notify("No such report key in " + cityName, {style:"mapInfo", className:"error" });
        self.report_id = null;
      }
    }).catch((err) => {
      //Case 3: .addReports not resolved for specified city
      $.notify("No reports found for " + cityName, {style:"mapInfo", className:"info" });
      self.report_id = null;
    });
  }

  //Execute changeCity & viewReport from initial load select city popup
  selectCity(city) {
    this.viewReport(city, true);
    $('#cityPopup').fadeOut(1000);
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

  viewLocation() {
    var self = this;
    if (this.clientLocation) {
      if (this.clientCityIsValid) {
        //case 1: location found, location in a supported city
        self.map.flyTo(self.clientLocation.latlng, 16);
        if (self.gpsMarker) {
          self.gpsMarker.removeFrom(self.map);
          self.gpsAccuracy.removeFrom(self.map);
        }
        self.map.once('moveend', () => { //execute only once, after fly to location ends, ignores user map drag events
          self.drawGpsMarkers(self.clientLocation.latlng, self.clientLocation.accuracy, self.map);
        });
        self.changeCity(self.clientCity, true);
      } else {
        //case 2: location found, but not in supported city
        $.notify("Location out of bounds", {style: "mapInfo", className: "error"});
      }
    } else {
      //case 3: location not found
      $.notify("GPS location not found", {style: "mapInfo", className: "error"});
    }
  }

  attached() {
    // Modify popup pane css on the fly
    $('#sidePane').css({
      'height': ($(window).height() - $('#topBar').height()) + 'px'
    });

    var self = this;

    //User navigates through history, load city, but do not pushState
    window.onpopstate = (e) => {
      if (e.state.city !== null) {
        this.viewReport(e.state.city, false);
      } else {
        this.viewReport(null, false);
      }
    };

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
      for (let city_region in self.config.instance_regions) {
        self.clientCityIsValid = false;
        if (self.clientLocation.latitude > self.config.instance_regions[city_region].bounds.sw[0] && self.clientLocation.longitude > self.config.instance_regions[city_region].bounds.sw[1] && self.clientLocation.latitude < self.config.instance_regions[city_region].bounds.ne[0] && self.clientLocation.longitude < self.config.instance_regions[city_region].bounds.ne[1]) {
          self.clientCity = city_region;
          self.clientCityIsValid = true;
          break;
        }
      }
    });
    this.map.on('locationerror', () => {
      self.clientLocation = null;
    });

    let Mapbox_Custom = L.tileLayer('https://api.mapbox.com/styles/v1/urbanriskmap/ciwwgpt9j004a2prwm9cylsrc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNpdmVhbTFraDAwNHIyeWw1ZDB6Y2hhbTYifQ.tpgt1PB5lkJ-wITS02c96Q', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
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
          self.viewLocation();
        };
        return container;
      }
    });
    L.control.geoLocate = (opts) => {
      return new L.Control.GeoLocate(opts);
    };
    L.control.geoLocate({position: 'topleft'}).addTo(self.map);

    // Zoom to city
    if (this.city_name) {
      $('#cityPopup').hide();
      this.viewReport(this.city_name, true);
    } else {
      this.changeCity(null, false);
    }
  }
}
