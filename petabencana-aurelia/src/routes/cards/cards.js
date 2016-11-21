import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class Cards {
  configureRouter(config, router) {
    config.title = 'Flood report';
    config.map([
      {route: '',             redirect: 'location'},
      {route: 'location',     moduleId: './location/location',        settings: {title: 'Select location',    cardNo: 1,  msgName: 'changedLocation'}},
      {route: 'depth',        moduleId: './depth/depth',              settings: {title: 'Report water depth', cardNo: 2,  msgName: 'changedDepth'}},
      {route: 'photo',        moduleId: './photo/photo',              settings: {title: 'Upload a photo',     cardNo: 3,  msgName: 'changedPhoto'}},
      {route: 'description',  moduleId: './description/description',  settings: {title: 'Describe the event',    cardNo: 4,  msgName: 'changedDescription'}},
      {route: 'review',       moduleId: './review/review',            settings: {title: 'Review & submit',    cardNo: 5,  msgName: 'getInputs'}}
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
    this.inputs = [];
    for (let i = 0; i < this.totalCards; i+=1) { //exclude review card in loop
      this.inputs[i] = {card: i, type: this.router.routes[i+1].route};  //(type) required for development stage only
      this.ea.subscribe(this.router.routes[i+1].settings.msgName, msg => {
        this.userInputs = {index: i, value: msg};  //required for development stage only
        this.router.routes[i+1].settings.input = msg;
      });
    }
  }

  get count() { //TODO navigation does not work unless getter is called from the DOM or elsewhere in js; check by removing <p>OTL, card number</p>
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
    if (this.count < this.totalCards) {
      this.count = 1;
      this.router.navigate(this.router.routes[this.count].route);
    }
  }
  prevCard() {
    if (this.count > 1) {
      this.count = -1;
      this.router.navigate(this.router.routes[this.count].route);
    }
  }

  get nextDisabled() { //Use this.cardNo instead of this.count
    if (this.cardNo === 1) {
      return !this.inputs[0].value; //disable next button till location selected
    } else {
      return this.cardNo === this.totalCards;
    }
  }
  get prevDisabled() {
    return this.cardNo === 1;
  }

  //User inputs getter/setter for development stage only; not required for production
  get userInputs() {
    return this.inputs;
  }
  set userInputs(val) {
    this.inputs[val.index].value = val.value;
  }
}
