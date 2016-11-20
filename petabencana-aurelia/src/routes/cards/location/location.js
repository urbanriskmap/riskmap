import * as L from 'leaflet';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class Location {
  constructor(ea) {
    Location.ea = ea; //scope of 'this' limited in cardMap.on functions, using 'Location' (debug)
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.userLocation = routerConfig.settings.input;
    }
  }
  attached() {
    let cardMap = L.map('mapWrapper');
    let markerIcon = L.icon({
      iconUrl: 'dist/svg/marker-03.svg', //URL not working
      iconSize: [60, 60],
      iconAnchor: [30, 60]
    });
    let marker;
    L.tileLayer('https://api.mapbox.com/styles/v1/asbarve/ciu0anscx00ac2ipgyvuieuu9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(cardMap);
    if (this.userLocation) {
      cardMap.setView(this.userLocation, 12);
      marker = L.marker(this.userLocation, {icon: markerIcon}).addTo(cardMap);
      Location.ea.publish('changedLocation', this.userLocation);
    } else {
      cardMap.locate({
        setView: true,
        zoom: 12
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
        marker = L.marker(cardMap.getCenter(), {icon: markerIcon}).addTo(cardMap);
        Location.ea.publish('changedLocation', cardMap.getCenter());
      });
      cardMap.on('locationerror', function () {
        cardMap.setView([-6.2, 106.83], 10);
        Location.ea.publish('changedLocation', cardMap.getCenter());
      });
    }
    cardMap.on('moveend', function () {
      if (cardMap && marker) {
        cardMap.removeLayer(marker);
        marker = L.marker(cardMap.getCenter(), {icon: markerIcon}).addTo(cardMap);
        Location.ea.publish('changedLocation', cardMap.getCenter());
      }
    });
  }
}
