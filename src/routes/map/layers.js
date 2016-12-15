import {Data} from './data';
let DATASERVER = 'https://data.petabencana.id/';
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

  // Get flood reports as topojson, return Leaflet geojson layer
  addReports(city_name, city_region, togglePane) {
    let url = DATASERVER + 'reports/?city=' + city_region;
    var self = this;
    return new Promise((resolve, reject) => {
      self.data.getData(url)
      .then((data) => {
        self.reports = L.geoJSON(data, {
          onEachFeature: (feature, layer) => { //TODO: create separate class function
            self.pkeyList[feature.properties.pkey] = layer;
            layer.on({
              click: () => {
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
        self.reports.addTo(self.map);
        resolve(data);
      })
      .catch(() => reject(null));
    });
  }

  removeReports(){
    if (this.reports) {
      this.map.removeLayer(this.reports);
    }
  }
}
