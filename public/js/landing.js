'use strict';

//Replace map with background image
var map = L.map('baseMap');
L.tileLayer('https://api.mapbox.com/styles/v1/mayankojha/ciu43n5ge00bj2ilfv9vazp2e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF5YW5rb2poYSIsImEiOiJfeGl3Y01jIn0.Z3VjUlCe-W63PLsPzY_7Cw', {
}).addTo(map);
map.setView([-6.2, 106.83], 14);

//CHANGE no. of cards; by ADDING NEW CARD TITLE in right order, terms&conditions & thank you remain second-to-last and last in array...
var titleStrings = ['Select Location', 'Report Height of Flooding', 'Add Description', 'Review & Submit', 'Terms & Conditions', 'Report Submitted'];
var noOfCards = titleStrings.length - 2; //User input cards only; exclude Terms&Conditions and Thank you cards
var cardTracker = 0;
var reportParams = {location: null, height: null, description: null}; //Object collecting user input

$(document).ready(function () {

  //Dot navigation buttons (tabs) tracking report progress; can be made clickable if required
  for (var i = 0; i < noOfCards; i = i + 1) {
    $('#tabTracker').append(
      $('<button/>').attr({ //TODO: this is better done with id's or classes instead of searching through html
      'class': 'tabBtn',
      'id': 'tab' + i
    })
  );
  if (i !== cardTracker) {
    $('#tab' + i).prop('disabled', true);
  }
}

var showCard = function (cardNo) {
  $('.cardInner').siblings().hide();
  $('#contentCard' + cardNo).show();
  $('#cardTitle').html(titleStrings[cardNo]);
};

$('#next').click(function () {
  if (cardTracker === 0) {
    $('#prev').prop('disabled', false);
  }
  cardTracker = cardTracker + 1;
  if (cardTracker < noOfCards) {
    $('#tab' + cardTracker).prop('disabled', false);
  }
  showCard(cardTracker);
  $('#contentCard' + cardTracker).trigger('launch');
  if (cardTracker >= (noOfCards - 1)) {
    $(this).prop('disabled', true);
  }
});

$('#prev').click(function () {
  if (cardTracker === (noOfCards - 1)) {
    $('#next').prop('disabled', false);
  }
  if (cardTracker < noOfCards) {
    $('#tab' + cardTracker).prop('disabled', true);
  }
  cardTracker = cardTracker - 1;
  showCard(cardTracker);
  if (cardTracker === 0) {
    $(this).prop('disabled', true);
  }
});

//Show screen, card frame, first card
$('#screen').show();
$('#cardFrame').show();
showCard(cardTracker);
$('#contentCard' + cardTracker).trigger('launch');
$('#prev').prop('disabled', true);
}); //close document.ready event

//AJAX doesn't have convenient $.put & $.delete methods
function _ajax_request(url, data, callback, method) {
  return $.ajax({
    dataType: "json",
    contentType: "application/json",
    url: url,
    type: method,
    data: JSON.stringify(data),
    success: callback
  });
}

$.extend({
  put: function (url, data, callback) {
    return _ajax_request(url, data, callback, 'PUT');
  }
});

