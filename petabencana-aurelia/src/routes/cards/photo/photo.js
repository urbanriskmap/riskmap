/* jshint esversion: 6 */

export class Photo {
  constructor() {
    //this.selectedPhoto = false;
  }

  getPhoto() {
  }

  get imageFile() {
    if (this.selectedPhoto) {
      console.log(this.selectedPhoto[0]);
      return this.selectedPhoto[0];
    }
  }
}
