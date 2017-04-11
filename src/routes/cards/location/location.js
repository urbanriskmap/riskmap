import {Config} from 'resources/config'; // Cards config
import * as L from 'leaflet';
import {inject} from 'aurelia-framework';
import {ReportCard} from 'resources/report-card';
import {EventAggregator} from 'aurelia-event-aggregator';

//start-non-standard
@inject(EventAggregator, ReportCard, Config)
//end-non-standard
export class Location {
  constructor(EventAggregator, ReportCard, Config) {
    this.ea = EventAggregator;
    this.reportcard = ReportCard;
    this.tileLayer = Config.cards.tile_layer;
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
      self.map = L.map('mapWrapper', {
        attributionControl: false,
        center: [-6.1754, 106.8271],
        zoom: 15
      });
      L.tileLayer(self.tileLayer, {
        detectRetina: true,
        ext: 'png'
      }).addTo(self.map);

      //Add custom leaflet control, to navigate back to browser located user location
      L.Control.GeoLocate = L.Control.extend({
        onAdd: function (map) {
          var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          container.innerHTML = '<i class="icon-geolocate"></i>';
          container.style.fontSize = '21px';
          container.style.textAlign = 'center';
          container.style.lineHeight = '30px';
          container.style.color = 'black';
          container.style.backgroundColor = 'white';
          container.style.width = '30px';
          container.style.height = '30px';
          container.onclick = function() {
            if (self.reportcard.location.gpsLocation) {
              self.map.flyTo(self.reportcard.location.gpsLocation, 16);
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
        self.map.setView(self.reportcard.location.markerLocation, 15);
        //If previous geolocation inputs available, add circle markers at gps location
        if (self.reportcard.location.gpsLocation) {
          L.control.geoLocate({position: 'bottomright'}).addTo(self.map);
          self.drawGpsMarkers(self.reportcard.location.gpsLocation, self.reportcard.location.accuracy, self.map);
        }
      } else if (!!navigator.geolocation) {
        //If previous inputs unavailable, i.e. at session start; try geolocation if supported by browser
        self.map.locate({
          setView: true
        });
        self.map.on('locationfound', (e) => {
          L.control.geoLocate({position: 'bottomright'}).addTo(self.map);
          self.drawGpsMarkers(e.latlng, e.accuracy, self.map);
          self.reportcard.location = {markerLocation: e.latlng, gpsLocation: e.latlng, accuracy: e.accuracy};
        });
        //If geolocation unavailable, go to default city center;
        self.map.on('locationerror', () => {
          self.reportcard.location.markerLocation = self.map.getCenter();
          self.ea.publish('geolocate', 'error');
        });
      } else {
        //Go to default city center if geolocation not supported by browser
        self.reportcard.location.markerLocation = self.map.getCenter();
      }

      //Get map center (corresponding to overlaid marker image) if user pans map
      self.map.on('moveend', () => {
        if (self.map) {
          self.reportcard.location.markerLocation = self.map.getCenter();
        }
      });
    });
  }
}
