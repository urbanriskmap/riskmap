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
  @bindable querycity;
  @bindable reportid;
  @bindable resetTab;
  //end-non-standard

  constructor(MapLayers, MapUtility) {
    this.layers = MapLayers;
    this.utility = MapUtility;
    this.cities = [];
    for (let city in this.utility.config.instance_regions) {
      this.cities.push(city);
    }
    this.selected_city = null;
  }

  togglePane(ref, action, clear_selection) {
    var self = this;
    if (action === 'hide') {
      $(ref).fadeOut(200);
      if (ref === '#infoPane') {
        if (clear_selection) {
          self.reportid = null;
          history.pushState({city: self.selected_city, report_id: null}, "city", "map/" + self.selected_city);
          if (self.layers.selected_report) {
            self.layers.selected_report.target.setIcon(self.layers.mapIcons.report_normal);
            self.layers.selected_report = null;
            self.layers.popupContent = null;
          }
        }
      } else if (ref === '#sidePane') {
        $('.menuBtn').toggleClass("active");
      }
    } else if (action === 'show') {
      if (ref === '#infoPane') {
        if ($('#closeSidePane').hasClass("active")) {
          $('.menuBtn').toggleClass("active");
          $('#sidePane').fadeOut(200);
        }
        if (clear_selection && $('#modalChart').get(0)) {
          $('#chart-pane').empty();
        }
      } else if (ref === '#sidePane') {
        self.resetTab('report');
        $('.menuBtn').toggleClass("active");
        self.togglePane('#infoPane', 'hide', true);
      }
      $(ref).fadeIn(200);
    }
  }

  // Load all reports for a given city, or zoom to single queried report id
  viewReports(city_name, push_state) {
    var self = this;
    self.utility.changeCity(city_name, self.reportid, self.map, self.layers, self.togglePane)
    .then(() => {
      if (self.reportid && self.layers.activeReports.hasOwnProperty(self.reportid)) {
        //Case 1: Active report id in current city
        if (self.layers.activeReports[self.reportid].feature.properties.tags.instance_region_code === self.utility.parseCityObj(city_name).region) {
          self.layers.activeReports[self.reportid].fire('click');
          self.selected_city = city_name;
          if (push_state) {
            history.pushState({city: city_name, report_id: self.reportid}, 'city', "map/" + city_name + "/" + self.reportid);
          }
        }
      } else if (self.reportid && !self.layers.activeReports.hasOwnProperty(self.reportid)) {
        //Case 2: No active report, check availability on server
        self.layers.addSingleReport(self.reportid)
        .then(report => {
          var reportRegion = self.layers.activeReports[self.reportid].feature.properties.tags.instance_region_code;
          if (reportRegion === self.utility.parseCityObj(city_name).region) {
            //Case 2A: in current city?
            report.fire('click');
            self.selected_city = city_name;
            if (push_state) {
              history.pushState({city: city_name, report_id: self.reportid}, 'city', "map/" + city_name + "/" + self.reportid);
            }
          } else {
            //Case 2B: fly to city with report id
            var queryReportCity = self.utility.parseCityName(reportRegion, self.cities);
            self.utility.changeCity(queryReportCity, self.reportid, self.map, self.layers, self.togglePane)
            .then(() => {
              self.layers.addSingleReport(self.reportid)
              .then(queriedReport => {
                queriedReport.fire('click');
                self.selected_city = queryReportCity;
                if (push_state) {
                  history.pushState({city: queryReportCity, report_id: self.reportid}, 'city', "map/" + queryReportCity + "/" + self.reportid);
                }
              });
            });
          }
        }).catch(() => {
          self.utility.noReportNotification(city_name, self.reportid);
          self.selected_city = city_name;
          self.reportid = null;
          if (push_state) {
            history.pushState({city: city_name, report_id: null}, 'city', "map/" + city_name);
          }
        });
      } else if (!self.reportid) {
        if (self.utility.parseCityObj(city_name).region === 'java') {
          self.utility.noReportNotification(null, null);
          self.selected_city = null;
          if (push_state) {
            history.pushState({city: null, report_id: null}, 'city', "map");
          }
        } else {
          self.selected_city = city_name;
          if (push_state) {
            history.pushState({city: city_name, report_id: null}, 'city', "map/" + city_name);
          }
        }
      }
    }).catch(() => {
      //Case 3: .addReports not resolved for specified city
      self.utility.noReportNotification(city_name, null);
      self.reportid = null;
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
      position: 'bottomright',
      metric: true,
      imperial: false
    }).addTo(self.map);

    // Add custom leaflet control for geolocation
    L.Control.GeoLocate = L.Control.extend({
      onAdd: () => {
        return self.utility.geolocateContainer(self.map, self.layers, self.togglePane);
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
    if (self.querycity) {
      self.viewReports(self.querycity, true);
    }

    //If user navigates through history, load city as per stateObj, but do not register new pushState
    window.onpopstate = (e) => {
      if (e.state.city !== null) {
        this.viewReports(e.state.city, false);
      } else {
        this.viewReports(null, false);
      }
    };
  }
}
