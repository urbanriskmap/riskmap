import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('card-notification')
//end-non-standard
export class CardNotification {
  //@bindable attributes do not work with camelCase...
  //start-non-standard
  @bindable locale;
  @bindable header;
  @bindable message;
  @bindable type;
  //end-non-standard

  get headerText() {
    return this.locale.notification.header[this.header];
  }

  get messageText() {
    return this.locale.notification.message[this.message];
  }
}
