import {Data} from './data';
let DATASERVER = 'https://raw.githubusercontent.com/urbanriskmap/sampledata/master/';

// PetaBencana.id Layers class - manage leaflet data layers
export class Layers {
  constructor(leafletMap) {
    this.map = leafletMap;
    this.data = new Data(); // Data class
    this.layers = {}; // Layers
    this.popupContent = [];
  }

  // Get flood reports as topojson, return Leaflet geojson layer
  addReports(city_name, openPane) {
    let url = DATASERVER + 'reports.' + city_name + '.geojson';
    var that = this;

    return this.data.getData(url)
    .then(function(data) {
      that.layers.reports = L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
          layer.on({
            click: function() {
              openPane();
              that.popupContent = [];
              for (let prop in feature.properties) {
                that.popupContent.push(prop);
              }
            }
          });
        },
        pointToLayer: function(feature, latlng) {
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: 'assets/icons/marker.svg',
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
