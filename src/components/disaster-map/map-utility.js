//Utility functions for manipulating DOM elements & disaster-map view-model

import {inject, noView} from 'aurelia-framework';
import * as L from 'leaflet';
import {Config} from 'resources/config';
import {notify} from 'notifyjs-browser'; //Jquery plugin

$.notify.addStyle('mapInfo', {
  html: "<div id=notification><span data-notify-text/></div>",
  classes: {
    info: {
      "background-color": "rgba(0, 0, 0, 0.5)",
    },
    error: {
      "background-color": "rgba(255, 0, 0, 0.4)",
    }
  }
});

//start-non-standard
@noView
@inject(Config)
//end-non-standard
export class MapUtility {
  constructor(Config) {
    this.config = Config.map;
  }

  parseCityName(region_code, cities) {
    var self = this;
    for (var i = 0; i < cities.length; i+=1) {
      if (self.parseCityObj(cities[i]).region === region_code) {
        return cities[i];
      } else {
        return null;
      }
    }
  }

  // parse a city name (string) to return its instance region properties (object)
  parseCityObj(city_name) {
    var self = this;
    if (!city_name) {
      // null, undefined
      $('#screen').show();
      return self.config.default_region;
    } else if (city_name in self.config.instance_regions) {
      // supported city
      $('#screen').hide();
      return self.config.instance_regions[city_name];
    } else {
      // invalid city
      $('#screen').show();
      return self.config.default_region;
    }
  }

  // Change city from within map without reloading window
  changeCity(city_name, report_id, map, layers, togglePane) {
    var self = this,
        cityObj = self.parseCityObj(city_name);
    // Remove previous layers
    layers.removeFloodExtents(map);
    layers.removeFloodGauges(map);
    // Fly to new city bounds
    map.flyToBounds([cityObj.bounds.sw, cityObj.bounds.ne])
    .once('moveend zoomend', (e) => {
      map.setMaxBounds([cityObj.bounds.sw, cityObj.bounds.ne]);
    });
    // Add new layers
    if (cityObj.region !== 'java') {
      layers.addFloodExtents(self.parseCityObj(city_name).region, map);
      layers.addFloodGauges(city_name, self.parseCityObj(city_name).region, map, togglePane);
      return layers.addReports(city_name, self.parseCityObj(city_name).region, map, togglePane);
    } else {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }

  noReportNotification(city_name, report_id) {
    if (report_id && city_name) {
      $.notify("Report id: " + report_id + " not found in " + city_name, {style:"mapInfo", className:"info"});
    } else if (city_name) {
      $.notify("No reports found for " + city_name, {style:"mapInfo", className:"info"});
    } else if (!city_name) {
      $.notify('Unsupported city', {style:"mapInfo", className:"error"});
    }
  }

  onLocationFound(e) {
    var self = this,
        regions = self.config.instance_regions;
    self.clientLocation = e;
    for (let city in regions) {
      self.clientCityIsValid = false;
      if (e.latitude > regions[city].bounds.sw[0] && e.longitude > regions[city].bounds.sw[1] && e.latitude < regions[city].bounds.ne[0] && e.longitude < regions[city].bounds.ne[1]) {
        self.clientCity = city;
        self.clientCityIsValid = true;
        break;
      }
    }
  }

  drawGpsMarkers(center, accuracy, map) {
    this.gpsAccuracy = L.circle(center, {
      weight: 0,
      fillColor: '#31aade',
      fillOpacity: 0.15,
      radius: accuracy / 2
    });
    this.gpsMarker = L.circleMarker(center, {
      color: 'white',
      weight: 1,
      fillColor: '#31aade',
      fillOpacity: 1,
      radius: 8
    });
    this.gpsAccuracy.addTo(map);
    this.gpsMarker.addTo(map);
  }

  viewClientLocation(map, layers, togglePane) {
    var self = this;
    if (self.clientLocation) {
      if (self.clientCityIsValid) {
        //case 1: location found, location in a supported city
        self.changeCity(self.clientCity, null, map, layers, true, togglePane);
        map.flyTo(self.clientLocation.latlng, 15);
        if (self.gpsMarker) {
          self.gpsMarker.removeFrom(map);
          self.gpsAccuracy.removeFrom(map);
        }
        map.once('moveend', () => { //execute only once, after fly to location ends, ignores user map drag events
          self.drawGpsMarkers(self.clientLocation.latlng, self.clientLocation.accuracy, map);
        });
      } else {
        //case 2: location found, but not in supported city
        $.notify("Location out of bounds", {style:"mapInfo", className:"info"});
      }
    } else {
      //case 3: location not found
      $.notify("GPS location not found", {style:"mapInfo", className:"error"});
    }
  }

  // Geolocation control button element & style
  geolocateContainer(map, layers, togglePane) {
    var self = this;
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.innerHTML = '<i class="icon-geolocate"></i>';
    container.style.fontSize = '22px';
    container.style.textAlign = 'center';
    container.style.lineHeight = '30px';
    container.style.backgroundColor = 'white';
    container.style.width = '30px';
    container.style.height = '30px';
    container.onclick = () => {
      self.viewClientLocation(map, layers, togglePane);
    };
    return container;
  }
}
