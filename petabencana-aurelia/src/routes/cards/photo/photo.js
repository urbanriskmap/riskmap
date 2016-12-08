import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {Reportcard} from 'Reportcard';
var wrapper;
var cntxt;
var degree = 90;

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
    this.helpText = "Click to upload";
  }

  attached() {
    if (this.haveImg) {
      this.drawImage();
    }
    wrapper = this.preview;
    cntxt = wrapper.getContext('2d');
  }

  sendClick() {
    $('#photoCapture').trigger('click');
  }

  drawImage(degree) {
    if (this.selectedPhoto[0]) {
      this.reportcard.setphoto(this.selectedPhoto);
      //let wrapper = this.preview;
      wrapper.width = $('#camera').width();
      wrapper.height = $('#camera').height();
      let reader = new FileReader();
      reader.onload = (e) => {
        let reviewImg = new Image();
        reviewImg.onload = () => {
          let imgW;
          let imgH;
          let trlX = 0;
          let trlY = 0;
          if (reviewImg.width >= reviewImg.height) {
            imgH = wrapper.height;
            imgW = Math.round((reviewImg.width * imgH) / reviewImg.height);
            trlX = Math.round((wrapper.width - imgW) / 2);
          } else {
            imgW = wrapper.width;
            imgH = Math.round((reviewImg.height * imgW) / reviewImg.width);
            trlY = Math.round((wrapper.height - imgH) / 2);
          }
          cntxt.translate(wrapper.width / 2, wrapper.height / 2);
          cntxt.rotate(degree * Math.PI / 180);
          cntxt.translate(- wrapper.width / 2, - wrapper.height / 2);
          cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
        };
        reviewImg.src = e.target.result;
      };
      reader.readAsDataURL(this.selectedPhoto[0]);
      this.helpText = "Click to change";
      $('#rotateButton').show();
    }
  }

  rotatePhoto() {
    this.drawImage(degree);
    degree += 90;
  }
}
