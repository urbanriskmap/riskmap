/* jshint esversion: 6 */
import {customElement, bindable, observable} from 'aurelia-framework';

//start-non-standard
@customElement('depth-slider')
//end-non-standard
export class DepthSlider {
  //start-non-standard
  @bindable name;
  //end-non-standard

  updateContent() {
    alert(`User: ${this.name} entered ${this.val}`);
  }
}
