'use strict';

//TODO: Replace map with background image OR remove cardFrame & use full viewport?
var map = L.map('baseMap');
L.tileLayer('https://api.mapbox.com/styles/v1/mayankojha/ciu43n5ge00bj2ilfv9vazp2e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF5YW5rb2poYSIsImEiOiJfeGl3Y01jIn0.Z3VjUlCe-W63PLsPzY_7Cw', {
}).addTo(map);
map.setView([-6.2, 106.83], 14);

//CHANGE no. of cards; by ADDING NEW CARD TITLE in required order, terms&conditions & thankYou remain second-to-last and last in array...
var titleStrings = ['Select Location', 'Report Height of Flooding', 'Upload a photo', 'Add Description', 'Review & Submit', 'Terms & Conditions', 'Report Submitted'];
var noOfCards = titleStrings.length - 2; //User input cards only; exclude Terms&Conditions and Thank you cards
var cardTracker = 0;
var reportParams = {location: null, height: null, description: null}; //Object collecting user input
var isMobile = false;

$(document).ready(function () {
  if (/Mobi/.test(navigator.userAgent)) { //TODO: test on various devices, OS/browser versions
    isMobile = true;
  }
  for (var i = 0; i < noOfCards; i += 1) { //Dot navigation buttons (tabs) tracking report progress; can be made clickable if required
    $('#tabTracker').append(
      $('<button/>').attr({
        'class': 'tabBtn',
        'id': 'tab' + i
      })
    );
    if (i !== cardTracker) {
      $('#tab' + i).prop('disabled', true);
    }
  }
  function showCard(cardNo) {
    $('.cardInner').siblings().hide();
    $('#contentCard' + cardNo).show();
    $('#contentCard' + cardNo).trigger('launch');
    $('#cardTitle').html(titleStrings[cardNo]);
  }
  $('#next').click(function () {
    if (cardTracker === 0) {
      $('#prev').prop('disabled', false);
    }
    cardTracker += 1;
    if (cardTracker < noOfCards) {
      $('#tab' + cardTracker).prop('disabled', false);
    }
    showCard(cardTracker);
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
    cardTracker -= 1;
    showCard(cardTracker);
    if (cardTracker === 0) {
      $(this).prop('disabled', true);
    }
  });
  //Show screen, card frame, first card
  $('#screen').show();
  $('#cardFrame').show();
  showCard(cardTracker);
  $('#prev').prop('disabled', true);
}); //close document.ready event


// ***CARD 0*** get/set location
//TODO: check for geolocation; else if manual, detect map.move to pass location selected = true?
$('#contentCard0').on('launch', function () {
  var cardmap = L.map('cardMapWrapper'),
  gpsLocation,
  center;
  L.tileLayer('https://api.mapbox.com/styles/v1/asbarve/ciu0anscx00ac2ipgyvuieuu9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNiYXJ2ZSIsImEiOiI4c2ZpNzhVIn0.A1lSinnWsqr7oCUo0UMT7w', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OSM</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    minZoom: 10,
    maxZoom: 20
  }).addTo(cardmap);
  cardmap.locate({
    setView: true,
    zoom: 14
  });
  $('#resetLocation').prop('disabled', true);
  cardmap.once('locationfound', function (e) { //Geolocate function
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
    $('#resetLocation').prop('disabled', false);
    reportParams.location = gpsLocation;
  });
  cardmap.once('locationerror', function () { //Execute once, Geolocate error function
    cardmap.setView([-6.2, 106.83], 14); //Jakarta default center
    $('#resetLocation').prop('disabled', true);
  });
  $('#resetLocation').click(function () {
    if (gpsLocation) {
      cardmap.flyTo(gpsLocation);
    }
    $('#resetLocation').prop('disabled', true);
  });
  cardmap.on('move', function () {
    if (gpsLocation) {
      $('#resetLocation').prop('disabled', false);
    }
  });
  var getMarkerCenter = function () {
    center = cardmap.getCenter();
    reportParams.location = center;
    console.log(reportParams.location);
  };
  $('#next').click(function () { //get selected marker location coordinates
    if (cardTracker === 0 ) {
      getMarkerCenter();
    }
  });
});


// ***CARD 1*** set height
$('#contentCard1').one('launch', function () { //launch once
  /* Custom VERTICAL HEIGHT SLIDER, required due to browser compatibility issues
  with <input type="range"> + css transformations; also limits of css styling
  of range slider. */
  var imgH = 200, //Height of reference image in cm
  startPos,
  dragPos,
  initOff = $('#slider').offset().top, //initial top offset
  fillH = $('#waterFill').height(),
  refH = $('#bgImg').height(), //height of reference image in pixels as rendered
  pressed = false,
  translateVar = - 40, //initial translateY
  stringH = ['Ankle-deep', 'Knee-deep', 'Waist-high', 'Neck-high'],
  thresholdH = [0, 35, 75, 125, imgH], //bounds for stringH
  heightInCm = Math.round((fillH * imgH) / refH);
  $('#hText').html(heightInCm + 'cm');
  reportParams.height = heightInCm;
  $('#dragRef').on('touchstart mousedown', function (e) {
    e.preventDefault();
    //$('#slider').trigger('touchstart mousedown'); //TODO: debug, requires two clicks; else use $.delay().fadeOut()
    $('#dragRef').fadeOut(400);
  });
  $('#slider').on('touchstart mousedown', function (e) {
    if (isMobile) {
      startPos = e.touches[0].pageY;
    } else {
      startPos = e.clientY;
    }
    pressed = true;
    $('#sliderKnob').prop('active', true);
    $('#cardFrame').on('touchmove mousemove', function (e) {
      if (isMobile) {
        e.preventDefault(); //TODO: single interval lag in detecting touchmove event, test with jquery dragging
        dragPos = e.touches[0].pageY;
      } else {
        dragPos = e.clientY;
      }
      heightInCm = Math.round(((fillH + (startPos - dragPos)) * imgH) / refH);
      if (pressed && heightInCm > 0 && heightInCm <= imgH) {
        $('#slider').css({
          'transform': 'translateY(' + (translateVar + dragPos - startPos) + 'px)'
        });
        $('#waterFill').height(fillH + (startPos - dragPos) + 'px');
        $('#waterFill').css({
          'background-color': 'rgba(128, 203, 196, ' + (0.1 + (heightInCm / imgH) * 0.65) + ')' //Opacity range 0.1 to 0.75
        });
        for (var i = 0; i < stringH.length; i += 1) {
          if (heightInCm > thresholdH[i] && heightInCm <= thresholdH[i + 1]) {
            $('#refText').html(stringH[i]);
            $('#hText').html(heightInCm + 'cm');
          }
        }
      }
    });
    $(document).on('touchend mouseup', function () {
      if (pressed) {
        pressed = false;
        $('#sliderKnob').prop('active', false);
        translateVar = - 40 + $('#slider').offset().top - initOff;
        fillH = $('#waterFill').height();
        reportParams.height = heightInCm;
      }
    });
  });
});


