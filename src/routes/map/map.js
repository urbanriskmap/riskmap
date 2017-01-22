/*
PetaBencana.id Leaflet Map for CogniCity data, built within Aurelia framework
*/
import * as config from './config'; // Map config
import {Layers} from './layers';
import $ from 'jquery';
import * as L from 'leaflet';
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

// Map class, requires map config.js (injected as Aurelia dependency)
export class Map {
  constructor() {
    this.config = config;
    this.city_regions = [];
    for (let city_region in this.config.instance_regions) {
      this.city_regions.push(city_region);
    }
  }

  activate(params, routerConfig) {
    this.city_name = params.city;
    this.report_id = params.report;
    if (!this.city_name) {
      routerConfig.navModel.router.navigate('map', {replace: true});
    }
  }

  hidePane(ref) {
    $(ref).fadeOut(200);
    if ($(window).width() < 620) {
      $('#logo_bottom').show();
    }
    if (ref === '#sidePane') {
      $('.menuBtn').toggleClass("active");
    }
    if (ref === '#reportPane') {
      this.report_id = null;
      history.pushState({city: this.city_name, report_id: null}, "city", "map/" + this.city_name);
      if (!!this.layers.selectedReport) {
        this.layers.selectedReport.target.setIcon(L.icon({
          iconUrl: 'assets/icons/floodIcon.svg',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        }));
        this.layers.selectedReport = null;
      }
    }
  }

  showPane(ref) {
    let self = this;
    if (ref === '#sidePane') {
      $('.menuBtn').toggleClass("active");
      this.hidePane('#reportPane');
      this.hidePane('#chartPane');
    }
    else if ((ref === '#reportPane' || ref === '#chartPane') && $('#closeSidePane').hasClass("active")) {
      $('.menuBtn').toggleClass("active");
      $('#sidePane').hide();
    }

    else if (ref === '#reportPane'){
      $('#chartPane').hide();
    }

    $(ref).fadeIn(200);
    if ($(window).width() < 620) {
      $('#logo_bottom').hide();
    }
  }

  // Get parameters from config based on city name, else return default
  parseMapCity(cityName) {
    if (typeof(cityName) === 'undefined' || cityName === null) {
      return this.config.default_region;
    } else if (cityName in this.config.instance_regions) {
      this.city_name = cityName;
      return this.config.instance_regions[cityName];
    } else {
      $.notify('Unsupported city: ' + JSON.stringify(cityName), {style:"mapInfo", className:"info" });
      $('#cityPopup').fadeIn(200);
      $('#screen').fadeIn(200);
      return this.config.default_region;
    }
  }

  cityFromRegion(regionCode) {
    var self = this;
    for (var i = 0; i < self.city_regions.length; i+=1) {
      if (self.parseMapCity(self.city_regions[i]).region === regionCode) {
        return self.city_regions[i];
      }
    }
  }

