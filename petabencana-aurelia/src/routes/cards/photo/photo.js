import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Photo {
  constructor(Reportcard) {
    this.helpText = "Click to upload";
    this.reportcard = Reportcard;
  }
  activate(params, routerConfig) {
    var that = this;
    var reportCardPhoto = that.reportcard.getphoto();
    if (reportCardPhoto) {
      this.selectedPhoto = reportCardPhoto;
      this.haveImg = true;
    }
  }
  attached() {
    if (this.haveImg) {
      this.drawImage();
    }
  }
  sendClick() {
    $('#photoCapture').trigger('click');
  }
  drawImage() {
    var that = this;
    if (this.selectedPhoto[0]) {
      that.reportcard.setphoto(this.selectedPhoto);
      let wrapper = this.preview;
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
          let cntxt = wrapper.getContext('2d');
          cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
        };
        reviewImg.src = e.target.result;
      };
      reader.readAsDataURL(this.selectedPhoto[0]);
      this.helpText = "Click to change";
    }
  }
}
