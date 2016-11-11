import {I18N} from 'aurelia-i18n';

export class Home {
  static inject = [I18N];
  constructor(i18n) {
    this.i18n = i18n;
    this.title = this.i18n.tr('title_home');
  }
}
