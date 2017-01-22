//Utility functions for manipulating DOM elements & disaster-map view-model

import {inject, noView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';
import * as L from 'leaflet';
import {Config} from 'resources/config';

//start-non-standard
@noView
@inject(Config)
//end-non-standard
export class MapUtility {
  constructor(Config) {
    this.config = Config.map;
  }

  //Get topojson data from server, return geojson
  getData(url) {
    let client = new HttpClient();
    return new Promise((resolve, reject) => {
      client.get(url)
      .then(data => {
        var topology = JSON.parse(data.response);
        if(topology.statusCode === 200) {
          var topoJson = topology.result;
          if(topoJson && topoJson.objects !== null) {
            resolve(topojson.feature(topoJson, topoJson.objects.output));
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  parseCityName(regionCode, cities) {
    var self = this;
    for (var i = 0; i < cities.length; i+=1) {
      if (self.parseCityObj(cities[i]).region === regionCode) {
        return cities[i];
      } else {
        return null;
      }
    }
  }

  // parse a city name (string) to return its instance region properties (object)
  parseCityObj(cityName) {
    var self = this;
    if (!!cityName) {
      // null, undefined
      return self.config.default_region;
    } else if (cityName in self.config.instance_regions) {
      // supported city
      return self.config.instance_regions[cityName];
    } else {
      // invalid city
      $.notify('Unsupported city: ' + cityName, {style:"mapInfo", className:"error"});
      return self.config.default_region;
    }
  }

  // Change city from within map without reloading window
  changeCity(cityName, reportid, map, layers, pushState) {
    var self = this,
        cityObj = self.parseCityObj(cityName);
    // Remove previous layers
    layers.removeReports();
    layers.removeFloodExtents();
    // Fly to new city bounds
    map.flyToBounds([cityObj.bounds.sw, cityObj.bounds.ne]);
      /*.once('moveend zoomend', (e) => {
        this.map.setMaxBounds([cityObj.bounds.sw, cityObj.bounds.ne]);
      });*/
    // Update browser url to match map state
    if (pushState) {
      if (reportid) {
        history.pushState({city: cityName, report_id: reportid}, 'city', "map/" + cityName + "/" + reportid);
      } else if (cityObj.region === 'java') {
        history.pushState({city: null, report_id: null}, 'city', "map");
      } else {
        history.pushState({city: cityName, report_id: null}, 'city', "map/" + cityName);
      }
    }
    // Add new layers
    if (cityObj.region !== 'java') {
      layers.addFloodExtents();
      return layers.addReports();
    } else {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }

  noReportsNotification(cityName) {
    $.notify("No reports found for " + cityName, {style:"mapInfo", className:"info" });
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

  viewClientLocation(map) {
    var self = this;
    if (self.clientLocation) {
      if (self.clientCityIsValid) {
        //case 1: location found, location in a supported city
        map.flyTo(self.clientLocation.latlng, {
          zoom: 15,
          duration: 1
        });
        if (self.gpsMarker) {
          self.gpsMarker.removeFrom(map);
          self.gpsAccuracy.removeFrom(map);
        }
        map.once('moveend', () => { //execute only once, after fly to location ends, ignores user map drag events
          self.drawGpsMarkers(self.clientLocation.latlng, self.clientLocation.accuracy, map);
        });
        //*** EDIT function name ***
        self.changeCity(self.clientCity, true);
        return null;
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
  geolocateContainer(map) {
    var self = this;
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.innerHTML = '<i class="icon-geolocate"></i>';
    container.style.fontSize = '21px';
    container.style.textAlign = 'center';
    container.style.lineHeight = '28px';
    container.style.color = 'black';
    container.style.backgroundColor = 'white';
    container.style.width = '30px';
    container.style.height = '30px';
    container.onclick = () => {
      self.viewClientLocation(map);
    };
    return container;
  }

  attached() {
    var self = this;

  }

}
