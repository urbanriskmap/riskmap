import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';

let client = new HttpClient();

// PetaBencana.id Data Class - get data from CogniCity server
export class Data {
  // Get topojson data from server, return GeoJSON
  getData(url){
    return new Promise(function(resolve, reject){
      client.get(url)
      .then(data => {
        var response = JSON.parse(data.response);
        if(response && response.objects !== null) {
          resolve(topojson.feature(response, response.objects.output));
        } else {
          resolve(null);
        }
      })
      .catch((err) => reject(err));
    });
  }
}
