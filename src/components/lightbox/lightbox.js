import {bindable, customElement} from 'aurelia-framework';


//start-aurelia-decorators
@customElement('lightbox')
//end-aurelia-decorators
export class Lightbox {
  //@bindable attributes should have no case, eg. reportcard
  //@bindable functions should be in camelCase, then in html template usage, use camel-case.call
  //start-aurelia-decorators
  @bindable fullsizeimg;
  @bindable closeLightbox;
  //end-aurelia-decorators


}
