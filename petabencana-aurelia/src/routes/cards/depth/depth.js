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
  }
  updateVal() {
    this.ea.publish('changedDepth', this.depthVal);
  }
}
