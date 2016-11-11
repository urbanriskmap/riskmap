import * as L from 'leaflet';

export class Map {
  constructor() {
    this.title = "Map Page";
    this.subtitle = `${this.title} Sub`;
  }

  /*attached() {
    let map = L.map('mapid').setView([51.505, -0.09], 13);
    let urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    map.addLayer(L.tileLayer(urlTemplate, { minZoom: 4 }));
  }*/
}
