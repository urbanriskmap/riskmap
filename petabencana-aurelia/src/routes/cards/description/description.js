/* jshint esversion: 6 */
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
    this.textLength = this.descripText.length;
  }
  get text() {
    if (this.textLength !== 0) {
      return this.descripText;
    }
  }
}
