import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('card-notification')
//end-non-standard
export class CardNotification {
  //@bindable attributes do not work with camelCase...
  //start-non-standard
  @bindable locale;
  @bindable type;
  @bindable header;
  @bindable message;
  @bindable bespoke;
  @bindable closeNotification;
  //end-non-standard

  callClose() {
    if ($('#notifyWrapper').hasClass('active')) {
      //$('#notifyWrapper').finish();
      $('#notifyWrapper').dequeue();
      $('#notifyWrapper').slideUp(300);
    }
  }
}
