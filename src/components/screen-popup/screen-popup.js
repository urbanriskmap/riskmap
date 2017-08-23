import {bindable, customElement} from 'aurelia-framework';

//start-aurelia-decorators
@customElement('screen-popup')
//end-aurelia-decorators
export class ScreenPopup {
  //start-aurelia-decorators
  @bindable helper;
  @bindable cities;
  @bindable selcity;
  @bindable switchCity;
  @bindable termscontents;
  @bindable initializetab;
  //end-aurelia-decorators

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
