import * as config from '../config'; // Cards config
import * as L from 'leaflet';
import {inject} from 'aurelia-framework';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Location {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    this.config = config;
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
    $(document).ready(() => {

      var self = this;

      //Add leaflet map
      var cardMap = L.map('mapWrapper', {
        attributionControl: false
      });
      L.tileLayer(self.config.tile_layer, {
        detectRetina: true,
        ext: 'png'
      }).addTo(cardMap);

      //Add custom leaflet control, to navigate back to browser located user location
      L.Control.GeoLocate = L.Control.extend({
        onAdd: function (map) {
          var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          //container.innerHTML = '&#xe804;';
          container.innerHTML = '<i class="icon-geolocate"></i>';
          //container.style.fontFamily = 'icons';
          container.style.fontSize = '15px';
          container.style.color = 'black';
          container.style.backgroundColor = 'white';
          //container.style.backgroundImage = 'url(assets/icons/geolocate.svg)';
          container.style.backgroundSize = '30px 30px';
          container.style.width = '30px';
          container.style.height = '30px';
          container.onclick = function() {
            if (self.reportcard.location.gpsLocation) {
              cardMap.flyTo(self.reportcard.location.gpsLocation, 16);
            }
          };
          return container;
        }
      });
      L.control.geoLocate = function(opts) {
        return new L.Control.GeoLocate(opts);
      };

      //If previous inputs available, setView to user selected location
      if (self.reportcard.location.markerLocation) {
        cardMap.setView(self.reportcard.location.markerLocation, 16);
        //If previous geolocation inputs available, add circle markers at gps location
        if (self.reportcard.location.gpsLocation) {
          L.control.geoLocate({position: 'bottomright'}).addTo(cardMap);
          self.drawGpsMarkers(self.reportcard.location.gpsLocation, self.reportcard.location.accuracy, cardMap);
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
          self.reportcard.location = {markerLocation: e.latlng, gpsLocation: e.latlng, accuracy: e.accuracy};
        });

        //If geolocation unavailable, go to default city center;
        cardMap.on('locationerror', function () {
          cardMap.setView([-6.2, 106.83], 16);
          self.reportcard.location.markerLocation = cardMap.getCenter();
        });
      }

      //Get map center (corresponding to overlaid marker image) if user pans map
      cardMap.on('moveend', function () {
        if (cardMap) {
          self.reportcard.location.markerLocation = cardMap.getCenter();
        }
      });
    });
  }
}
