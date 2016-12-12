import * as L from 'leaflet';
import {inject} from 'aurelia-framework';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Location {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    var reportCardLocation = this.reportcard.getlocation();
    if (reportCardLocation) { //Check for available inputs, when user navigates back to location card
      this.inputs = reportCardLocation;
    } else {
      //object to gather user as well as geolocate inputs
      this.inputs = {markerLocation: null, gpsLocation: null, accuracy: null};
    }
  }

  drawGpsMarkers(center, accuracy, map) {
    L.circle(center, {
      weight: 0,
      fillColor: '#31aade',
      fillOpacity: 0.15,
      radius: accuracy / 2
    }).addTo(map);
    L.circleMarker(center, {
      color: 'white',
      weight: 1,
      fillColor: '#31aade',
      fillOpacity: 1,
      radius: 8
    }).addTo(map);
  }

  attached() {
    //Add leaflet map
    var cardMap = L.map('mapWrapper');
    L.tileLayer('https://api.mapbox.com/styles/v1/urbanriskmap/ciwce3tim00532pocrokb7ojf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXJiYW5yaXNrbWFwIiwiYSI6ImNpdmVhbTFraDAwNHIyeWw1ZDB6Y2hhbTYifQ.tpgt1PB5lkJ-wITS02c96Q', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
      detectRetina: true
    }).addTo(cardMap);

    var self = this;

    //Add custom leaflet control, to navigate back to browser located user location
    L.Control.GeoLocate = L.Control.extend({
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.style.backgroundColor = 'white';
        container.style.backgroundImage = 'url(assets/icons/geolocate.svg)';
        container.style.backgroundSize = '30px 30px';
        container.style.width = '30px';
        container.style.height = '30px';
        container.onclick = function() {
          if (self.inputs.gpsLocation) {
            cardMap.flyTo(self.inputs.gpsLocation, 16);
          }
        };
        return container;
      }
    });
    L.control.geoLocate = function(opts) {
      return new L.Control.GeoLocate(opts);
    };

    //If previous inputs available, setView to user selected location
    if (self.inputs.markerLocation) {
      cardMap.setView(self.inputs.markerLocation, 16);
      //If previous geolocation inputs available, add circle markers at gps location
      if (self.inputs.gpsLocation) {
        L.control.geoLocate({position: 'bottomright'}).addTo(cardMap);
        self.drawGpsMarkers(self.inputs.gpsLocation, self.inputs.accuracy, cardMap);
      }
    } else {

      //If previous inputs unavailable, i.e. at session start; try geolocation
      cardMap.locate({
        setView: false
      });
      cardMap.on('locationfound', function(e) {
        cardMap.setView(e.latlng, 16);
        L.control.geoLocate({position: 'bottomright'}).addTo(cardMap);
        self.drawGpsMarkers(e.latlng, e.accuracy, cardMap);
        self.inputs = {markerLocation: e.latlng, gpsLocation: e.latlng, accuracy: e.accuracy};
        self.reportcard.setlocation(self.inputs);
      });

      //If geolocation unavailable, go to default city center;
      cardMap.on('locationerror', function () {
        cardMap.setView([-6.2, 106.83], 16);
        self.inputs.markerLocation = cardMap.getCenter();
        self.reportcard.setlocation(self.inputs);
      });
    }

    //Get map center (corresponding to overlaid marker image) if user pans map
    cardMap.on('moveend', function () {
      if (cardMap) {
        self.inputs.markerLocation = cardMap.getCenter();
        self.reportcard.setlocation(self.inputs);
      }
    });
  }
}
