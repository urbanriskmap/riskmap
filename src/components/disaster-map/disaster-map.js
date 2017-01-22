import {inject, bindable, customElement} from 'aurelia-framework';
import * as L from 'leaflet';
import $ from 'jquery';
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

  togglePane(ref, action, clear_selection) {
    var self = this;
    if (action === 'hide') {
      $(ref).fadeOut(200);
      if ($(window).width() < 620) {
        $('#logo_bottom').show();
      }
      if (ref === '#infoPane' && clear_selection) {
        self.reportid = null;
        history.pushState({city: self.selcity, report_id: null}, "city", "map/" + self.selcity);
        if (self.layers.selected_report) {
          self.layers.selected_report.target.setIcon(self.layers.mapIcons.report_normal);
          self.layers.selected_report = null;
        }
      } else if (ref === '#sidePane') {
        $('.menuBtn').toggleClass("active");
      }
    } else if (action === 'show') {
      $(ref).fadeIn(200);
      if ($(window).width() < 620) {
        $('#logo_bottom').hide();
      }
      if (ref === '#infoPane' && $('#closeSidePane').hasClass("active")) {
        $('.menuBtn').toggleClass("active");
        $('#sidePane').fadeOut(200);
      } else if (ref === '#sidePane') {
        $('.menuBtn').toggleClass("active");
        self.togglePane('#infoPane', 'hide', true);
      }
    }
  }

  // Load all reports for a given city, or zoom to single queried report id
  viewReports(city_name, push_state) {
    var self = this;
    self.utility.changeCity(city_name, self.reportid, self.map, self.layers, push_state, self.togglePane)
    .then(() => {
      if (self.reportid && self.layers.activeReports.hasOwnProperty(self.reportid)) {
        //Case 1: Active report id in current city
        if (self.layers.activeReports[self.reportid].instance_region_code === self.utility.parseCityObj(city_name)) {
          self.layers.activeReports[self.reportid].fire('click');
        }
      } else if (self.reportid && !self.layers.activeReports.hasOwnProperty(self.reportid)) {
        //Case 2: No active report, check availability on server
        self.layers.addSingleReport(self.reportid)
        .then(report => {
          var reportRegion = self.layers.activeReports[self.reportid].feature.properties.tags.instance_region_code;
          if (reportRegion === self.utility.parseCityObj(city_name).region) {
            //Case 2A: in current city?
            report.fire('click');
          } else {
            //Case 2B: fly to city with report id
            self.utility.changeCity(self.utility.parseCityName(reportRegion, self.cities), self.reportid, self.map, self.layers, true, self.togglePane)
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
      self.utility.noReportsNotification(city_name);
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

    // Check against queried city param
    if (self.selcity) {
      self.viewReports(self.selcity, true);
    }
  }
}
