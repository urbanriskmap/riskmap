import {Data} from './data';
let DATASERVER = 'https://data.petabencana.id/';
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
  addReports(city_name, city_region, togglePane) {
    let url = DATASERVER + 'reports/?city=' + city_region;
    console.log(url);
    var that = this;

    return this.data.getData(url)
    .then(function(data) {
      that.layers.reports = L.geoJSON(data, {
        onEachFeature: function(feature, layer) { //TODO: create separate class function
          layer.on({
            click: function() {
              that.popupContent = {};
              for (let prop in feature.properties) {
                that.popupContent[prop] = feature.properties[prop];
              }
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
      return that.layers.reports
      .addTo(that.map);
    }).catch((err) => {
      $.notify("Error fetching reports data", {style:"mapInfo", className:"error" });
      console.log('ERROR [layers.js] fetching reports data: '+JSON.stringify(err));
    });
  }

  removeReports(){
    if (this.layers.reports) {
      this.map.removeLayer(this.layers.reports);
    }
  }
}
