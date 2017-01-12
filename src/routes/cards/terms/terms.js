import $ from 'jquery';
import {Reportcard} from 'Reportcard';
import {inject} from 'aurelia-framework';

@inject(Reportcard)

export class Terms {
  constructor(report_card) {
    this.locale = report_card.locale;
  }
}
