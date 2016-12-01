import {HttpClient} from 'aurelia-http-client';
let client = new HttpClient();

// PetaBencana.id Data Class - get data from CogniCity server
export class Data {
  // Get topojson data from server, return GeoJSON
  getData(url){
    return new Promise(function(resolve, reject){
      client.get(url)
	      .then(data => {
	        resolve(JSON.parse(data.response));
	      })
		    .catch((err) => reject(err));
    });
  }
}
