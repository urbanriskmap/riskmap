//Utility functions for manipulating leaflet map layers

import {inject, noView} from 'aurelia-framework';
import * as L from 'leaflet';
import Chart from 'chart';
import {Config} from 'resources/config';
import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';

//start-non-standard
@noView
@inject(Config)
//end-non-standard
export class MapLayers {
  constructor(Config) {
    this.activeReports = {}; // List of available reports (filtered by city, time: last 1 hour)
    this.config = Config.map;
    this.mapIcons = {
      report_normal: L.icon({
        iconUrl: 'assets/icons/floodIcon.svg',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      }),
      report_selected: L.icon({
        iconUrl: 'assets/icons/floodSelectedIcon.svg',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      }),
      gauge_normal: (url) => L.icon({
        iconUrl: url,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      }),
      gauge_selected: L.icon({
        iconUrl: 'assets/icons/floodgauge_selected.svg',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
    };
    this.mapPolygons = {
      normal: {
        weight: 0,
        opacity: 0
      },
      selected: {
        weight: 1,
        opacity: 1
      }
    };
  }

  // Get icon for flood gauge
  gaugeIconUrl(level) {
    switch(level) {
      case 1:
      return 'assets/icons/floodgauge_1.svg';
      case 2:
      return 'assets/icons/floodgauge_2.svg';
      case 3:
      return 'assets/icons/floodgauge_3.svg';
      default:
      return 'assets/icons/floodgauge_4.svg';
    }
  }

  // Format timestamps to local time
  formatTime(timestamp_ISO8601) {
    let utc = new Date(timestamp_ISO8601).getTime();
    let ict = utc + 3600 * 7 * 1000; // Add 7 hours for UTC+7
    let timestring = new Date(ict).toISOString();
    timestring = timestring.split('T'); // Split time and ate
    let t1 = timestring[1].slice(0,5); // Extract HH:MM
    let d1 = timestring[0].split('-'); // Extract DD-MM-YY
    let d2 = d1[2]+'-'+d1[1]+'-'+d1[0];
    return (t1 + ' ' + d2);
  }

  // Get topojson data from server, return geojson
  getData(end_point) {
    var self = this,
        url = self.config.data_server + end_point;
    let client = new HttpClient();
    return new Promise((resolve, reject) => {
      client.get(url)
      .then(data => {
        var topology = JSON.parse(data.response);
        if (topology.statusCode === 200) {
          var result = topology.result;
          if (result && result.objects) {
            resolve(topojson.feature(result, result.objects.output));
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
    });
  }

  reportInteraction(feature, layer, city_name, map, togglePane) {
    var self = this;
    self.activeReports[feature.properties.pkey] = layer;
    layer.on({
      click: (e) => {
        map.panTo(layer._latlng);
        if (self.selected_extent) {
          self.selected_extent.target.setStyle(self.mapPolygons.normal);
          self.selected_extent = null;
        }
        if (self.selected_gauge) {
          self.selected_gauge.target.setIcon(self.mapIcons.gauge_normal(self.gaugeIconUrl(self.selected_gauge.target.feature.properties.observations[self.selected_gauge.target.feature.properties.observations.length-1].f3)));
          self.selected_gauge = null;
        }
        if (!self.selected_report) {
          // Case 1 : no previous selection, click on report icon
          e.target.setIcon(self.mapIcons.report_selected);
          self.popupContent = {};
          for (let prop in feature.properties) {
            self.popupContent[prop] = feature.properties[prop];
          }
          self.popupContent.timestamp = self.formatTime(feature.properties.created_at);
          history.pushState({city: city_name, report_id: feature.properties.pkey}, "city", "map/" + city_name + "/" + feature.properties.pkey);
          togglePane('#infoPane', 'show', true);
          self.selected_report = e;
        } else if (e.target === self.selected_report.target) {
          // Case 2 : clicked report icon same as selected report
          e.target.setIcon(self.mapIcons.report_normal);
          history.pushState({city: city_name, report_id: null}, "city", "map/" + city_name);
          togglePane('#infoPane', 'hide', false);
          self.selected_report = null;
        } else if (e.target !== self.selected_report.target) {
          // Case 3 : clicked new report icon, while previous selection needs to be reset
          self.selected_report.target.setIcon(self.mapIcons.report_normal);
          e.target.setIcon(self.mapIcons.report_selected);
          self.popupContent = {};
          for (let prop in feature.properties) {
            self.popupContent[prop] = feature.properties[prop];
          }
          self.popupContent.timestamp = self.formatTime(feature.properties.created_at);
          history.pushState({city: city_name, report_id: feature.properties.pkey}, "city", "map/" + city_name + "/" + feature.properties.pkey);
          togglePane('#infoPane', 'show', true);
          self.selected_report = e;
        }
      }
    });
  }

  floodExtentInteraction(feature, layer, city_name, map, togglePane) {
    var self = this;
    layer.on({
      click: (e) => {
        map.panTo(layer.getCenter());
        // Check for selected report, restore icon to normal, clear variable, update browser URL
        if (self.selected_report) {
          self.selected_report.target.setIcon(self.mapIcons.report_normal);
          self.selected_report = null;
          history.pushState({city: city_name, report_id: null}, "city", "map/" + city_name);
        }
        if (self.selected_gauge) {
          self.selected_gauge.target.setIcon(self.mapIcons.gauge_normal(self.gaugeIconUrl(self.selected_gauge.target.feature.properties.observations[self.selected_gauge.target.feature.properties.observations.length-1].f3)));
          self.selected_gauge = null;
        }
        if (!self.selected_extent) {
          // Case 1 : no previous selection, click on flood extent polygon
          // Selection feedback, add stroke
          e.target.setStyle(self.mapPolygons.selected);
          // Reset and fill popupContent
          self.popupContent = {};
          for (let prop in feature.properties) {
            self.popupContent[prop] = feature.properties[prop];
          }
          // open infoPane, set 'clear_selection' var to true, to empty flood gauge chart
          togglePane('#infoPane', 'show', true);
          // set local variable to target
          self.selected_extent = e;
        } else if (e.target === self.selected_extent.target) {
          // Case 2 : clicked polygon same as selected flood extent
          e.target.setStyle(self.mapPolygons.normal);
          self.popupContent = {};
          togglePane('#infoPane', 'hide', false);
          self.selected_extent = null;
        } else if (e.target !== self.selected_extent.target) {
          // Case 3 : clicked new polygon, while previous selection needs to be reset
          self.selected_extent.target.setStyle(self.mapPolygons.normal);
          e.target.setStyle(self.mapPolygons.selected);
          self.popupContent = {};
          for (let prop in feature.properties) {
            self.popupContent[prop] = feature.properties[prop];
          }
          togglePane('#infoPane', 'show', true);
          self.selected_extent = e;
        }
      }
    });
  }

  drawGaugeChart(feature) {
    $('#chart-pane').html('<canvas id="modalChart"></canvas>');
    var ctx = $('#modalChart').get(0).getContext('2d');
    var data = {
      labels : [],
      datasets : [{
        label: "Tinggi Muka Air / Water Depth (cm)",
        backgroundColor: "rgba(151,187,205,0.2)",
        borderColor: "rgba(151,187,205,1)",
        pointBackgroundColor: "rgba(151,187,205,1)",
        pointBorderColor: "#fff",
        pointRadius: 4,
        data: []
      }]
    };
    for (var i = 0; i < feature.properties.observations.length; i+=1) {
      data.labels.push(feature.properties.observations[i].f1);
      data.datasets[0].data.push(feature.properties.observations[i].f2);
    }
    var gaugeChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        bezierCurve: true,
        legend: {display: true},
        scaleLabel: "<%= ' ' + value%>",
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'hour',
              unitStepSize: 1,
              displayFormats: {
                'millisecond': 'HH:mm',
                'second': 'HH:mm',
                'minute': 'HH:mm',
                'hour': 'HH:mm',
                'day': 'HH:mm',
                'week': 'HH:mm',
                'month': 'HH:mm',
                'quarter': 'HH:mm',
                'year': 'HH:mm'
              }
            }
          }]
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  gaugeInteraction(feature, layer, city_name, map, togglePane) {
    var self = this;
    layer.on({
      click: (e) => {
        map.panTo(layer._latlng);
        $('#chart-pane').empty();
        if (self.selected_report) {
          self.selected_report.target.setIcon(self.mapIcons.report_normal);
          self.selected_report = null;
          history.pushState({city: city_name, report_id: null}, "city", "map/" + city_name);
        }
        if (self.selected_extent) {
          self.selected_extent.target.setStyle(self.mapPolygons.normal);
          self.selected_extent = null;
        }
        if (!self.selected_gauge) {
          e.target.setIcon(self.mapIcons.gauge_selected);
          self.popupContent = {};
          self.popupContent.gauge_name = feature.properties.gaugenameid;
          self.drawGaugeChart(feature);
          togglePane('#infoPane', 'show', false);
          self.selected_gauge = e;
        } else if (e.target === self.selected_gauge.target) {
          e.target.setIcon(self.mapIcons.gauge_normal(self.gaugeIconUrl(e.target.feature.properties.observations[e.target.feature.properties.observations.length-1].f3)));
          togglePane('#infoPane', 'hide', false);
          self.selected_gauge = null;
        } else if (e.target !== self.selected_gauge.target) {
          self.selected_gauge.target.setIcon(self.mapIcons.gauge_normal(self.gaugeIconUrl(self.selected_gauge.target.feature.properties.observations[self.selected_gauge.target.feature.properties.observations.length-1].f3)));
          e.target.setIcon(self.mapIcons.gauge_selected);
          self.popupContent = {};
          self.popupContent.gauge_name = feature.properties.gaugenameid;
          self.drawGaugeChart(feature);
          togglePane('#infoPane', 'show', false);
          self.selected_gauge = e;
        }
      }
    });
  }

  appendData(end_point, localObj, map) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.getData(end_point)
      .then(data => {
        if (!data) {
          console.log('Could not load map layer');
          resolve(data);
        } else {
          localObj.addData(data);
          localObj.addTo(map);
          resolve(data);
        }
      }).catch(() => reject(null));
    });
  }

  addSingleReport(report_id) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.getData('reports/' + report_id)
      .then(data => {
        self.reports.addData(data);
        resolve(self.activeReports[data.features[0].properties.pkey]);
      }).catch(() => reject(null));
    });
  }

  addReports(city_name, city_region, map, togglePane) {
    var self = this;
    map.createPane('reports');
    map.getPane('reports').style.zIndex = 700;
    // clear previous reports
    if (self.reports) {
      map.removeLayer(self.reports);
      self.reports = null;
    }
    // create new layer object
    self.reports = L.geoJSON(null, {
      onEachFeature: (feature, layer) => {
        self.reportInteraction(feature, layer, city_name, map, togglePane);
      },
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
          icon: self.mapIcons.report_normal,
          pane: 'reports'
        });
      }
    });
    // add layer to map
    return self.appendData('reports/?city=' + city_region, self.reports, map);
  }

  addFloodExtents(city_name, city_region, map, togglePane) {
    var self = this;
    self.flood_extents = L.geoJSON(null, {
      style: (feature, layer) => {
        switch (feature.properties.state) {
          case 4: return {cursor:"pointer", fillColor:"#CC2A41", weight:0, color:"#000000", opacity:0, fillOpacity: 0.7};
          case 3: return {cursor:"pointer", fillColor:"#FF8300", weight:0, color:"#000000", opacity:0, fillOpacity: 0.7};
          case 2: return {cursor:"pointer", fillColor:"#FFFF00", weight:0, color:"#000000", opacity:0, fillOpacity: 0.7};
          case 1: return {cursor:"pointer", fillColor:"#A0A9F7", weight:0, color:"#000000", opacity:0, fillOpacity: 0.7};
          default: return {weight:0, opacity: 0, fillOpacity:0};
        }
      },
      onEachFeature: (feature, layer) => {
        self.floodExtentInteraction(feature, layer, city_name, map, togglePane);
      }
    });
    return self.appendData('floods?city=' + city_region + '&minimum_state=1', self.flood_extents, map);
  }

  removeFloodExtents(map) {
    var self = this;
    if (self.flood_extents){
      map.removeLayer(self.flood_extents);
      self.flood_extents = null;
    }
  }

  addFloodGauges(city_name, city_region, map, togglePane) {
    var self = this;
    map.createPane('gauges');
    map.getPane('gauges').style.zIndex = 650;
    if (city_region === 'jbd') {
      // Create flood gauge layer and add to the map
      self.gaugeLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {
            icon: self.mapIcons.gauge_normal(self.gaugeIconUrl(feature.properties.observations[feature.properties.observations.length-1].f3)),
            pane: 'gauges'
          });
        },
        onEachFeature: (feature, layer) => {
          self.gaugeInteraction(feature, layer, city_name, map, togglePane);
        }
      });
    }
    return self.appendData('floodgauges?city=' + city_region, self.gaugeLayer, map);
  }

  removeFloodGauges(map) {
    var self = this;
    if (self.gaugeLayer) {
      map.removeLayer(self.gaugeLayer);
      self.gaugeLayer = null;
    }
  }
}
