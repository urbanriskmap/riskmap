import * as L from 'leaflet';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Location {
  constructor(ea) {
    Location.ea = ea; //scope of 'this' limited in cardMap.on functions, using 'Location' (debug)
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.userLocation = routerConfig.settings.input;
    }
    Location.msgName = routerConfig.settings.msgName;
  }
  attached() {
    let cardMap = L.map('mapWrapper');
    L.tileLayer('https://api.mapbox.com/styles/v1/asbarve/ciu0anscx00ac2ipgyvuieuu9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(cardMap);
    if (this.userLocation) {
      cardMap.setView(this.userLocation, 12);
      Location.ea.publish(Location.msgName, this.userLocation);
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
        Location.ea.publish(Location.msgName, cardMap.getCenter());
      });
      cardMap.on('locationerror', function () {
        cardMap.setView([-6.2, 106.83], 10);
        Location.ea.publish(Location.msgName, cardMap.getCenter());
      });
    }
    cardMap.on('moveend', function () {
      if (cardMap) {
        Location.ea.publish(Location.msgName, cardMap.getCenter());
      }
    });
  }
  markerDrag(e) { //TODO: debug
    e.preventDefault();
  }
}
