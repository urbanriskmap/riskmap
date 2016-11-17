/* jshint esversion: 6 */
import {computedFrom} from 'aurelia-framework';

export class Photo {
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      this.selectedPhoto = routerConfig.settings.input;
    }
  }

  @computedFrom('selectedPhoto');
  get imageFile() {
    if (this.selectedPhoto) {
      console.log(this.selectedPhoto[0]);
      Photo.selectedPhoto = this.selectedPhoto;
      return Photo.selectedPhoto[0];
    }
  }
}