// ***CARD 0*** get/set location
$('#contentCard0').on('launch', function () {
  var cardmap = L.map('cardMapWrapper'),
  //TODO: this is super slow (at least on my machine, unclear if we can make faster

  geolocated = false,
  markerPlaced = false,
  gpsLocation,
  center,
  marker,
  markerIcon = L.icon({
    iconUrl: '/svg/marker-11.svg',
    iconSize: [60, 60],
    iconAnchor: [30, 60]
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/mayankojha/ciu43n5ge00bj2ilfv9vazp2e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF5YW5rb2poYSIsImEiOiJfeGl3Y01jIn0.Z3VjUlCe-W63PLsPzY_7Cw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    minZoom: 10,
    maxZoom: 20
  }).addTo(cardmap);

  cardmap.locate({
    setView: true,
    zoom: 14
    //maxBounds: boundsC
    //TODO: will have to retain cambridge & jakarta map variables for the development stage,
    //geolocation doesn't work otherwise; most of the commented code is for later Use
  });

  $('#setLocation').prop('disabled', true);
  $('#resetLocation').prop('disabled', true);
  $('#next').prop('disabled', true);

  /* BOUNDS for Jakarta as per field team's inputs
  var boundsJ = [
  // Jakarta
  [-6.5, 106.5], // Southwest coordinates
  [-5.9, 107.05]  // Northeast coordinates
];
var boundsC = [
// Cambridge
[42.2, -71.2], // Southwest coordinates
[42.5, -70]  // Northeast coordinates
];
*/

//Geolocate function
cardmap.once('locationfound', function (e) {
  gpsLocation = cardmap.getCenter();

  L.circle(gpsLocation, {
    weight: 0,
    fillColor: 'green',
    fillOpacity: 0.15,
    radius: e.accuracy / 2
  }).addTo(cardmap);

  L.circleMarker(gpsLocation, {
    color: 'white',
    weight: 1,
    fillColor: 'green',
    fillOpacity: 1,
    radius: 8
  }).addTo(cardmap);

  marker = L.marker(gpsLocation, {
    icon: markerIcon
  }).addTo(cardmap);

  geolocated = true;
  markerPlaced = true;
  $('#setLocation').prop('disabled', true);
  $('#resetLocation').prop('disabled', false);
  $('#next').prop('disabled', false);

  reportParams.location = gpsLocation;
});

//Geolocate error function
cardmap.once('locationerror', function () { //Execute once
  //TODO: alert(e.message); //add msg here; 'enable gps location'

  //Set view to default center
  cardmap.setView([-6.2, 106.83], 14); //Jakarta
  //cardmap.setView([42.365, -71.095], 14); //Cambridge

  //Set map pan bounds
  //cardmap.setMaxBounds(boundsJ);
  //cardmap.setMaxBounds(boundsC);

  center = cardmap.getCenter();

  $('#setLocation').prop('disabled', false);
  $('#resetLocation').prop('disabled', true);
});

//Update picker position & toggle buttons
cardmap.on('move', function () {
  center = cardmap.getCenter();
  $('#setLocation').prop('disabled', false);
  if (geolocated) {
    $('#resetLocation').prop('disabled', false);
  }
});

$('#setLocation').click(function () {
  if (markerPlaced) {
    cardmap.removeLayer(marker);
  }

  marker = L.marker(center, {
    icon: markerIcon
  }).addTo(cardmap);

  markerPlaced = true;
  $('#setLocation').prop('disabled', true);
  $('#next').prop('disabled', false);

  reportParams.location = center;
});

$('#resetLocation').click(function () {
  if (geolocated) {
    cardmap.flyTo(gpsLocation);
  }
  $('#resetLocation').prop('disabled', true);
});
});


// ***CARD 1*** set height
$('#contentCard1').one('launch', function () { //launch once
  //Hide reference drag to set height image
  $('#dragRef').delay(1000).fadeOut(500);
  $('#hideZone').delay(1000).hide(500);

  /* Custom VERTICAL HEIGHT SLIDER, required due to browser compatibility issues
  with <input type="range"> + css transformations; also limits of css styling
  of range slider. */

  var imgH = 200, //Height of reference image in cm
  startPos,
  dragPos,
  initOff = $('#sliderKnob').offset().top, //initial top offset
  fillH = $('#waterFill').height(),
  refH = $('#bgImg').height(), //height of reference image in pixels as rendered
  pressed = false,
  translateVar = -12, //half of height of knob, initial translateY
  stringH = ['Ankle-deep', 'Knee-deep', 'Waist-high', 'Neck-high', 'Above-neck'],
  thresholdH = [0, 25, 50, 100, 150, imgH], //bounds for stringH, [0]=-1 to include 0cm...
  heightInCm = Math.round((fillH * imgH) / refH);

  $('#hText').html(heightInCm + 'cm');
  reportParams.height = heightInCm;

  //Working desktop browser function; TODO touch functionality for phone
  $('#sliderKnob').on('touchstart mousedown', function (e) {
    startPos = e.originalEvent.pageY;
    pressed = true;
  });
  $('#cardFrame').on('touchmove mousemove', function (e) {
    e.preventDefault();
    dragPos = e.originalEvent.pageY;
    heightInCm = Math.round(((fillH + (startPos - dragPos)) * imgH) / refH);
    if (pressed && heightInCm > 0 && heightInCm <= imgH) {
      $('#sliderKnob').css({
        'transform': 'translateY(' + (translateVar + dragPos - startPos) + 'px)'
      });
      $('#waterFill').height(fillH + (startPos - dragPos) + 'px');
      $('#waterFill').css({
        'background-color': 'rgba(128, 203, 196, ' + (0.1 + (heightInCm / imgH) * 0.65) + ')' //Opacity range 0.1 to 0.75
      });
      for (var i = 0; i < stringH.length; i = i + 1) {
        if (heightInCm > thresholdH[i] && heightInCm <= thresholdH[i + 1]) {
          $('#hText').html(stringH[i] + ', ' + heightInCm + 'cm');
        }
      }
    }
  });
  $(document).on('touchend mouseup', function () {
    if (pressed) {
      pressed = false;
      translateVar = -12 + $('#sliderKnob').offset().top - initOff;
      fillH = $('#waterFill').height();
      reportParams.height = heightInCm;
    }
  });
});

