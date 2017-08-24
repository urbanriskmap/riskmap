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
  @bindable termscontents;
  @bindable initializetab;
  //end-non-standard

  constructor() {
    this.seltab = 'u_a';
  }

  switchTab(name) {
    this.seltab = name;
    $('.termsTabs').removeClass("active");
    $('#tab-' + name).addClass("active");
  }

  closePopup() {
    $('#termsPopup').hide();
    if (this.selcity) {
      $('#screen').hide();
    }
  }

  openPopup(name) {
    this.seltab = name;
    $('#screen').show();
    $('#termsPopup').show();
  }

  attached() {
    $('.termsTabs').ready(() => { //selection for termsTabs switches
      if (this.initializetab) {
        this.switchTab(this.initializetab);
      }
    });
  }
}
