import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Reportcard} from 'Reportcard';
import $ from 'jquery';

//start-non-standard
@inject(Reportcard, I18N)
//end-non-standard
export class Cards {
  constructor(Reportcard, i18n) {
    this.reportcard = Reportcard;
    this.i18n = i18n;
    this.titleString = "title translation error"; //TODO: REMOVE after debugging translation error
  }
  configureRouter(config, router) {
    config.title = this.i18n.tr('page_title');
    config.map([
      {route: '',             redirect: 'location'},
      {route: 'location',     moduleId: './location/location',        settings: {title: this.i18n.tr('location_title'),     cardNo: 1}},
      {route: 'depth',        moduleId: './depth/depth',              settings: {title: this.i18n.tr('depth_title'),        cardNo: 2}},
      {route: 'photo',        moduleId: './photo/photo',              settings: {title: this.i18n.tr('photo_title'),        cardNo: 3}},
      {route: 'description',  moduleId: './description/description',  settings: {title: this.i18n.tr('description_title'),  cardNo: 4}},
      {route: 'review',       moduleId: './review/review',            settings: {title: this.i18n.tr('review_title'),       cardNo: 5}},
      {route: 'terms',        moduleId: './terms/terms',              settings: {title: this.i18n.tr('terms_title'),        cardNo: 6}},
      {route: 'thanks',       moduleId: './thanks/thanks',            settings: {cardNo: 7}},
      {route: 'error',        moduleId: './error/error',              settings: {cardNo: 8}}
    ]);
    config.mapUnknownRoutes({redirect: 'error'});
    this.router = router;
  }
  activate(params) {
    this.id = params.id; //TODO: pass to webApi? to check against one-time-link
  }
  attached() {
    $('#cardContent').css({
      'height': $(window).height() - ($('#cardTitle').height() + $('#cardNavigation').height()) + 'px'
    });
    this.totalCards = this.router.routes.length - 1; //exclude (route:'', redirect:'location')
  }

  get count() { //TODO navigation does not work unless getter is called from the DOM or elsewhere in js;
    this.cardNo = this.router.currentInstruction.config.settings.cardNo;
    return this.cardNo;
  }
  set count(val) {
    this.cardNo = this.count + val;
  }

  /*
  get titleString() {
    return this.router.currentInstruction.config.settings.title;
  }
  */
  //TODO: DEBUG translation error, remove following getter + setter
  get titleString() {
    if (this.router.currentInstruction.config.settings.title) {
      this.someString = this.router.currentInstruction.config.settings.title;
    }
    return this.someString;
  }
  set titleString(string) {
    this.someString = string;
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

  get nextDisabled() { //TODO: Add arguments with ReportCard object params for mandatory inputs
    return this.cardNo >= this.totalCards - 3;
  }
  get prevDisabled() {
    return this.cardNo === 1 || this.cardNo === 7;
  }
}
