import {inject, noView} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'resources/config';

//start-aurelia-decorators
@noView
@inject(Config)
//end-aurelia-decorators
export class PointsService {
  constructor(Config) {
    this.config = Config.map;
  }

  // Send patch request to update report points,
  // accepts parameter vote : 1 or -1
  updatePoints(id, vote) {
    return new Promise((resolve, reject) => {
      if (id) {
        const client = new HttpClient();
        const url = this.config.data_server +
        'reports/' + id;
        const body = {
          points: vote
        };

        client.patch(url, body)
        .then(result => {
          if (result.statusCode && result.statusCode === 200) {
            resolve(result.response.points);
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
}
