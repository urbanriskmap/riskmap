import $ from 'jquery';
import * as L from 'leaflet';

export class DisasterMap {
  attached() {
    // Initialize leaflet map
    this.map = L.map('mapContainer', {
      attributionControl: false, //include in side pane
      center: [-7, 110],
      zoom: 8,
      minZoom: 8
    });

    // Add base tile layers
    L.tileLayer(this.config.tile_layer, {
      detectRetina: false,
      subdomains: 'abcd',
      ext: 'png'
    }).addTo(this.map);
  }
}
