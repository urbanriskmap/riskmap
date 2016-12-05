import {Data} from './data';
let DATASERVER = 'https://raw.githubusercontent.com/urbanriskmap/sampledata/master/';

// PetaBencana.id Layers class - manage leaflet data layers
export class Layers {
  constructor(leafletMap) {
    this.map = leafletMap;
    this.data = new Data(); // Data class
    this.layers = {}; // Layers
    this.popupContent = {};
  }

  // Get flood reports as topojson, return Leaflet geojson layer
  addReports(city_name, openPane) {
    let url = DATASERVER + 'reports.' + city_name + '.topojson';
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
              openPane('open', '#reportPane');
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
    }).catch((err) => console.log(err));
  }

  removeReports(){
    if (this.layers.reports) {
      this.map.removeLayer(this.layers.reports);
    }
  }
}
