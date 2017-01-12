import * as config from './config'; // Map config
import {Data} from './data';
import $ from 'jquery';

// PetaBencana.id Layers class - manage leaflet data layers
export class Layers {
  constructor(leafletMap) {
    this.map = leafletMap;
    this.data = new Data(); // Data class
    this.reports = {}; // Layers
    this.popupContent = {};
    this.pkeyList = {};
  }

  // Adds a single report from data server to existing map layer
  addSingleReport(report_id) {
    var self = this;
    var url = config.data_server + 'reports/' + report_id;

    return new Promise((resolve, reject) => {
      self.data.getData(url)
        .then((data) => {
          self.reports.addData(data);
          var report = self.pkeyList[data.features[0].properties.pkey];
          resolve(report);
        })
        .catch(() => reject(null));
    });
  }

  // Get flood reports as topojson, return Leaflet geojson layer
  addReports(city_name, city_region, showPane) {
    let url = config.data_server + 'reports/?city=' + city_region;
    var self = this;

    // create placeholder for reports data;
    self.reports = L.geoJSON(null, {
      onEachFeature: (feature, layer) => { //TODO: create separate class function
        self.pkeyList[feature.properties.pkey] = layer;
        layer.on({
          click: () => {
            self.popupContent = {};
            for (let prop in feature.properties) {
              self.popupContent[prop] = feature.properties[prop];
            }
            self.map.flyTo(layer._latlng, 16);
            history.pushState({city: city_name}, "city", "map/" + city_name + "/" + feature.properties.pkey);
            showPane('#reportPane');
          }
        });
      },
      pointToLayer: (feature, latlng) => { //TODO: create separate class function
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: 'assets/icons/floodIcon.svg',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })
        });
      }
    });

    // Get data and add to layer
    return new Promise((resolve, reject) => {
      self.data.getData(url)
      .then((data) => {
        self.reports.addData(data);
        self.reports.addTo(self.map);
        resolve(data);
      })
      .catch(() => reject(null));
    });
  }

  // Function to remove reports from map, and clear layer
  removeReports(){
    var self = this;
    if (self.reports) {
      self.map.removeLayer(self.reports);
      self.reports = null;
    }
  }

  // Function to add flooded polygon layer for Jakarta to map
  addFloodExtents(city){

    // Create empty geojson layer with styles, as a global variable
    // Ask getData to get data with url
    // Add to map

    var self = this;

    self.flood_extents = L.geojson(null, {
      style: function(feature){
        switch (feature.properties.state) {
    			case 4: return {fillColor:"#CC2A41",weight:1,color:"#CC2A41", opacity:0.8,fillOpacity: 0.8};
    			case 3: return {fillColor:"#FF8300",weight:1,color:"#FF8300", opacity:0.8,fillOpacity: 0.8};
    			case 2: return {fillColor:"#FFFF00",weight:1,color:"#FFFF00", opacity:0.8,fillOpacity: 0.8};
    			case 1: return {fillColor:"#A0A9F7", weight:1,color:"#A0A9F7",opacity:0.8,fillOpacity: 0.8};
          default: return {color:"rgba(0,0,0,0)",weight:0,fillOpacity:0};
      }
    });

    var url = https://gist.githubusercontent.com/talltom/ed44510806135af2fe9c67f44cfd4ca1/raw/45854e009e1947b77b472c5e04a5208ad6e4497b/gistfile1.topojson
    // Get data and add to layer
    return new Promise((resolve, reject) => {
      self.data.getData(url)
      .then((data) => {
        self.flood_extents.addData(data);
        self.flood_extents.addTo(self.map);
        resolve(data);
      })
      .catch(() => reject(null));
    });

  }

  removeFloodExtents(){

    // Remove layer from map, referencing global variable defined in addFloodExtents()
  }


}
