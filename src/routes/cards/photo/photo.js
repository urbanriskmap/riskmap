import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {ReportCard} from 'resources/report-card';
import {EventAggregator} from 'aurelia-event-aggregator';
var wrapper;
var cntxt;

//start-non-standard
@inject(EventAggregator, ReportCard)
//end-non-standard
export class Photo {
  constructor(ea, ReportCard) {
    this.ea = ea;
    this.reportcard = ReportCard;
    if (this.reportcard.photo.file) {
      this.haveImg = true;
    }
    this.enableUpload = true;
  }

  uploadSupported() {
    var nua = navigator.userAgent.toLowerCase();
    var version;
    if ((nua.indexOf('android') >= 0) && (nua.indexOf('chrome') === -1)) { //android device, no chrome (add opera? etc.)
      var rest = nua.substring(nua.indexOf('android') + 8, nua.length);
      version = rest.substring(0, 3); //2-digit android version
      return (parseFloat(version) >= 4.4);
    } else {
      return true;
    }
  }

  attached() {
    if (this.uploadSupported()) {
      wrapper = this.preview;
      cntxt = wrapper.getContext('2d');
      $('#previewWrapper').addClass('enabled');
    } else {
      this.ea.publish('upload', 'error');
      this.enableUpload = false;
    }
    if (this.haveImg) {
      this.drawImage(this.reportcard.photo.rotation);
      $('#rotateButton').prop("disabled", false);
      $('#deleteButton').prop("disabled", false);
    }
  }

  sendClick() {
    $('#ghostButton').trigger('click');
    this.notify = false;
  }

  drawImage(deg) {
    wrapper.width = $('#canvas').width();
    wrapper.height = $('#canvas').height();
    let reader = new FileReader();
    reader.onload = (e) => {
      let reviewImg = new Image();
      reviewImg.onload = () => {
        let imgW;
        let imgH;
        let trlX = -wrapper.width/2;
        let trlY = -wrapper.height/2;
        if (reviewImg.width >= reviewImg.height) {
          imgH = wrapper.height;
          imgW = Math.round((reviewImg.width * imgH) / reviewImg.height);
          trlX = trlX + Math.round((wrapper.width - imgW) / 2);
        } else {
          imgW = wrapper.width;
          imgH = Math.round((reviewImg.height * imgW) / reviewImg.width);
          trlY = trlY + Math.round((wrapper.height - imgH) / 2);
        }
        cntxt.translate(wrapper.width / 2, wrapper.height / 2);
        cntxt.rotate(deg * Math.PI / 180);
        cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
      };
      reviewImg.src = e.target.result;
    };
    reader.readAsDataURL(this.reportcard.photo.file[0]);
    $('#rotateButton').prop("disabled", false);
    $('#deleteButton').prop("disabled", false);
  }

  sizeCheck() {
    if (this.reportcard.photo.file[0]) {
      if (this.reportcard.photo.file[0].size < 4404019) {
        this.drawImage(0);
      } else {
        this.ea.publish('size', 'error');
        this.reportcard.photo.file = null;
      }
    }
  }

  rotatePhoto() {
    this.reportcard.photo.rotation += 90;
    this.drawImage(this.reportcard.photo.rotation);
  }

  deletePhoto() {
    cntxt.translate(-wrapper.width / 2, -wrapper.height / 2);
    cntxt.clearRect(0, 0, wrapper.width, wrapper.height);
    this.reportcard.photo.file = null;
    $('#rotateButton').prop("disabled", true);
    $('#deleteButton').prop("disabled", true);
    this.reportcard.photo.rotation = 0;
  }
}
