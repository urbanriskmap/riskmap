import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('watch-card')
//end-non-standard
export class WatchCard {
  //@bindable attributes do not work with camelCase...
}
