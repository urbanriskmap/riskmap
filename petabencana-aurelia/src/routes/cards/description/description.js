import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Description {
  constructor(ea) {
    this.ea = ea;
    this.descripText = "Tell us more...";
    this.textLength = 0;
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.descripText = routerConfig.settings.input;
      this.textLength = this.descripText.length;
    }
    this.msgName = routerConfig.settings.msgName;
  }
  clearHint() {
    if (this.textLength === 0) {
      this.descripText = "";
    }
  }
  charCount() {
    this.ea.publish('updateText', this.descripText);
    this.textLength = this.descripText.length; //this.textLength requied to update bound helpers for description.html
    this.ea.publish(this.msgName, this.descripText);
  }
}