  // Change city from within map without reloading window
  changeCity(cityName, pushState) {
    $('#cityPopup').fadeOut(200);
    $('#screen').fadeOut(200);
    var cityObj = this.parseMapCity(cityName);
    if (pushState) {
      if (cityObj.region !== 'java') {
        if (self.report_id) {
          history.pushState({city: cityName, report_id: self.report_id}, "city", "map/" + cityName + '/' + self.report_id);
        } else {
          history.pushState({city: cityName, report_id: null}, "city", "map/" + cityName);
        }
      } else {
        history.pushState({city: null, report_id: null}, "city", "map");
      }
    }
    this.map.flyToBounds([cityObj.bounds.sw, cityObj.bounds.ne]).once('moveend zoomend', (e) => {
      this.map.setMaxBounds([cityObj.bounds.sw, cityObj.bounds.ne]);
    });
    this.layers.removeReports();
    this.layers.removeFloodExtents();
    this.layers.removeFloodGauges();

    // TODO - we're returning a nested promise from layers, cleaner to have a changeCity promise?
    // TODO - remove conditional returns
    if (cityObj.region !== 'java'){
      this.layers.addFloodExtents(cityObj.region); // Added flooded area if possible
      this.layers.addFloodGauges(cityName, cityObj.region, this.showPane); // Add flood gauges if possible
      return this.layers.addReports(cityName, cityObj.region, this.showPane);
    } else {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }

  // View all reports for city, or zoom to single queried report id
  viewReport(cityName, pushState) {
    var self = this;
    this.changeCity(cityName, pushState)
    .then(() => {
      if (self.report_id && self.layers.pkeyList.hasOwnProperty(self.report_id)) {
        //Case 1: Active report id in current city
        if (self.layers.pkeyList[self.report_id].instance_region_code === self.parseMapCity(cityName).region) {
          self.layers.pkeyList[self.report_id].fire('click');
        }
      } else if (self.report_id && !self.layers.pkeyList.hasOwnProperty(self.report_id)) {
        //Case 2: No active report, check availability on server
        self.layers.addSingleReport(self.report_id)
        .then(report => {
          var reportRegion = self.layers.pkeyList[self.report_id].feature.properties.tags.instance_region_code;
          if (reportRegion === self.parseMapCity(cityName).region) {
            //Case 2A: in current city?
            report.fire('click');
          } else {
            //Case 2B: fly to city with report id
            self.changeCity(self.cityFromRegion(reportRegion), true)
            .then(() => {
              self.layers.addSingleReport(self.report_id).
              then(queriedReport => {
                queriedReport.fire('click');
              });
            });
          }
        });
      }
    }).catch((err) => {
      //Case 3: .addReports not resolved for specified city
      $.notify("No reports found for " + cityName, {style:"mapInfo", className:"info" });
      self.report_id = null;
    });
  }

  //Execute changeCity & viewReport from initial load select city popup
  selectCity(city) {
    this.viewReport(city, true);
    $('#cityPopup').fadeOut(200);
    $('#screen').fadeOut(200);
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

  viewLocation() {
    var self = this;
    if (this.clientLocation) {
      if (this.clientCityIsValid) {
        //case 1: location found, location in a supported city
        self.map.flyTo(self.clientLocation.latlng, {
          zoom: 15,
          duration: 1
        });
        if (self.gpsMarker) {
          self.gpsMarker.removeFrom(self.map);
          self.gpsAccuracy.removeFrom(self.map);
        }
        self.map.once('moveend', () => { //execute only once, after fly to location ends, ignores user map drag events
          self.drawGpsMarkers(self.clientLocation.latlng, self.clientLocation.accuracy, self.map);
        });
        self.changeCity(self.clientCity, true);
      } else {
        //case 2: location found, but not in supported city
        $.notify("Location out of bounds", {style: "mapInfo", className: "error"});
      }
    } else {
      //case 3: location not found
      $.notify("GPS location not found", {style: "mapInfo", className: "error"});
    }
  }

  attached() {
    var self = this;

    // Create Leaflet map
    this.map = L.map('mapContainer', {
      attributionControl: false, //include in side pane
      center: [-7, 110],
      zoom: 8,
      minZoom: 8
    });

    L.control.scale({position:'topright', metric:true, imperial:false}).addTo(this.map);

    // Add base tile layers
    L.tileLayer(this.config.tile_layer, {
      detectRetina: false,
      subdomains: 'abcd',
      ext: 'png'
    }).addTo(this.map);

    // Create new Layer instance (for reports)
    this.layers = new Layers(this.map);

    //If user navigates through history, load city as per stateObj, but do not register new pushState
    window.onpopstate = (e) => {
      if (e.state.city !== null) {
        this.viewReport(e.state.city, false);
      } else {
        this.viewReport(null, false);
      }
    };

    // Zoom to city
    if (this.city_name) {
      $('#cityPopup').hide();
      $('#screen').hide();
      this.viewReport(this.city_name, true);
    }

    //Add custom leaflet control, to navigate back to browser located user location
    L.Control.GeoLocate = L.Control.extend({
      onAdd: (map) => {
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
          self.viewLocation();
        };
        return container;
      }
    });
    L.control.geoLocate = (opts) => {
      return new L.Control.GeoLocate(opts);
    };
    L.control.geoLocate({position: 'topleft'}).addTo(self.map);

    // Find user location & store in background
    this.map.locate({
      setView: false
    });
    this.map.on('locationfound', (e) => {
      self.clientLocation = e;
      for (let city_region in self.config.instance_regions) {
        self.clientCityIsValid = false;
        if (self.clientLocation.latitude > self.config.instance_regions[city_region].bounds.sw[0] && self.clientLocation.longitude > self.config.instance_regions[city_region].bounds.sw[1] && self.clientLocation.latitude < self.config.instance_regions[city_region].bounds.ne[0] && self.clientLocation.longitude < self.config.instance_regions[city_region].bounds.ne[1]) {
          self.clientCity = city_region;
          self.clientCityIsValid = true;
          break;
        }
      }
    });
    this.map.on('locationerror', () => {
      self.clientLocation = null;
    });

    // Modify side pane css on the fly
    $('#sidePane').css({
      'height': ($(window).height() - $('#topBar').height()) + 'px'
    });
  }
}
