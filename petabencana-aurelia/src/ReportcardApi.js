//This file is the model of how a report card's data looks like 
//It can be used to GET or PUT data to/from the server

import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {EventAggregator} from 'aurelia-event-aggregator';


//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class ReportcardApi {
  constructor(ea) {
    //TODO: pull this into a config file 
    this.apiBase = 'http://localhost:3000/'; 
    this.client = new HttpClient(); 
    this.client.configure( x => {
      x.withBaseUrl(this.apiBase); 
    }); 

  }

  //returns a promise that when resolved is all of the reports available
  getAllReports() {
    return this.client.get( this.apiBase + 'reports/')
      .then(data => {
        console.log(data); 
      }).catch( err => {
        console.log("error!"); 
      }); 
  }

  submitReport(Report) {
    
  }
}
