
import {inject} from 'aurelia-framework';
import {ReportcardApi} from 'ReportcardApi';

var api = new ReportcardApi();

export class Jakarta {
  attached() {
    this.api = api;
    this.api.getAllReports()
      .then( response =>
            this.reports = response);
  }
  
}
