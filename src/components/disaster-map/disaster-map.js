import {inject, bindable, customElement} from 'aurelia-framework';
import $ from 'jquery';
import * as L from 'leaflet';
import {MapLayers} from './map-layers';
import {MapUtility} from './map-utility';

//start-non-standard
@customElement('disaster-map')
@inject(MapLayers, MapUtility)
//end-non-standard
export class DisasterMap {
//start-non-standard
@bindable selcity;
@bindable reportid;
//end-non-standard

  constructor(MapLayers, MapUtility) {
    this.layers = MapLayers;
    this.utility = MapUtility;
    this.cities = [];
    for (let city in this.utility.config.instance_regions) {
      this.cities.push(city);
    }
  }

  // Load all reports for a given city, or zoom to single queried report id
  viewReports(cityName, pushState) {
    var self = this;
    self.utility.changeCity(cityName, self.reportid, self.map, self.layers, pushState)
    .then(() => {
      if (self.reportid && self.layers.activeReports.hasOwnProperty(self.reportid)) {
        //Case 1: Active report id in current city
        if (self.layers.activeReports[self.reportid].instance_region_code === self.utility.parseCityObj(cityName)) {
          self.layers.activeReports[self.reportid].fire('click');
        }
      } else if (self.reportid && !self.layers.activeReports.hasOwnProperty(self.reportid)) {
        //Case 2: No active report, check availability on server
        self.layers.addSingleReport(self.reportid)
        .then(report => {
          var reportRegion = self.layers.activeReports[self.reportid].feature.properties.tags.instance_region_code;
          if (reportRegion === self.utility.parseCityObj(cityName).region) {
            //Case 2A: in current city?
            report.fire('click');
          } else {
            //Case 2B: fly to city with report id
            self.utility.changeCity(self.utility.parseCityName(reportRegion, self.cities), self.reportid, self.map, self.layers, true)
            .then(() => {
              self.layers.addSingleReport(self.reportid)
              .then(queriedReport => {
                queriedReport.fire('click');
              });
            });
          }
        });
      }
    }).catch((err) => {
      //Case 3: .addReports not resolved for specified city
      self.utility.noReportsNotification(cityName);
      self.report_id = null;
    });
  }

  attached() {
    var self = this;

    // Initialize leaflet map
    self.map = L.map('mapContainer', {
      attributionControl: false, //include in side pane
      center: [-7, 110],
      zoom: 8,
      minZoom: 8
    });

    // Add base tile layers
    L.tileLayer(self.utility.config.tile_layer, {
      detectRetina: true,
      subdomains: 'abc',
      ext: 'png'
    }).addTo(self.map);

    // Add scale control
    L.control.scale({
      position: 'topright',
      metric: true,
      imperial: false
    }).addTo(self.map);

    // Add custom leaflet control for geolocation
    L.Control.GeoLocate = L.Control.extend({
      onAdd: () => {
        return self.utility.geolocateContainer(self.map);
      }
    });
    L.control.geoLocate = (opts) => {
      return new L.Control.GeoLocate(opts);
    };
    L.control.geoLocate({
      position: 'topleft'
    }).addTo(self.map);

    // Find user location & store in background
    self.map.locate({
      setView: false
    });
    self.map.on('locationfound', (e) => {
      self.utility.onLocationFound(e);
    });
    self.map.on('locationerror', () => {
      self.utility.clientLocation = null;
    });
  }
}
