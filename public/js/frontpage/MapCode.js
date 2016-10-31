mapboxgl.accessToken = 'pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w';
var map = new mapboxgl.Map({
  container: 'MapContain', // container id
  style: 'mapbox://styles/asbarve/ciu0anscx00ac2ipgyvuieuu9', //stylesheet location
  center: [106.83, -6.25], // starting position
  zoom: 10, // starting zoom
  attributionControl: false,
  maxZoom: 20,
  minZoom: 9,
})
// Add geolocation to the map.
var geolocate = new mapboxgl.Geolocate({position: 'top-left'});
map.addControl(geolocate);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.Navigation());

// for flyto controls
var spd = .5;
var zom = 10;
var crv = 1.43;


var url = 'https://raw.githubusercontent.com/ojha-url/URL_Internal/master/Test_jakarta.json';  //url of json data



// Cambridge for test
document.getElementById('Cambridge_test').addEventListener('click', function () {
  url = 'https://raw.githubusercontent.com/ojha-url/URL_Internal/master/test-cambridge.json'; //TODO  - remove cambridge
  map.flyTo({
    center: [ -71.0942, 42.3601 ],
    speed: spd, // make the flying slow
    zoom: zom,
    curve: crv
  });
});

// Jakarta
document.getElementById('Jakarta').addEventListener('click', function () {
  url = 'https://raw.githubusercontent.com/ojha-url/URL_Internal/master/Test_jakarta.json', //TODO  - change the links
  map.flyTo({
    center: [ 106.83, -6.25 ],
    speed: spd, // make the flying slow
    zoom: zom,
    curve: crv
  });
});

// Surabaya
document.getElementById('Surabaya').addEventListener('click', function () {
  url = 'https://raw.githubusercontent.com/ojha-url/URL_Internal/master/Test_surabaya.json', //TODO  - change the links
  map.flyTo({
    center: [ 112.75, -7.25 ],
    speed: spd, // make the flying slow
    zoom: zom,
    curve: crv
  });
});

// Bandung
document.getElementById('Bandung').addEventListener('click', function () {
  url = 'https://raw.githubusercontent.com/ojha-url/URL_Internal/master/Test_bandung.json', //TODO  - change the links
  map.flyTo({
    center: [ 107.61, -6.91 ],
    speed: spd, // make the flying slow
    zoom: zom,
    curve: crv
  });
});

map.on('load', function () {
  window.setInterval(function() {
    map.getSource('report').setData(url);
  }, 2000);

  map.addSource('report', { type: 'geojson', data: url });

  map.addLayer({
    "id": "report",
    "type": "symbol",
    "source": "report",
    "layout": {
      "icon-image": "marker-15"
    }

  });
});


//popup
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['report'] });
  var feature = features[0];

  // Populate the popup and set its coordinates
  // based on the feature found.
  var popup = new mapboxgl.Popup()
  .setLngLat(feature.geometry.coordinates)
  .setHTML('<b>Live Report<br> Source: </b>' + feature.properties.source +'<b><br>Status:</b> '+ feature.properties.status)
  .addTo(map);
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['report'] });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});
