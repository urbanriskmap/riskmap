import { bindable, customElement, demoIntercept } from "aurelia-framework";
import { inject, observable } from "aurelia-framework";
import { Config } from "resources/config";

//start-aurelia-decorators
@customElement("screen-popup")
@inject(Config)

//end-aurelia-decorators
export class ScreenPopup {
  //start-aurelia-decorators
  @bindable
  helper;
  @bindable cities;
  @bindable selcity;
  @bindable switchRegion;
  @bindable termscontents;
  @bindable initializetab;
  //end-aurelia-decorators
  @observable query;
  constructor(Config) {
    this.seltab = "about";
    this.config = Config.map;
  }

  languages = [
    /* languages */
  ];

  switchTab(name) {
    this.seltab = name;
    $(".termsTabs").removeClass("active");
    $("#tab-" + name).addClass("active");
  }

  isCitySupported(querycity) {
    return querycity in this.config.instance_regions;
  }

  queryChanged(newval, oldval) {
    this.searchText = newval;
    const map = Object.keys(this.config.sub_regions);
    let newObj = map.filter(value => {
      return value.indexOf(newval) != -1 ? value : null;
    });
    this.searchResult = newObj;
  }

  openPopup(name) {
    this.seltab = name;
    $("#screen").show();
    $("#termsPopup").show();
  }

  attached() {
    $(".termsTabs").ready(() => {
      //selection for termsTabs switches
      if (this.initializetab) {
        this.switchTab(this.initializetab);
      }
    });
  }
}
