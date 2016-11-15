/* jshint esversion: 6 */
import {computedFrom} from 'aurelia-framework';

export class Description {
  attached() {
    this.descripText = "Enter text here...";
    this.textLength = 0;
  }
  clearText() {
    if (this.textLength === 0) {
      this.descripText = "";
    }
  }
  charCount() {
    this.textLength = this.descripText.length;
  }

  @computedFrom('descripText')
  get text() {
    if (this.textLength !== 0) {
      console.log(this.descripText);
      return `${this.descripText}`;
    }
  }
}
