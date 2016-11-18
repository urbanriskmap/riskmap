import {inject} from 'aurelia-framework'; 
import {computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator'; 

@inject(EventAggregator)
export class Photo {
  constructor(ea) {
    this.ea = ea; 
  }

  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.selectedPhoto = routerConfig.settings.input;
    }
  }

  changedPhoto(){
    this.ea.publish('updatePhoto', this.selectedPhoto[0]); 
  }

  @computedFrom('selectedPhoto');
  get imageFile() {
    if (this.selectedPhoto) {
    //this.ea.publish('updatePhoto', this.selectedPhoto[0]); 
      console.log(this.selectedPhoto[0]);
      return; 
    }
  }
}
