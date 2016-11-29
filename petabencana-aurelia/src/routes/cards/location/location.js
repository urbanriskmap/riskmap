import * as L from 'leaflet';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class Location {
  constructor(ea) {
    Location.ea = ea; //scope of 'this' limited in cardMap.on functions, extending 'Location' object
    Location.inputs = {markerLocation: null, gpsLocation: null, accuracy: null}; //object to gather user as well as geolocate inputs
  }
  activate(params, routerConfig) {
    //Check for available inputs, when user navigates back to location card
    if (routerConfig.settings.input) {
      Location.inputs = routerConfig.settings.input;
    }
    //Get msg name from router settings
    Location.msgName = routerConfig.settings.msgName;
  }
  attached() {
    //Add leaflet map
    var cardMap = L.map('mapWrapper');
    L.tileLayer('https://api.mapbox.com/styles/v1/asbarve/ciu0anscx00ac2ipgyvuieuu9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
    }).addTo(cardMap);

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
          if (Location.inputs.gpsLocation) {
            cardMap.flyTo(Location.inputs.gpsLocation, 16);
          }
        };
        return container;
      }
    });
    L.control.geoLocate = function(opts) {
      return new L.Control.GeoLocate(opts);
    };

    //If previous inputs available, setView to user selected location
    if (Location.inputs.markerLocation) {
      cardMap.setView(Location.inputs.markerLocation, 16);
      //If previous geolocation inputs available, add circle markers at gps location
      if (Location.inputs.gpsLocation) {
        L.control.geoLocate({position: 'bottomright'}).addTo(cardMap);
        L.circle(Location.inputs.gpsLocation, {
          weight: 0,
          fillColor: '#31aade',
          fillOpacity: 0.15,
          radius: Location.inputs.accuracy / 2
        }).addTo(cardMap);
        L.circleMarker(Location.inputs.gpsLocation, {
          color: 'white',
          weight: 1,
          fillColor: '#31aade',
          fillOpacity: 1,
          radius: 8
        }).addTo(cardMap);
      }
    } else {
      //If previous inputs unavailable, i.e. initial load; try geolocation
      cardMap.locate({
        setView: false
      });
      cardMap.on('locationfound', function(e) {
        cardMap.setView(e.latlng, 16);
        L.control.geoLocate({position: 'bottomright'}).addTo(cardMap);
        L.circle(e.latlng, {
          weight: 0,
          fillColor: '#31aade',
          fillOpacity: 0.15,
          radius: e.accuracy / 2
        }).addTo(cardMap);
        L.circleMarker(e.latlng, {
          color: 'white',
          weight: 1,
          fillColor: '#31aade',
          fillOpacity: 1,
          radius: 8
        }).addTo(cardMap);
        Location.inputs = {markerLocation: e.latlng, gpsLocation: e.latlng, accuracy: e.accuracy};
        Location.ea.publish(Location.msgName, Location.inputs);
      });
      //If geolocation unavailable, go to default city center; TODO: get input for city center
      //based on twitter location. eg. if tweet location = surbaya, setView to default surbaya center
      cardMap.on('locationerror', function () {
        cardMap.setView([-6.2, 106.83], 16);
        Location.inputs.markerLocation = cardMap.getCenter();
        Location.ea.publish(Location.msgName, Location.inputs);
      });
    }

    //Get map center (corresponding to overlaid marker image) if user pans map
    cardMap.on('moveend', function () {
      if (cardMap) {
        Location.inputs.markerLocation = cardMap.getCenter();
        Location.ea.publish(Location.msgName, Location.inputs);
      }
    });
  }
}
