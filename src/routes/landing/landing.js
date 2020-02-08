import $ from 'jquery';
import {Config} from '../../resources/config';
import { bindable, customElement, demoIntercept } from "aurelia-framework";
import { inject, observable } from "aurelia-framework";

//start-aurelia-decorators
@customElement("landing")

@inject(Config)
//end-aurelia-decorators

export class Landing {
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
    this.config = Config.map;
    this.configData = Config
  }

  activate(params, routerConfig) {
    this.queried_city = params.city;
    this.report_id = params.report;
    this.queried_lang = (this.configData.supported_languages.indexOf(params.lang) > -1) ? params.lang : null;
    this.queried_tab = (params.tab === 'info' || params.tab === 'map' || params.tab === 'report') ? params.tab : null;
    this.queried_terms = (params.terms === 'u_a' || params.terms === 'p_p') ? params.terms : null;
  }

  queryChanged(newval, oldval) {
    this.searchText = newval;
    const map = Object.keys(this.config.instance_regions);
    let newObj = map.filter(value => {
      return value.indexOf(newval) != -1 ? value : null;
    });
    this.searchResult = newObj;
  }

  isCitySupported(querycity) {
    return querycity in this.config.instance_regions;
  }

  switchCity(city) {
    this.changeCity(city, true);
    this.closePane();
  }

  //report button on the map
  reportTab(event) {
    $('#reportLink').toggle('slide');
  }

  resizeSidePane() {
    $('#sidePane').css({
      'height': ($(window).height() - $('#topBar').height()) + 'px'
    });
  }

  attached() {
    // If desktop, open side pane to 'info' tab
    // if (!(/Mobi/.test(navigator.userAgent)) && !this.report_id) {
    //   this.mapModel.togglePane('#sidePane', 'hide', false);
    // } else if (this.queried_terms) {
    //   $('#screen').show();
    //   $('#termsPopup').show();
    // }

    // Modify side pane height on the fly
    this.resizeSidePane();
    $(window).resize(() => {
      this.resizeSidePane();
    });
  }

  toggleLightbox(imageurl) {
    this.imageurl = imageurl;
  }
}
