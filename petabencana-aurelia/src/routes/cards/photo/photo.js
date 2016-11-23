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
        if (reviewImg.width >= reviewImg.height) {
          imgH = wrapper.height;
          imgW = Math.round((reviewImg.width * imgH) / reviewImg.height);
          console.log(wrapper.width + ', ' + wrapper.height);
          console.log(reviewImg.width + ', ' + reviewImg.height);
          console.log(imgW + ', ' + imgH);
        } else {
          imgW = wrapper.width;
          imgH = Math.round((reviewImg.height * imgW) / reviewImg.width);
          console.log(wrapper.width + ', ' + wrapper.height);
          console.log(reviewImg.width + ', ' + reviewImg.height);
          console.log(imgW + ', ' + imgH);
        }
        let cntxt = wrapper.getContext('2d');
        cntxt.drawImage(reviewImg, 0, 0, imgW, imgH);
      };
      reviewImg.src = e.target.result;
    };
    reader.readAsDataURL(this.selectedPhoto[0]);
    this.helpText = "Click to change";
  }
}
