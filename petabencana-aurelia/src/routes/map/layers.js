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
    this.reports = {}; // Layers
    this.popupContent = {};
    this.pkeyList = {};
  }

  // Get flood reports as topojson, return Leaflet geojson layer
  addReports(city_name, togglePane) {
    var self = this;

    return new Promise(function(resolve, reject) {
      let url = DATASERVER + 'reports.' + city_name + '.topojson';

      self.data.getData(url)
      .then(function(data) {
        self.reports = L.geoJSON(data, {
          onEachFeature: function(feature, layer) { //TODO: create separate class function
            self.pkeyList[feature.properties.pkey] = layer;
            layer.on({
              click: function() {
                self.popupContent = {};
                for (let prop in feature.properties) {
                  self.popupContent[prop] = feature.properties[prop];
                }
                self.map.flyTo(layer._latlng, 16);
                togglePane('close', '#watchPane');
                togglePane('open', '#reportPane');
              }
            });
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
        self.reports.addTo(self.map);
        resolve(data);
      }).catch((err) => {
        $.notify("Error fetching reports data", {style:"mapInfo", className:"error" });
        console.log('ERROR [layers.js] fetching reports data: '+JSON.stringify(err));
      });
    });
  }

  removeReports(){
    if (this.reports) {
      this.map.removeLayer(this.reports);
    }
  }
}
