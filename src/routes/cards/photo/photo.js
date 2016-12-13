import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {Reportcard} from 'Reportcard';
var wrapper;
var cntxt;

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Photo {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    if (this.reportcard.photo.file) {
      this.haveImg = true;
    }
  }

  attached() {
    wrapper = this.preview;
    cntxt = wrapper.getContext('2d');
    if (this.haveImg) {
      this.drawImage(this.reportcard.photo.rotation);
      $('#rotateButton').prop("disabled", false);
      $('#deleteButton').prop("disabled", false);
    }
  }

  sendClick() {
    $('#ghostButton').trigger('click');
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
    $('#rotateButton').prop("disabled", false);
    $('#deleteButton').prop("disabled", false);
    reader.readAsDataURL(this.reportcard.photo.file[0]);
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
