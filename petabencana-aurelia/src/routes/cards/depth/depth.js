/* jshint esversion: 6 */
import {computedFrom} from 'aurelia-framework';

export class Depth {
  constructor() {
    this.depthVal = 40;
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.depthVal = routerConfig.settings.input;
    }
  }
  updateVal() {
    Depth.depthVal = this.depthVal;
  }

  @computedFrom('depthVal')
  get waterDepth() {
    return Depth.depthVal;
  }
}
