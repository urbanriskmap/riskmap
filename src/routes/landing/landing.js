import $ from 'jquery';

export class Landing {
  activate(params, routerConfig) {
    this.selected_city = params.city;
    this.report_id = params.report;
  }

  resizeSidePane() {
    $('#sidePane').css({
      'height': ($(window).height() - $('#topBar').height()) + 'px'
    });
  }

  attached() {
    // Modify side pane height on the fly
    this.resizeSidePane();
    $(window).resize(() => {
      this.resizeSidePane();
    });
  }
}
