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
    this.popupContent = {keys:[], values:[]};
    this.all_layers = [];
    this.selectedLayers = [];
    this.layerGroup = L.layerGroup();
    this.isPaneOpen = false;
  }

  openPane() {
    $('#optionsPane').animate({
      'left': 0 + 'px'
    }, 200);
    $('#mapContainer').animate({
      'left': 300 + 'px',
      'width': (($(window).width() - 300) * 100 / $(window).width()) + '%'
    }, 200);
  }

  closePane() {
    $('#optionsPane').animate({
      'left': (-300) + 'px'
    }, 200);
    $('#mapContainer').animate({
      'left': 0 + 'px',
      'width': 100 + '%'
    }, 200);
    this.popupContent = {keys:[], values:[]};
  }

  togglePane() {
    if (this.isPaneOpen) {
      this.closePane();
      this.isPaneOpen = false;
    } else {
      this.openPane();
      this.isPaneOpen = true;
    }
  }

  createLayer(openPane, displayProp, group, url, name, icon) {
    var newLayer;
    $.getJSON(url, function (data) {
      newLayer = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
          layer.on({
            click: function () {
              openPane();
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
    });
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

  updateLayers() { //TODO: removes all layers, then re-renders selected layers on each change
    this.layerGroup.clearLayers();
    this.popupContent = {keys:[], values:[]};
    for (let layer in this.selectedLayers) {
      this.createLayer(this.openPane, this.popupContent, this.layerGroup, this.city.layers[this.selectedLayers[layer]].url, this.city.layers[this.selectedLayers[layer]].name, this.parseIcon(this.city.layers[this.selectedLayers[layer]].icon));
    }
    this.layerGroup.addTo(this.map);
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
    this.map.flyToBounds([this.city.bounds.sw, this.city.bounds.ne], 20);
    this.all_layers = [];
    for (let layer in this.city.layers) {
      this.all_layers.push(layer);
      if (layer === "reports") {
        this.selectedLayers.push(layer);
      }
    }
    this.updateLayers();
    //var stateObj = { map: "city" };
    //history.pushState(stateObj, "page 2", '#/map/' + this.city_name);
  }

  activate(params) {
    this.city_name = params.city;
  }

  attached() {
    // Create Leaflet map
    this.map = L.map('mapContainer', {
      zoomControl: false //default position: 'topleft'
    }).setView(START_POINT, 8);
    let Stamen_Terrain = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
    	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    	subdomains: 'abcd',
    	minZoom: 0,
    	maxZoom: 18,
    	ext: 'png'
    }).addTo(this.map);

    //add zoom control
    L.control.zoom({
      position:'topright'
    }).addTo(this.map);

    // Zoom to city
    this.changeCity(this.city_name);
  }
}
