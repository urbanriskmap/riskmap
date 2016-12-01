import {HttpClient} from 'aurelia-fetch-client';
let client = new HttpClient();

// PetaBencana.id Data Class - get data from CogniCity server
export class Data {
  // Get topojson data from server, return GeoJSON
  getData(url){
    return new Promise(function(resolve, reject){
      client.fetch(url)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch((err) => reject(err));
    });
  }
}
