import {bindable, customElement} from 'aurelia-framework';

//start-aurelia-decorators
@customElement('component-template')
//end-aurelia-decorators
export class ComponentTemplate {
  //@bindable attributes should have no case, eg. reportcard
  //@bindable functions should be in camelCase, then in html template usage, use camel-case.call
  //start-aurelia-decorators
  @bindable locale;
  //end-aurelia-decorators

  get x() {
    return this.y;
  }

  attached() {
    var self = this;

  }
}
