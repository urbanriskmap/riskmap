import $ from 'jquery';
import env from '../../environment';

export class Landing {
  activate(params, routerConfig) {
    if (params.city) {
      this.queried_city = params.city;
    }
    this.report_id = params.report;
    this.url_lang = (env.supported_languages.indexOf(params.lang) > -1) ? params.lang : env.default_language;
    this.tab_to_open = (params.tab === "info" || params.tab === "map" || params.tab === "report") ? params.tab : null;
    console.log('landing params: ' + JSON.stringify(params));
  }

  resizeSidePane() {
    $('#sidePane').css({
      'height': ($(window).height() - $('#topBar').height()) + 'px'
    });
  }

  attached() {
    if (this.tab_to_open && !this.report_id) {
        this.mapModel.togglePane('#sidePane', 'show', true);
    }
    // Modify side pane height on the fly
    this.resizeSidePane();
    $(window).resize(() => {
      this.resizeSidePane();
    });
  }
}
