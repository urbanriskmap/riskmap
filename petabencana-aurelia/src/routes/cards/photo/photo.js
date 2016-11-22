import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class Photo {
  constructor(ea) {
    this.ea = ea;
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.selectedPhoto = routerConfig.settings.input;
      this.haveImg = true;
    }
    this.msgName = routerConfig.settings.msgName;
    this.w = 300;
    this.h = 300;
  }
  attached() {
    if (this.haveImg) {
      this.drawImage();
    }
  }
  //Add function to resize image for best-fit display within canvas;
  //Add 'change image' button, once image is selected and displayed;
  drawImage() {
    this.ea.publish(this.msgName, this.selectedPhoto);
    let wrapper = this.preview;
    let phW = this.w;
    let phH = this.h;
    let reader = new FileReader();
    reader.onload = (e) => {
      let reviewImg = new Image();
      reviewImg.onload = () => {
        let cntxt = wrapper.getContext('2d');
        cntxt.drawImage(reviewImg, 0, 0, phW, phH);
      };
      reviewImg.src = e.target.result;
    };
    reader.readAsDataURL(this.selectedPhoto[0]);
  }
}
