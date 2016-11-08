'use strict';

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

function getPhoto(button, ghostButton) {
  $(button).click(function () {
    $(ghostButton).trigger('click');
    $(ghostButton).change(function () {
      photo = $(ghostButton)[0].files[0];
      console.log(photo);
      $('#next').trigger('click');
    });
  });
}

function uploadFile(file, id) {
  var signedRequest;
  $.get('/report/imageupload/' + id, {'file_type': photo.type}, function (response) {
    response = JSON.parse(response);
    signedRequest = response.signedRequest;
    $.ajax({
      url: signedRequest,
      type: 'PUT',
      data: file,
      contentType: false,
      processData: false,
      cache: false,
      error: function (data) {
        console.log("error uploading image");
        console.log(data);
      },
      success: function () {
        console.log("uploaded image successfully!");
        putReportImageData(id, file.name, response.url);
      }
    });
  });
}

function drawOnCard(file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var reviewImg = new Image();
    reviewImg.onload = function() {
      var wrapper = $('#photoCanvas'),
      wDiv = $('#summaryPhoto').width(),
      hPhoto = $('#summaryPhoto').height();
      wrapper[0].width = wDiv;
      wrapper[0].height = hPhoto;
      var cntxt = wrapper[0].getContext('2d'),
      wPhoto = Math.round((reviewImg.width * hPhoto) / reviewImg.height);
      cntxt.drawImage(reviewImg, (wDiv - wPhoto) / 2, 0, wPhoto, hPhoto);
    };
    reviewImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function putReportData(id, location, depth, text) {
  $.put('/report/' + id, {
    location: location,
    water_depth: depth,
    text: text,
    created_at: new Date().toISOString()
  });
}

function putReportImageData(id, filename, url_path) {
  $.put('/report/image/' + id, {
    filename: filename,
    url_path: url_path
  });
}
