import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('screen-popup')
//end-non-standard
export class ScreenPopup {
  //start-non-standard
  @bindable helper;
  @bindable cities;
  @bindable selcity;
  @bindable switchCity;
  @bindable seltab;
  @bindable termscontents;
  //end-non-standard

  switchTab(name) {
    var x = (name ? name : 'u_a');
    $('.termsTabs').removeClass("active");
    $('#tab-' + x).addClass("active");
    this.seltab = x;
  }

  closePopup() {
    $('#termsPopup').hide();
    $('#screen').hide();
  }
}
