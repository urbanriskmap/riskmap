/*
PetaBencana.id Leaflet Map for CogniCity data, built within Aurelia framework
*/

import {inject} from 'aurelia-framework';
import * as config from './config'; // Map config
import $ from 'jquery';
import * as L from 'leaflet';

// DEFAULT CITY TO RENDER
let DEFAULT_CITY = 'jakarta';
let START_POINT = [-7, 109];

// Map class, requires map config.js (injected as Aurelia dependency)
export class Map {

  // Aurelia constructor
  constructor() {
    this.config = config;
    this.city_regions = []; //get city objects as array, to bind & repeat in router-view
    for (var city_region in this.config.instance_regions) {
      this.city_regions.push(city_region);
    }
    this.cityLayers = L.layerGroup();
    this.popupContent = {keys:[], values:[]};
    this.selectedLayers = [];
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

  parseIcon(icon) {
    if (icon in this.config.map_icons) {
      return L.icon({
        iconUrl: this.config.map_icons[icon].iconUrl,
        iconSize: this.config.map_icons[icon].iconSize,
        iconAnchor: this.config.map_icons[icon].iconAnchor
      });
    }
  }

  createLayer(displayProp, group, toggle, url, name, icon) {
    var newLayer;
    $.getJSON(url, function (data) {
      newLayer = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          layer.on({
            click: function () {
              $('#optionsPane').animate({
                'left': 0 + 'px'
              }, 200);
              displayProp.keys = [];
              for (let prop in feature.properties) {
                displayProp.keys.push(prop);
              }
              displayProp.values = [];
              for (let prop in feature.properties) {
                if (feature.properties.hasOwnProperty(prop)) {
                  displayProp.values.push(feature.properties[prop]);
                }
              }
            }
          });
        },
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: icon});
        }
      });
      group.addLayer(newLayer);
      toggle.addOverlay(newLayer, name);
    });
  }

  closePane() {
    $('#optionsPane').animate({
      'left': (-300) + 'px'
    }, 200);
    this.popupContent = {keys:[], values:[]};
  }

  selectedLayer() {

  }

  // Change city from within map without reloading window
  changeCity(city_name) {
    this.closePane();
    //$('#optionsPane').delay(200).hide(); //delay not working?
    var stateObj = { map: "city" };
    if (this.layerToggle) {
      this.map.removeControl(this.layerToggle);
    }
    this.layerToggle = L.control.layers();
    this.cityLayers.clearLayers();
    this.city = this.parseMapCity(city_name);
    this.map.flyToBounds([this.city.bounds.sw, this.city.bounds.ne], 20);
    for (var i = 0; i < this.city.layers.length; i += 1) {
      this.createLayer(this.popupContent, this.cityLayers, this.layerToggle, this.city.layers[i].url, this.city.layers[i].name, this.parseIcon(this.city.layers[i].icon));
    }
    this.layerToggle.addTo(this.map);
    this.cityLayers.addTo(this.map);
    history.pushState(stateObj, "page 2", '#/map/'+this.city_name);
  }

  // Aurelia activate
  activate(params) {
    this.city_name = params.city;
  }

  // Aurelia attached
  attached() {
    // Create Leaflet map
    this.map = L.map('map').setView(START_POINT, 8);
    let Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
    	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	subdomains: 'abcd',
    	minZoom: 0,
    	maxZoom: 18,
    	ext: 'png'
    }).addTo(this.map);

    //Add custom leaflet control, to bring up options panel
    L.Control.Options = L.Control.extend({
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.backgroundImage = 'url(assets/icons/options.svg)';
        container.style.backgroundSize = '26px 26px';
        container.style.width = '26px';
        container.style.height = '26px';
        container.onclick = function() {
          //$('#optionsPane').show();
          $('#optionsPane').animate({
            'left': 0 + 'px'
          }, 200);
        };
        return container;
      }
    });
    L.control.options = function(opts) {
      return new L.Control.Options(opts);
    };
    L.control.options({position: 'topleft'}).addTo(this.map);

    // Zoom to city
    this.changeCity(this.city_name);
  }
}
