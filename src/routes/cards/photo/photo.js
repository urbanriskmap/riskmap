import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {Reportcard} from 'Reportcard';
var wrapper;
var cntxt;
var degree = 0;

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Photo {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    var reportCardPhoto = this.reportcard.getphoto();
    if (reportCardPhoto) {
      this.selectedPhoto = reportCardPhoto;
      this.haveImg = true;
    }
  }

  attached() {
    wrapper = this.preview;
    cntxt = wrapper.getContext('2d');
    if (this.haveImg) {
      this.drawImage(degree);
      $('#rotateButton').prop("disabled", false);
      $('#deleteButton').prop("disabled", false);
    }
  }

  sendClick() {
    $('#ghostButton').trigger('click');
  }

  drawImage(deg) {
    this.reportcard.setphoto(this.selectedPhoto);
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
    $('#rotateButton').prop("disabled", false);
    $('#deleteButton').prop("disabled", false);
    reader.readAsDataURL(this.selectedPhoto[0]);
    degree = deg;
  }

  rotatePhoto() {
    degree += 90;
    this.drawImage(degree);
  }

  deletePhoto() {
    cntxt.translate(-wrapper.width / 2, -wrapper.height / 2);
    cntxt.clearRect(0, 0, wrapper.width, wrapper.height);
    this.selectedPhoto = null;
    this.reportcard.setphoto(null);
    $('#rotateButton').prop("disabled", true);
    $('#deleteButton').prop("disabled", true);
    degree = 0;
  }
}
