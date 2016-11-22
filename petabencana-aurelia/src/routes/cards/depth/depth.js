import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class Depth {
  constructor(ea) {
    this.ea = ea;
    this.depthVal = 40;
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.depthVal = routerConfig.settings.input;
    }
    this.msgName = routerConfig.settings.msgName;
  }
  attached() {
    this.imgHeightCm = 200;
    this.refHeightPx = this.sliderZone.clientHeight;
    this.fillHeight = this.floodZone.clientHeight;
    this.pressed = false;
    document.getElementById('knobWrapper').addEventListener('mousedown', function (e) {
      this.startPos = e.clientY;
      console.log(this.startPos);
    });
  }
  knobPress(e) {
    this.startPos = e.clientY;
    console.log(this.startPos);
  }
  knobDrag() {

  }
  knobRelease() {

  }
  updateVal() {
    this.ea.publish(this.msgName, this.depthVal);
  }
}
