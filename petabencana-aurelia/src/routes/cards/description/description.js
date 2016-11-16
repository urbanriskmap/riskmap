/* jshint esversion: 6 */
import {computedFrom} from 'aurelia-framework';

export class Description {
  attached() {
    Description.descripText = "Enter text here...";
    Description.textLength = 0;
  }
  clearText() {
    if (this.textLength === 0) {
      this.descripText = "";
    }
  }
  charCount() {
    this.textLength = this.descripText.length;
    Description.textLength = this.textLength;
    Description.descripText = this.descripText;
  }

  @computedFrom('descripText')
  get text() {
    if (Description.descripText) {
          return `${Description.descripText}`;
    }
  }
}
