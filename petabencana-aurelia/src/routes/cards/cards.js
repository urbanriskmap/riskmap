import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
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
  constructor(ea) {
    this.ea = ea;
  }
  activate(params) {
    this.id = params.id;
  }
  attached() {
    this.totalCards = this.router.routes.length - 1; //exclude {route:'', redirect:'location')
    let inputObjects = ['changedLocation', 'changedDepth', 'changedPhoto', 'changedDescription'];
    this.inputs = []; //development stage only
    for (let i = 0; i < this.totalCards - 1; i+=1) {
      this.inputs[i] = {type: this.router.routes[i+1].route};  //development stage only
      this.ea.subscribe(inputObjects[i], msg => {
        this.userInputs = {index: i, value: msg};  //development stage only
        this.router.routes[i+1].settings.input = msg;
      });
    }
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

  get nextDisabled() {
    if (this.cardNo === 1) {
      return !this.inputs[0].value; //disable next button till location selected
    } else {
      return this.cardNo === this.totalCards;
    }
  }
  get prevDisabled() {
    return this.cardNo === 1;
  }

  //User inputs getter/setter for development; not required for production
  get userInputs() {
    return this.inputs;
  }
  set userInputs(val) {
    this.inputs[val.index].value = val.value;
  }
}
