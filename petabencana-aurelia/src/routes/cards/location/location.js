/* jshint esversion: 6 */
import * as L from 'leaflet';

export class Location {
  constructor() {
  }

  attached() {
    let cardMap = L.map('mapWrapper');
    L.tileLayer('https://api.mapbox.com/styles/v1/asbarve/ciu0anscx00ac2ipgyvuieuu9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(cardMap);
    cardMap.locate({
      setView: true,
      zoom: 12
      //set min/max zoom here
      //watch: true
    });
    cardMap.on('locationfound', function (e) {
      L.circle(cardMap.getCenter(), {
        weight: 0,
        fillColor: 'green',
        fillOpacity: 0.15,
        radius: e.accuracy / 2
      }).addTo(cardMap);
      L.circleMarker(cardMap.getCenter(), {
        color: 'white',
        weight: 1,
        fillColor: 'green',
        fillOpacity: 1,
        radius: 8
      }).addTo(cardMap);
      Location.center = cardMap.getCenter();
    });
    cardMap.on('locationerror', function () {
      cardMap.setView([-6.2, 106.83], 10);
      //set min/max zoom here
      Location.center = cardMap.getCenter();
    });
    cardMap.on('moveend', function () {
      Location.center = cardMap.getCenter();
    });
  }

  get selectedLocation() {
    if (Location.center) {
      return Location.center;
    }
  }
}
