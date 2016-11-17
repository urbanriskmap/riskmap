/* jshint esversion: 6 */
import {computedFrom} from 'aurelia-framework';

export class Description {
  constructor() {
    this.descripText = "Enter text here...";
    this.textLength = 0;
  }
  clearHint() {
    if (this.textLength === 0) {
      this.descripText = "";
    }
  }
  charCount() {
    this.textLength = this.descripText.length; //this.textLength requied to update bound helpers for description.html
    Description.descripText = this.descripText; //workaround, otherwise injected data in cards does not update
  }

  @computedFrom('textLength') //prevents getter in cards.js to listen for changes every 120ms
  get text() { //getter required to pass updated data
    return Description.descripText;
  }
}
