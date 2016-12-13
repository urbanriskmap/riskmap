import {inject} from 'aurelia-framework';
import {ReportcardApi} from './ReportcardApi';

var api = new ReportcardApi();
export class Reportcard {
  static metadata() {
    return Metadata.singleton(true);
  } //true indicates to register in the root container

  constructor(id) {
    this.api = api;
    this.id = id;

    this.location = {markerLocation: null, gpsLocation: null, accuracy: null};
    this.waterDepth = null;
    this.photo = {file: null, rotation: 0};
    this.description = {hint: "Enter description here...", value: null};
  }

  //submits this report and also uploads the photo associated with it
  //if there is one
  //returns a promise?
  submitReport(){
    if (this.photo.file) {
      this.api.uploadPhoto(this.id, this.photo.file)
        .then( function(url){
          console.log("uploaded photo");
      }).catch( msg => {
        console.log("Could not upload photo");
      });
    }
  }
}
