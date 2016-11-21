import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
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
  updateVal() {
    this.ea.publish(this.msgName, this.depthVal);
  }
}
