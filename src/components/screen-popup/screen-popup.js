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
  @bindable switchCity;
  @bindable termscontents;
  @bindable initializetab;
  @bindable changeCity;
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
    $('#dropdown_city').on('click', function() {
      $(this).toggleClass('clicked');
  });
    this.searchText = newval.toLowerCase();
    var regexS = "[\\?&]"+newval+"=([^&#]*)";
    var regex = new RegExp( regexS ); 
    var results = regex.exec( window.location.href ); 
    console.log(this.searchText)
    if(this.searchText.length > 0){
      $('#dropdown_city').show();
    }else{
      $('#dropdown_city').hide();
    }
    const map = Object.keys(this.config.instance_regions);
    let newObj = map.filter(value => {
      return value.toLowerCase();
    });
    this.searchResult = newObj;
  }

  switchCity(city) {
    console.log(city)
    this.changeCity(city, true);
      $("#screen").css("display", "none");;

    // this.closePane();
  }

  // closePopup() {
  //   $("#termsPopup").hide();
  //   if (this.selcity) {
  //     $("#screen").hide();
  //   }
  // }

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
