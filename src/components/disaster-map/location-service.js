import {inject, noView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'resources/config';

//start-aurelia-decorators
@noView
@inject(Config)
//end-aurelia-decorators
export class LocationService {
  constructor(Config) {
    this.config = Config.map;
  }

  //   // Send patch request to update report points,
  //   // accepts parameter vote : 1 or -1
  //   updatePoints(id, vote) {
  //     return new Promise((resolve, reject) => {
  //       if (id) {
  //         const client = new HttpClient();
  //         const url = this.config.data_server +
  //         'reports/' + id;
  //         const body = {
  //           points: vote
  //         };

  //         client.patch(url, body)
  //         .then(result => {
  //           if (result.statusCode && result.statusCode === 200) {
  //             resolve(result.response.points);
  //           } else {
  //             reject(result);
  //           }
  //         })
  //         .catch(error => reject(error));
  //       } else {
  //         reject('Error with report id');
  //       }
  //     });
  //   }
  isCityInPoint(point, city) {
    return new Promise((resolve, reject) => {
      if (point) {
        const client = new HttpClient();
        // cities.forEach(function(city, index) {
        const url = this.config.data_server +
        'cities/bounds?city=' + city + '&geoformat=geojson&lat=' + point.latitude + '&long=' + point.longitude;
        client.get(url)
          .then(result => {
            if (result.statusCode && result.statusCode === 200) {
              resolve(JSON.parse(result.response));
            } else {
              reject(result);
            }
          })
          .catch(error => reject(error));
      } else {
        reject('Error with report id');
      }
    });
  }

  filterPointInCities(point, cities) {
    return new Promise((resolve, reject) => {
      let self = this;
      let targetCity = 'java';
      for ( let city of cities) {
        self.isCityInPoint(point, city).then(resp => {
          if (resp.result.pointInCity) { 
            targetCity = resp.result.cityName;
            resolve(targetCity);
          }
        }); 
      }
    });
    // cities.some(function(city, index) {
    //   self.isCityInPoint(point, city).then(resp => {
    //     if (resp.result.pointInCity) { targetCity = resp.result.cityName; return true;}
    //     // return true;
    //   });
    // });
    // return targetCity;
  }
}