// ***CARD 2*** enter description
$('#contentCard2').on('launch', function () {
  var charLength = $('#descripText').val().length;

  if (charLength === 0) {
    $('#descripText').val("Enter text here...");

    $('#descripText').one('focus', function () { //jQuery alt for fn () {arg, {once: true}}
      $(this).val("");
    });
  }

  $('#descripText').keyup(function () { //TODO: check compatibility of keyup with phone browser input keyboards
    charLength = $(this).val().length;
    $('#charRef').text(charLength + "/140");

    if (charLength > 0) {             //will give true for default text also, check...
      reportParams.description = $('#descripText').val();
    }
  });
});


// ***CARD 3*** summary
$('#contentCard3').on('launch', function () {
  $('#floodH').html('Height of flooding: ' + reportParams.height + 'cm');
  if (reportParams.description) {
    $('#comment').html(reportParams.description);
  }

  //Custom HORIZONTAL SWIPE to SUBMIT slider TODO: phone touch compatibility
  var slideStartPos,
  slideDragPos,
  slideRange = $('#submitSlider').width() - $('#submitKnob').width(),
  slidePressed = false,
  slideThreshold = 0.9, //Slider triggers submit function at 90% swipe width
  slideTranslate = 0;

  $('#submitKnob').mousedown(function (e) {
    slideStartPos = e.pageX;
    slidePressed = true;
  });

  $('#reviewSubmit').mousemove(function (e) {
    slideDragPos = e.pageX;
    slideTranslate = slideDragPos - slideStartPos;
    if (slidePressed && slideTranslate >= 0 && slideTranslate < slideRange) {
      $('#submitKnob').css({
        'left': slideTranslate + 'px'
      });
      $('#submitSlider').css({
        'background-color': 'rgba(0, 149, 136, ' + (slideTranslate / (slideThreshold * slideRange)) + ')'
      });

      if (slideTranslate >= (slideThreshold * slideRange)) { //CODE for SUBMIT BUTTON here...
        var card_id = window.location.pathname.split('/').pop();
        var data = {
          location: reportParams.location,
          water_depth: reportParams.height,
          text: reportParams.description,
          created_at: new Date().toISOString(),
          image_id: 123 //Placeholder ID until AWS integration is complete
        };
        $.put('/report/' + card_id, data, function(result) {
          console.log('Report ID json: ' + result);          
        });

        cardTracker = cardTracker + 1; //cardTracker value override, skip t&c card & arrive at thanks card
        window.setTimeout(function() {
          window.location.replace('/');
        }, 2500);
        $('#next').trigger('click');
      }
    }
  });

  $(document).mouseup(function () {
    if (slidePressed && slideTranslate < (slideThreshold * slideRange)) {
      $('#submitKnob').animate({ //Swing back to start position
        'left': 0 + 'px'
      }, 50);
      $('#submitSlider').css({ //Reset slider background
        'background-color': 'transparent'
      });
    }
    slidePressed = false;
  });
  $('#linkToTandC').click(function () { //Launch terms & conditions
    $('#next').trigger('click');
  });
});


// ***Terms & Conditions Card***
$('#contentCard4').on('launch', function () {
  $('#cardTitle').html('Terms &amp; Conditions');
  $('#next').prop('disabled', true);
});


// ***Thank you Card***
$('#contentCard5').on('launch', function () {
  $('#next').prop('disabled', true);
  $('#prev').prop('disabled', true);
  $('.tabBtn').css({
    'border': 'none',
    'background-color': 'white',
    'opacity': '0.1'
  });
  $('#cardFrame').delay(2000).fadeOut(500);
  $('#screen').delay(2000).fadeOut(500);
});
