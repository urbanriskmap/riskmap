import {HttpClient} from 'aurelia-fetch-client';
let client = new HttpClient();
export class Data {

  constructor(){
  }

  getData(city_name){
    //return new Promise();
    //alert(city_name);
    return new Promise(function(resolve, reject){
      client.fetch('/package.json')
	      .then(response => response.json())
	      .then(data => {
	        resolve(city_name+'_')
	      })
		    .catch((err) => reject(err));
    })
  }
  //get data from server endpoints

  //generic get data function

  //generic topojson function

  //return data to layers

}
