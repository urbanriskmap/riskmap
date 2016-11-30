import {Data} from './data';
let DATASERVER = 'https://raw.githubusercontent.com/urbanriskmap/sampledata/master/';

// PetaBencana.id Layers class - manage leaflet data layers
export class Layers {

  constructor(leafletMap){
    this.map = leafletMap
    this.data = new Data; // Data class
    this.layers = {}; // Layers
  }

  // Get flood reports as topojson, return Leaflet geojson layer
  addReports(city_name){

    let url = DATASERVER + '/reports.' + city_name + '.geojson';

    this.layers.reports = L.geoJSON();
    var that = this;

    return this.data.getData(url)
      .then(function(data){
        that.layers.reports.addData(data).addTo(that.map);
      })
      .catch((err) => console.log(err))
  }

  removeReports(){
    if (this.layers.reports){this.map.removeLayer(this.layers.reports)}
  }
}
