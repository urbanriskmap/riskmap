/* jshint esversion: 6 */
import {customElement, bindable, observable} from 'aurelia-framework';

@customElement('depth-slider')
export class DepthSlider {
  @bindable name;

  updateContent() {
    alert(`User: ${this.name} entered ${this.val}`);
  }
}
