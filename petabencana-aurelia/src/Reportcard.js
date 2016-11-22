
import {inject} from 'aurelia-framework';
import {ReportcardApi} from './ReportcardApi';

var api = new ReportcardApi(); 
export class Reportcard {

  constructor(id) {
    this.api = api; 
    this.id = id; 

    this.location = null; 
    this.water_depth = null;
    this.photo = null; 
    this.description = null; 
  }

  //submits this report and also uploads the photo associated with it
  //if there is one 
  //returns a promise? 
  submitReport(){
    if (this.photo){
      this.api.uploadPhoto(this.id, this.photo)
        .then( function(url){
          console.log("uploaded photo"); 
      }).catch( msg => {
        console.log("Could not upload photo"); 
      }); 
    }
  }

}
