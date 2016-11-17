/* jshint esversion: 6 */
import {customElement, bindable, observable} from 'aurelia-framework';

@customElement('description-box')
export class DescriptionBox {
  @bindable exportText;
  @observable({changeHandler: 'textChanged'}) inputText = 'Enter text here...';

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
