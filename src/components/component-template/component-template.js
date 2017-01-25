import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('component-template')
//end-non-standard
export class ComponentTemplate {
  //@bindable attributes should have no case, eg. reportcard
  //@bindable functions should be in camelCase, then in html template usage, use camel-case.call
  //start-non-standard
  @bindable locale;
  //end-non-standard

  get x() {
    return this.y;
  }

  attached() {
    var self = this;

  }
}
