import {HttpClient} from 'aurelia-http-client';
import * as topojson from 'topojson-client';
import * as config from './config';

let client = new HttpClient();

// PetaBencana.id Data Class - get data from CogniCity server
export class Data {
  // Get topojson data from server, return GeoJSON
  getData(url){
    return new Promise(function(resolve, reject){
      client.get(url)
      .then(data => {
        var topology = JSON.parse(data.response);
        if(topology.statusCode === 200) {
          var topoJson = topology.result;
          if(topoJson && topoJson.objects !== null) {
            resolve(topojson.feature(topoJson, topoJson.objects.output));
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      })
      .catch((err) => reject(err));
    });
  }
}
