import {inject} from 'aurelia-framework';
import {Location} from './location/location';
import {Depth} from './depth/depth';
import {Photo} from './photo/photo';
import {Description} from './description/description';
import {EventAggregator} from 'aurelia-event-aggregator'; 

@inject(EventAggregator, Location, Depth, Photo, Description) //no semicolon
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

  constructor(ea, location, depth, photo, description) { //Takes input from injected class, same order of params as injected class objects
    this.ea = ea; 
    this.location = location;
    this.depth = depth;
    this.photo = photo;
    this.description = description;
    this.eaDescriptionText = "Initial eaDescriptionText"; 
  }

  activate(params) { //get card id
    this.id = params.id;
  }

  attached() {
    this.totalCards = this.router.routes.length - 1; //exclude {route:'', redirect:'location')
    this.inputs = [];
    for (let i = 0; i < this.totalCards; i+=1) { //better es6 method? .push?
      this.inputs[i] = {type: this.router.routes[i+1].route};
    }
    this.ea.subscribe('updateText', msg => this.eaDescriptionText = msg); 
    this.ea.subscribe('updatePhoto', msg => this.eaPhoto = msg); 
  }

  get count() {
    this.cardNo = this.router.currentInstruction.config.settings.cardNo;
    return this.cardNo;
  }
  set count(val) {
    this.cardNo = this.count + val;
  }

  get cardTitle() {
    return this.router.currentInstruction.config.settings.title;
  }

  nextCard() {
    if (this.cardNo < this.totalCards) {
      if (this.cardNo === 1) {
        this.router.currentInstruction.config.settings.input = this.location.selectedLocation;
        this.userInputs = {index: this.cardNo - 1, value: this.location.selectedLocation};
      }
      if (this.cardNo === 2) {
        this.router.currentInstruction.config.settings.input = this.depth.waterDepth;
        this.userInputs = {index: this.cardNo - 1, value: this.depth.waterDepth};
      }
      if (this.cardNo === 3) {
        this.router.currentInstruction.config.settings.input = this.photo.imageFile;
        this.userInputs = {index: this.cardNo - 1, value: this.photo.imageFile};
      }
      if (this.cardNo === 4) {
        this.router.currentInstruction.config.settings.input = this.description.text;
        this.userInputs = {index: this.cardNo - 1, value: this.description.text};
      }
      this.count = 1;
      this.router.navigate(this.router.routes[this.cardNo].route);
    }
  }

  prevCard() {
    if (this.cardNo > 1) {
      this.count = -1;
      this.router.navigate(this.router.routes[this.cardNo].route);
    }
  }

  testfn() {
    console.log("testfn"); 
    console.log(this.eaDescriptionText); 
    console.log(this.eaPhoto); 
    console.log("End testfn"); 
  }

  get nextDisabled() {
    if (this.cardNo === 1) {
      return !this.location.selectedLocation;
    } else {
      return this.cardNo === this.totalCards;
    }
  }

  get prevDisabled() {
    return this.cardNo === 1;
  }

  get userInputs() {
    return this.inputs;
  }

  set userInputs(val) {
    this.inputs[val.index].value = val.value;
  }

}
