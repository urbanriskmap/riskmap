/* jshint esversion: 6 */
import {inject} from 'aurelia-framework';
import {Location} from './location/location';
import {Description} from './description/description';

@inject(Location, Description) //no semicolon
export class Cards {

  configureRouter(config, router) {
    config.title = 'Flood report';
    config.map([
      {route: '',             redirect: 'location'},
      {route: 'location',     moduleId: './location/location',        settings: {title: 'Select location',    cardNo: 1}},
      {route: 'depth',        moduleId: './depth/depth',              settings: {title: 'Report water depth', cardNo: 2}},
      {route: 'photo',        moduleId: './photo/photo',              settings: {title: 'Upload a photo',     cardNo: 3}},
      {route: 'description',  moduleId: './description/description',  settings: {title: 'Add description',    cardNo: 4}},
      {route: 'review',       moduleId: './review/review',            settings: {title: 'Review & submit',    cardNo: 5}}
    ]);
    this.router = router;
  }

  constructor(location, description) { //Takes input from injected class, same order of params as injected class objects
    this.location = location;
    this.description = description;
  }

  activate(params) {
    this.id = params.id;
  }

  attached() {
    this.totalCards = this.router.routes.length - 1; //exclude {route:'', redirect:'location')
    this.count = this.router.currentInstruction.config.settings.cardNo;
  }

  get cardTitle() {
    return this.router.currentInstruction.config.settings.title;
  }

  nextCard() {
    if (this.count < this.totalCards) {
      this.count+=1;
      this.router.navigate(this.router.routes[this.count].route);
    }
  }

  prevCard() {
    if (this.count > 1) {
      this.count-=1;
      this.router.navigate(this.router.routes[this.count].route);
    }
  }

  get nextDisabled() {
    if (this.count === 1) {
      return !this.location.selectedLocation;
    } else {
      return this.count === this.totalCards;
    }
  }

  get prevDisabled() {
    return this.count === 1;
  }

  testFn() {
    console.log(this.description);
  }
}
