import {bindable, customElement} from 'aurelia-framework';

//start-aurelia-decorators
@customElement('flood-info')
//end-aurelia-decorators
export class FloodInfo {
  //start-aurelia-decorators
  @bindable locale;
  @bindable areaname;
  @bindable districtname;
  @bindable state;
  @bindable updated;
  //end-aurelia-decorators
}
