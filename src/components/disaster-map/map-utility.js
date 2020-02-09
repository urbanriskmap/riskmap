//Utility functions for manipulating DOM elements & disaster-map view-model

import { inject, noView } from 'aurelia-framework';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Config } from 'resources/config';
import { LocationService } from './location-service';
import { notify } from 'notifyjs-browser'; //Jquery plugin

$.notify.addStyle('mapInfo', {
  html: '<div id=notification><span data-notify-text/></div>',
  classes: {
    info: {
      'background-color': 'rgba(0, 0, 0, 0.5)'
    },
    error: {
      'background-color': 'rgba(255, 0, 0, 0.4)'
    }
  }
});

//start-aurelia-decorators
@noView
@inject(Config, LocationService)
//end-aurelia-decorators
export class MapUtility {
  constructor(Config, LocationService) {
    this.config = Config.map;
    this.locService = LocationService;
  }

  // return boolean only
  isCitySupported(querycity) {
    return querycity in this.config.instance_regions;
  }
  isRegionSupported(queryRegion) {
    return queryRegion in this.config.sub_regions;
  }

  // return city name from code
  parseCityName(regionCode, cities) {
    let self = this;
    for (let city of cities) {
      if (self.parseCityObj(city, false).region === regionCode) {
        return city;
      }
      return null;

    }
  }

  // parse a city name (string) to return its instance region properties (object)
  parseCityObj(cityName, notify) {
    let self = this;
    if (!cityName) {
      // null, undefined

      $('#screen').show();
      $('#cityPopup').show();
      $('#report').show();
      return self.config.default_region;
    } else if (self.isCitySupported(cityName)) {

      // supported city
      $('#screen').css('z-index', 'auto');
      $('#dropdown_city').hide();
      $('#search_city_input').val('');
      return self.config.instance_regions[cityName];
    } else if (!self.isCitySupported(cityName)) {
      // invalid city
      if (notify) {
        $('#screen').show();
        $('#cityPopup').show();
        $('#report').show();
      }
      return self.config.default_region;
    }
  }

  // parse region name to return target city

  parseRegion(regionName) {
    let self = this;
    let defaultRegion = 'java';

    if (!regionName) {
      return defaultRegion;
    } else if (self.isRegionSupported(regionName)) {
      return self.config.sub_regions[regionName];
    } 
    // invalid region
    return defaultRegion;
  }

  // Change to target province when searched with sub region

  changeRegion(regionName) {
    let self = this;
    let city = self.parseRegion(regionName);
    self.changeCity(city, true);

  }

  // Change city from within map without reloading window
  changeCity(cityName, reportId, map, layers, togglePane) {
    let self = this;
    let cityObj = self.parseCityObj(cityName, true);
    // Remove previous layers
    layers.removeFloodExtents(map);
    layers.removeFloodGauges(map);
    // Fly to new city bounds
    // map.flyToBounds([cityObj.bounds.sw, cityObj.bounds.ne])
    map.flyTo(cityObj.center, 12)
    .once('moveend zoomend', (e) => {
      map.setMaxBounds([cityObj.bounds.sw, cityObj.bounds.ne]);
      });
    // L.rectangle([cityObj.bounds.sw, cityObj.bounds.ne], {color: '#ff7800', weight: 1}).addTo(map);
    // Add new layers
    if (cityObj.region !== 'java') {
      layers.addFloodExtents(cityName, self.parseCityObj(cityName, false).region, map, togglePane);
      layers.addFloodGauges(cityName, self.parseCityObj(cityName, false).region, map, togglePane);
      return layers.addReports(cityName, self.parseCityObj(cityName, false).region, map, togglePane);
    }
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  //reports received in timeperiod popup
  statsNotification(msg) {
    $.notify(msg, { style: 'mapInfo', className: 'info', position: 'top center' });
  }

  noReportNotification(cityName, reportId) {
    if (reportId && cityName) {
      $.notify('Report id: ' + reportId + ' not found in ' + cityName, { style: 'mapInfo', className: 'info', position: 'top center' });
    } else if (cityName) {
      $.notify('No reports found for ' + cityName, { style: 'mapInfo', className: 'info', position: 'top center' });
    } else {
      $.notify('Unsupported city', { style: 'mapInfo', className: 'error', position: 'top center' });
    }
  }

  onLocationFound(e) {
    let self = this;
    let regions = self.config.instance_regions;
    self.clientLocation = e;
    let clientCities = [];
    for (let city in regions) {
      self.clientCityIsValid = false;
      if (e.latitude > regions[city].bounds.sw[0] && e.longitude > regions[city].bounds.sw[1] && e.latitude < regions[city].bounds.ne[0] && e.longitude < regions[city].bounds.ne[1]) {
        self.clientCity = city;
        clientCities.push(regions[city].region);
        self.clientCityIsValid = true;
        // break;
      }
      if (clientCities.length > 1) {
        self.locService.filterPointInCities(e, clientCities).then( city => {
          self.clientCity = city;
        });
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
    let self = this;
    console.log(self.clientLocation);
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
        $.notify('Location out of bounds', { style: 'mapInfo', className: 'info', position: 'top center' });
      }
    } else {
      //case 3: location not found
      $.notify('GPS location not found', { style: 'mapInfo', className: 'error', position: 'top center' });
    }
  }

  // Geolocation control button element & style
  geolocateContainer(map, layers, togglePane) {
    let self = this;
    let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.innerHTML = '<i class="icon-geolocate"></i>';
    container.style.fontSize = '22px';
    container.style.textAlign = 'center';
    container.style.lineHeight = '30px';
    container.style.zIndex = '1035';
    container.style.backgroundColor = 'white';
    container.style.width = '35px';
    container.style.height = '35px';
    container.style.cursor = 'pointer';
    container.onclick = () => {
      self.viewClientLocation(map, layers, togglePane);
    };
    return container;
  }
}
