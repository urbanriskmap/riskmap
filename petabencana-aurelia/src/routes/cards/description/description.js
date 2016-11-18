import {inject} from 'aurelia-framework'; 
import {computedFrom} from 'aurelia-framework';
import {transient} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator'; 

@inject(EventAggregator) 
export class Description {
  constructor(ea) {
    this.ea = ea; 
    this.descripText = "Enter text here...";
    this.textLength = 0;
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.descripText = routerConfig.settings.input;
      this.textLength = this.descripText.length;
    }
  }
  clearHint() {
    if (this.textLength === 0) {
      this.descripText = "";
    }
  }
  charCount() {
    this.ea.publish('updateText', this.descripText); 
    this.textLength = this.descripText.length; //this.textLength requied to update bound helpers for description.html
    Description.descripText = this.descripText; //workaround, otherwise injected data in cards does not update
  }

  @computedFrom('textLength') //prevents getter in cards.js to listen for changes every 120ms
  get text() { //getter required to pass updated data
    console.log(this.descripText); 
    return this.descripText;
  }
}
