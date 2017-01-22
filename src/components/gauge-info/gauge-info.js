import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('gauge-info')
//end-non-standard
export class GaugeInfo {
  //start-non-standard
  @bindable name;
  //end-non-standard
}
