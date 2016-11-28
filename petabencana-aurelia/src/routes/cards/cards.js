import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import $ from 'jquery';

//start-non-standard
@inject(EventAggregator, I18N)
//end-non-standard
export class Cards {
  constructor(ea, i18n) {
    this.ea = ea;
    this.i18n = i18n;
  }
  configureRouter(config, router) {
    config.title = this.i18n.tr('page_title');
    config.map([
      {route: '',             redirect: 'location'},
      {route: 'location',     moduleId: './location/location',        settings: {title: this.i18n.tr('location_title'),     cardNo: 1,  msgName: 'changedLocation'}},
      {route: 'depth',        moduleId: './depth/depth',              settings: {title: this.i18n.tr('depth_title'),        cardNo: 2,  msgName: 'changedDepth'}},
      {route: 'photo',        moduleId: './photo/photo',              settings: {title: this.i18n.tr('photo_title'),        cardNo: 3,  msgName: 'changedPhoto'}},
      {route: 'description',  moduleId: './description/description',  settings: {title: this.i18n.tr('description_title'),  cardNo: 4,  msgName: 'changedDescription'}},
      {route: 'review',       moduleId: './review/review',            settings: {title: this.i18n.tr('review_title'),       cardNo: 5,  msgName: 'changedInputs'}},
      {route: 'terms',        moduleId: './terms/terms',              settings: {title: this.i18n.tr('terms_title'),        cardNo: 6}},
      {route: 'thanks',       moduleId: './thanks/thanks',            settings: {title: this.i18n.tr('thanks_title'),       cardNo: 7}}
    ]);
    this.router = router;
  }
  activate(params) {
    this.id = params.id;
  }
  attached() {
    this.ccHeight = $(window).height() - ($('#cardTitle').height() + $('#cardNavigation').height());
    this.totalCards = this.router.routes.length - 1; //exclude (route:'', redirect:'location')
    this.tabCount = [];
    for (let i = 0; i < this.totalCards - 2; i += 1) { //exclude terms & thanks cards
      this.tabCount[i] = i;
    }
    this.ea.subscribe(this.router.routes[1].settings.msgName, msg => {
      this.router.routes[1].settings.input = msg;
      this.router.routes[5].settings.location = msg;
    });
    this.ea.subscribe(this.router.routes[2].settings.msgName, msg => {
      this.router.routes[2].settings.input = msg;
      this.router.routes[5].settings.depth = msg;
    });
    this.ea.subscribe(this.router.routes[3].settings.msgName, msg => {
      this.router.routes[3].settings.input = msg;
      this.router.routes[5].settings.photo = msg;
    });
    this.ea.subscribe(this.router.routes[4].settings.msgName, msg => {
      this.router.routes[4].settings.input = msg;
      this.router.routes[5].settings.description = msg;
    });
  }

  get count() { //TODO navigation does not work unless getter is called from the DOM or elsewhere in js;
    this.cardNo = this.router.currentInstruction.config.settings.cardNo;
    return this.cardNo;
  }
  set count(val) {
    this.cardNo = this.count + val;
  }

  get titleString() {
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

  get nextDisabled() { //Add arguments with ReportCard object params for mandatory inputs
    return this.cardNo >= this.totalCards - 2;
  }
  get prevDisabled() {
    return this.cardNo === 1 || this.cardNo === 7;
  }
}
