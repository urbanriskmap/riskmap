import {Data} from './data';

export class Layers {

  constructor(){
    this.data = new Data;
    this.layers_key;
  }

  getReports(city_name){
    this.data.getData(city_name).then((data) => alert(data))//.catch((err) => console.log(err));

  }

}
