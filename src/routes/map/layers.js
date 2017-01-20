import * as config from './config'; // Map config
import {Data} from './data';
import $ from 'jquery';
import Chart from 'chartjs';

// PetaBencana.id Layers class - manage leaflet data layers
export class Layers {
  constructor(leafletMap) {
    this.map = leafletMap;
    this.data = new Data(); // Data class
    this.reports = {}; // Layers
    this.popupContent = {};
    this.pkeyList = {};
  }

  // Adds a single report from data server to existing map layer
  addSingleReport(report_id) {
    var self = this;
    var url = config.data_server + 'reports/' + report_id;

    return new Promise((resolve, reject) => {
      self.data.getData(url)
        .then((data) => {
          self.reports.addData(data);
          var report = self.pkeyList[data.features[0].properties.pkey];
          resolve(report);
        })
        .catch(() => reject(null));
    });
  }

  // Get flood reports as topojson, return Leaflet geojson layer
  addReports(city_name, city_region, showPane) {
    let url = config.data_server + 'reports/?city=' + city_region;
    var self = this;

    // create placeholder for reports data;
    self.reports = L.geoJSON(null, {
      onEachFeature: (feature, layer) => { //TODO: create separate class function
        self.pkeyList[feature.properties.pkey] = layer;
        this.selectedReport = null;
        layer.on({
          click: (e) => {
            // This report hasn't been clicked on
            if (this.selectedReport === null){
              // Style as selected
              e.target.setIcon(L.icon({
                iconUrl: 'assets/icons/floodSelectedIcon.svg',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              }));
              // Set popup content
              self.popupContent = {};
              let localTimestamp = new Date(feature.properties.created_at);
              // Create local timestamp
              self.popupContent['timestamp'] = (localTimestamp.toLocaleDateString('id', {timeZone: "Asia/Jakarta"} ) + " " + localTimestamp.toLocaleTimeString('en', { hour12: false, timeZone: "Asia/Jakarta" }));

              for (let prop in feature.properties) {
                self.popupContent[prop] = feature.properties[prop];

              }
              // Fly to
              self.map.flyTo(layer._latlng, 15);
              history.pushState({city: city_name, report_id: feature.properties.pkey}, "city", "map/" + city_name + "/" + feature.properties.pkey);
              // Show report
              showPane('#reportPane');
              this.selectedReport = e;
            }
            else if (e.target === this.selectedReport.target){
              // This was the last report clicked so set it back to normal
              this.selectedReport.target.setIcon(L.icon({
                iconUrl: 'assets/icons/floodIcon.svg',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              }));
              $('#reportPane').hide();
              history.pushState({city: city_name, report_id: null}, "city", "map/" + city_name);
              this.selectedReport = null; // No longer selected
            }
            else if (e.target !== this.selectedReport.target){
              // This is a new report, so..
              // reset the old report
              this.selectedReport.target.setIcon(L.icon({
                iconUrl: 'assets/icons/floodIcon.svg',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              }));
              // Style as selected the new report
              e.target.setIcon(L.icon({
                iconUrl: 'assets/icons/floodSelectedIcon.svg',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              }));
              // Set popup content
              self.popupContent = {};
              let localTimestamp = new Date(feature.properties.created_at);
              // Create local timestamp
              self.popupContent['timestamp'] = (localTimestamp.toLocaleDateString('id', {timeZone: "Asia/Jakarta"} ) + " " + localTimestamp.toLocaleTimeString('en', { hour12: false, timeZone: "Asia/Jakarta" }));

              for (let prop in feature.properties) {
                self.popupContent[prop] = feature.properties[prop];
              }
              // Fly to
              self.map.flyTo(layer._latlng, 15);
              history.pushState({city: city_name, report_id: feature.properties.pkey}, "city", "map/" + city_name + "/" + feature.properties.pkey);
              // Show report
              showPane('#reportPane');
              this.selectedReport = e; // Update memory
            }
          }
        });
      },
      pointToLayer: (feature, latlng) => { //TODO: create separate class function
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: 'assets/icons/floodIcon.svg',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })
        });
      }
    });

    // Get data and add to layer
    return new Promise((resolve, reject) => {
      self.data.getData(url)
      .then((data) => {
        self.reports.addData(data);
        self.reports.addTo(self.map);
        resolve(data);
      })
      .catch(() => reject(null));
    });
  }

  // Function to remove reports from map, and clear layer
  removeReports(){
    var self = this;
    if (self.reports) {
      self.map.removeLayer(self.reports);
      self.reports = null;
    }
  }

  // Function to add flooded polygon layer for Jakarta to map
  addFloodExtents(city_region){

    var self = this;

    // Create geojson object
    self.flood_extents = L.geoJSON(null, {
      style: function(feature, layer){
        switch (feature.properties.state) {
    			case 4: return {fillColor:"#CC2A41",weight:1,color:"#CC2A41", opacity:0.8,fillOpacity: 0.8};
    			case 3: return {fillColor:"#FF8300",weight:1,color:"#FF8300", opacity:0.8,fillOpacity: 0.8};
    			case 2: return {fillColor:"#FFFF00",weight:1,color:"#FFFF00", opacity:0.8,fillOpacity: 0.8};
    			case 1: return {fillColor:"#A0A9F7", weight:1,color:"#A0A9F7",opacity:0.8,fillOpacity: 0.8};
          default: return {color:"rgba(0,0,0,0)",weight:0,fillOpacity:0};
        }
      }
    });

    // Get areas where flooding is happening
    var url = config.data_server + "floods?city=" + city_region + "&minimum_state=1";
    // Get data and add to layer
    return new Promise((resolve, reject) => {
      self.data.getData(url)
      .then((data) => {
        if (data === null){
          console.log('Could not load flood extents for '+city);
          resolve(data);
        }
        else {
          self.flood_extents.addData(data);
          self.flood_extents.addTo(self.map);
          resolve(data);
        }
      })
      .catch((err) => reject(null));
    });

  }

  // Remove layer from map, referencing global variable defined in addFloodExtents()
  removeFloodExtents() {
    var self = this;
    if (self.flood_extents){
      self.map.removeLayer(self.flood_extents);
      self.flood_extents = null;
    }
  }

  // Function to add flooded polygon layer for Jakarta to map
  addFloodGauges(city_name, city_region, showPane){

    var self = this;
    self.city_region = city_region;

    //TODO - add multiregion support
    if (self.city_region === 'jbd'){
      // Setup icons
      self.gaugeIcons = function(level){
        switch (level) {
          case 1:
            return {'color':'#FF4000','icon':'assets/icons/floodgauge_1.png'};
          case 2:
            return {'color':'#FF8000','icon':'assets/icons/floodgauge_2.png'};
          case 3:
            return {'color':'#F7D358','icon':'assets/icons/floodgauge_3.png'};
          default:
            return {'color':'#01DF01','icon':'assets/icons/floodgauge.png'};
        }
      };

      // Create flood gauge layer and add to the map
      self.gaugeLayer = L.geoJSON(null, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {
                  icon: L.icon({
                    iconUrl: this.gaugeIcons(feature.properties.observations[feature.properties.observations.length-1].f3).icon,
                    iconSize: [22,22],
      							iconAnchor: [11, 11],
      							popupAnchor: [0, 0]
                  })
                })
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            click: (e) => {

              // Handle flood reports layer selection and popup
              if (this.selectedReport !== null){
                this.selectedReport.target.setIcon(L.icon({
                  iconUrl: 'assets/icons/floodIcon.svg',
                  iconSize: [30, 30],
                  iconAnchor: [15, 15]
                }));
                $('#reportPane').hide();
                this.selectedReport = null;
                history.pushState({city: city_name, report_id: null}, "city", "map/" + city_name);
              }

              $('#chart-title').html(feature.properties.gaugenameid)
              var ctx = $('#modalChart').get(0).getContext("2d");

    					var data = {
    						labels : [],
    						datasets : [{
    							label: "Tinggi Muka Air / Water Depth (cm)",
    							backgroundColor: "rgba(151,187,205,0.2)",
    							borderColor: "rgba(151,187,205,1)",
    							pointBackgroundColor: "rgba(151,187,205,1)",
    							pointBorderColor: "#fff",
    	            pointRadius: 4,
    							data: [1,2,3]
    						}]
    					};
    					for (var i = 0; i < feature.properties.observations.length; i++){
    						data.labels.push(feature.properties.observations[i].f1);
    						data.datasets[0].data.push(feature.properties.observations[i].f2);
    					}
    					var gaugeChart = new Chart(ctx,
    					{type: 'line',
    					data:data,
    					options: {
                bezierCurve:true,
                legend: {display:true},
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
                  tooltips:{
                    enabled: false
                  }
    						}
    					});
              showPane('#chartPane');
            }
          });
        }
      })
    }

    // Get areas where flooding is happening
    // TODO change to env config
    var url = 'https://data.petabencana.id/' + "floodgauges?city=" + city_region;
    // Get data and add to layer
    return new Promise((resolve, reject) => {
      self.data.getData(url)
      .then((data) => {
        if (data === null){
          console.log('Could not load flood extents for '+city);
          resolve(data);
        }
        else {
          self.gaugeLayer.addData(data);
          self.gaugeLayer.addTo(self.map);
          resolve(data);
        }
      })
      .catch((err) => reject(null));
    });
  }

  // Function to remove reports from map, and clear layer
  removeFloodGauges(){
    var self = this;
    if (self.gaugeLayer) {
      self.map.removeLayer(self.gaugeLayer);
      self.gaugeLayer = null;
    }
  }

}
