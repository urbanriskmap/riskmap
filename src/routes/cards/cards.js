import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import $ from 'jquery';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-http-client';

let client = new HttpClient();

//start-non-standard
@inject(I18N, EventAggregator)
//end-non-standard
export class Cards {
  constructor(i18n, ea) {
    this.i18n = i18n;
    this.ea = ea;
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
      {route: 'error',        name: 'error', moduleId: './error/error',              settings: {cardNo: 8}}
    ]);
    config.mapUnknownRoutes({redirect: '/map'});
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

    var self = this;

    let client = new HttpClient();
    client.get('https://data-dev.petabencana.id/' + this.id)
    .then(response => {
      var msg = JSON.parse(response.response);
      console.log(msg.result);
      if (msg.result.received === true) {
        //self.router.routes[8].settings.errorCode = response.statusCode;
        self.router.routes[8].settings.errorText = "Report already received from this link";
        self.router.navigate('error');
      }
    })
    .catch(response => {
      if (response.statusCode === 404){
        // error this card does not exist
        self.router.routes[8].settings.errorCode = response.statusCode;
        self.router.routes[8].settings.errorText = "Report link does not exist";
        self.router.navigate('error');
      }
      else {
        // unhandled error
        self.router.routes[8].settings.errorCode = response.statusCode;
        self.router.routes[8].settings.errorText = "Unhandled report link verification error (" + response.statusText + ")";
        self.router.navigate('error');
      }
    });

    this.ea.subscribe('readTerms', msg => {
      self.router.navigate('terms');
    });

    // photo separate
    this.ea.subscribe('submit', (report, imageObject) => {
      client.put('https://data-dev.petabencana.id/' + self.id, report)
      .then(response => {
        self.router.navigate('thanks');
        // now/also, send the image.
        if (imageObject) {
          client.post('https://data-dev.petabencana.id/' + self.id + '/images', imageObject)
          .then(response => {
            console.log('image upload: ' + response.statusCode);
          });
        }
      })
      .catch(response => {
        self.router.routes[8].settings.errorCode = response.statusCode;
        self.router.routes[8].settings.errorText = response.statusText;
        self.router.navigate('error');
        // resolve(null);
      });
    });
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

get nextDisabled() {
  return this.cardNo >= this.totalCards - 3;
}
get prevDisabled() {
  return this.cardNo === 1 || this.cardNo === 7;
}
}
