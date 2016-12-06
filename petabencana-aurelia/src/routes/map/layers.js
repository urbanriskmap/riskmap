import {Data} from './data';
let DATASERVER = 'https://raw.githubusercontent.com/urbanriskmap/sampledata/master/';
import $ from 'jquery';
import {notify} from 'notifyjs-browser'; //Jquery plugin

$.notify.addStyle('mapInfo', {
  html: "<div><span data-notify-text/></div>",
  classes: {
    info: {
      "font-family": "Arial, sans-serif",
      "white-space": "nowrap",
      "background-color": "gray",
      "padding": "5px"
    },
    error: {
      "color": "white",
      "background-color": "red"
    }
  }
});

// PetaBencana.id Layers class - manage leaflet data layers
export class Layers {
  constructor(leafletMap) {
    this.map = leafletMap;
    this.data = new Data(); // Data class
    this.layers = {}; // Layers
    this.popupContent = {};

  }

  // Get flood reports as topojson, return Leaflet geojson layer
  addReports(city_name, togglePane) {
    var self = this;
    var reports_layer;
    var markerMap = {};

    return new Promise( function(resolve, reject){
      let url = DATASERVER + 'reports.' + city_name + '.topojson';

      self.data.getData(url)
      .then(function(data) {
        reports_layer = L.geoJSON(data, {
          onEachFeature: function(feature, layer) { //TODO: create separate class function
            layer.on({
              click: function() {
                self.popupContent = {};
                for (let prop in feature.properties) {
                  self.popupContent[prop] = feature.properties[prop];
                }
                togglePane('close', '#watchPane');
                togglePane('open', '#reportPane');
              }
            });
            markerMap[feature.pkey] = layer;
            console.log(feature.pkey)
          },
          pointToLayer: function(feature, latlng) { //TODO: create separate class function
            return L.marker(latlng, {
              icon: L.icon({
                iconUrl: 'assets/icons/floodIcon.svg',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              })
            });
          }
        });
        console.log(markerMap)
        reports_layer.markerMap = markerMap;

        reports_layer.addTo(self.map)
        resolve(reports_layer);
      }).catch((err) => {
        $.notify("Error fetching reports data", {style:"mapInfo", className:"error" });
        console.log('ERROR [layers.js] fetching reports data: '+JSON.stringify(err));
      });
    })
  }

  removeReports(){
    if (this.layers.reports) {
      this.map.removeLayer(this.layers.reports);
    }
  }
}
