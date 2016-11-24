import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class Photo {
  constructor(ea) {
    this.ea = ea;
    this.helpText = "Click to upload";
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.selectedPhoto = routerConfig.settings.input;
      this.haveImg = true;
    }
    this.msgName = routerConfig.settings.msgName;
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
    if (this.selectedPhoto[0]) {
      this.ea.publish(this.msgName, this.selectedPhoto);
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