// ***CARD 2*** add photo
var photo;
$('#contentCard2').on('launch', function () {
  getPhoto('#photoCapture', '#ghostCapture'); //TODO: hide button with check against browser html5 compatibility
  getPhoto('#photoSelector', '#ghostSelector'); //TODO: check if .trigger is blocked by browser security, else try styling <input> itself
});


// ***CARD 3*** enter description
$('#contentCard3').on('launch', function () {
  var charLength = $('#descripText').val().length;
  if (charLength === 0) {
    $('#descripText').val("Enter text here...");
    $('#descripText').one('focus', function () { //jQuery alt for fn () {arg, {once: true}}
      $(this).val("");
    });
  }
  $('#descripText').keyup(function () {
    charLength = $(this).val().length;
    $('#charRef').text(charLength + "/140");
    if (charLength > 0) {
      reportParams.description = $('#descripText').val();
    }
  });
});


// ***CARD 4*** summary
$('#contentCard4').on('launch', function () {
  if (photo) {
    drawOnCard(photo);
  } //TODO else use a placeholder displaying 'no image selected'
  $('#floodH').html('Height of flooding: ' + reportParams.height + 'cm');
  if (reportParams.description) {
    $('#comment').html(reportParams.description);
  }
  //Custom HORIZONTAL SWIPE-to-SUBMIT slider
  var slideStartPos,
  slideDragPos,
  slideRange = $('#submitSlider').width() - $('#submitKnob').width(),
  slidePressed = false,
  slideThreshold = 0.9, //Slider triggers submit function at 90% swipe width
  slideTranslate = 0;
  var submitted = false; 
  $('#submitKnob').on('touchstart mousedown', function (e) {
    if (isMobile) {
      slideStartPos = e.touches[0].pageX;
    } else {
      slideStartPos = e.clientX;
    }
    slidePressed = true;
    $('#cardFrame').on('touchmove mousemove', function (e) {
      if (isMobile) {
        e.preventDefault();
        slideDragPos = e.touches[0].pageX;
      } else {
        slideDragPos = e.clientX;
      }
      slideTranslate = slideDragPos - slideStartPos;
      if (slidePressed && slideTranslate >= 0 && slideTranslate < slideRange) {
        $('#submitKnob').css({
          'left': slideTranslate + 'px'
        });
        $('#submitSlider').css({
          'background-color': 'rgba(0, 149, 136, ' + (slideTranslate / (slideThreshold * slideRange)) + ')'
        });
        if (slideTranslate >= (slideThreshold * slideRange) && !submitted) {
          submitted = true;
          cardTracker += 1; //cardTracker value override, skip t&c card & arrive at thanks card
          $('#next').trigger('click');
          var card_id = window.location.pathname.split('/').pop();
          if (photo){
            uploadFile(photo, card_id); //Upload photo
          }
          putReportData(card_id, reportParams.location, reportParams.height, reportParams.description); //Push input values
          // $.get('/reports/confirmed/', {}, function (error, response) {
          //   console.log('Get All Reports successful');
          //   console.log(response);
          // });
        }
      }
    });
    $(document).on('touchend mouseup', function () {
      if (slidePressed && slideTranslate < (slideThreshold * slideRange)) {
        slidePressed = false;
        $('#submitKnob').animate({ //Swing back to start position
          'left': 0 + 'px'
        }, 50);
        $('#submitSlider').css({ //Reset slider background
          'background-color': 'transparent'
        });
      }
    });
  });
  $('#linkToTandC').click(function () { //Launch terms & conditions
    $('#next').trigger('click');
  });
});


// ***Terms & Conditions Card***
$('#contentCard5').on('launch', function () {
  $('#cardTitle').html('Terms &amp; Conditions');
  $('#next').prop('disabled', true);
});


// ***Thank you Card***
$('#contentCard6').on('launch', function () {
  $('#next').prop('disabled', true);
  $('#prev').prop('disabled', true);
  $('.tabBtn').css({
    'border': 'none',
    'background-color': 'white',
    'opacity': '0.1'
  });
  $('#cardFrame').delay(2000).fadeOut(500);
  $('#screen').delay(2000).fadeOut(500);
  window.setTimeout(function () {
    window.location.replace('/');
  }, 2500);
});
