import $ from 'jquery';
import env from '../../environment';

export class Landing {
  activate(params, routerConfig) {
    this.queried_city = params.city;
    this.report_id = params.report;
    this.queried_lang = (env.supported_languages.indexOf(params.lang) > -1) ? params.lang : null;
    this.queried_tab = (params.tab === 'info' || params.tab === 'map' || params.tab === 'report') ? params.tab : null;
  }

  resizeSidePane() {
    $('#sidePane').css({
      'height': ($(window).height() - $('#topBar').height()) + 'px'
    });
  }

  attached() {
    // If query tab specified in url, open side pane
    if (this.queried_tab && !this.report_id) {
        this.mapModel.togglePane('#sidePane', 'show', true);
    }
    // Modify side pane height on the fly
    this.resizeSidePane();
    $(window).resize(() => {
      this.resizeSidePane();
    });
  }
}
