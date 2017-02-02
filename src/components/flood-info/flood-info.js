import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('flood-info')
//end-non-standard
export class FloodInfo {
  //start-non-standard
  @bindable locale;
  @bindable areaname;
  @bindable districtname;
  @bindable state;
  @bindable updated;
  //end-non-standard
}
