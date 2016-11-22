/* jshint esversion: 6 */
import {customElement, bindable, observable} from 'aurelia-framework';

//start-non-standard
@customElement('description-box')
//end-non-standard
export class DescriptionBox {
  //start-non-standard
  @bindable exportText;
  @observable({changeHandler: 'textChanged'}) inputText = 'Enter text here...';
  //end-non-standard

  constructor() {
    this.charLength = 0;
  }

  clearHint() {
    if (this.charLength === 0) {
      this.inputText = '';
    }
  }

  textChanged() {
    this.charLength = this.inputText.length;
    this.exportText = this.inputText;
  }
}
