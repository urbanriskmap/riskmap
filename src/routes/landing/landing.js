import $ from 'jquery';
import {Config} from '../../resources/config';
import {inject} from 'aurelia-framework';

//start-non-standard
@inject(Config)
//end-non-standard
export class Landing {
  constructor(Config) {
    this.config = Config;
  }

  activate(params, routerConfig) {
    this.queried_city = params.city;
    this.report_id = params.report;
    this.queried_lang = (this.config.supported_languages.indexOf(params.lang) > -1) ? params.lang : null;
    this.queried_tab = (params.tab === 'info' || params.tab === 'map' || params.tab === 'report') ? params.tab : null;
    this.queried_terms = (params.terms === 'u_a' || params.terms === 'p_p') ? params.terms : null;
  }

  resizeSidePane() {
    $('#sidePane').css({
      'height': ($(window).height() - $('#topBar').height()) + 'px'
    });
  }

  attached() {
    // If query tab specified in url, open side pane
    if (this.queried_tab && !this.report_id) {
      // Open side pane only if in a desktop browser,
      // as in a phone, side pane takes full width and map isn't visible
      if (!(/Mobi/.test(navigator.userAgent))) {
        this.mapModel.togglePane('#sidePane', 'show', true);
      }
    } else if (this.queried_terms) {
      $('#screen').show();
      $('#termsPopup').show();
    }
    // Modify side pane height on the fly
    this.resizeSidePane();
    $(window).resize(() => {
      this.resizeSidePane();
    });
  }
}
