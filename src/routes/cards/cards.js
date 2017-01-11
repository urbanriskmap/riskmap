import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-http-client';
import * as config from './config'; // Cards config

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class Cards {
  constructor(ea) {
    this.ea = ea;
    this.datasrc = config.data_server;
    this.languages = ["en", "id"];
    //initial language, TODO: set using detected browser language
    this.selLanguage = "en";
    this.locale = {};
    this.changeLanguage(this.selLanguage);
  }

  configureRouter(config, router) {
    config.title = this.locale.page_title;
    config.map([
      {route: '',                               moduleId: './landing/landing',          settings: {cardNo: 0}}, //requires cardNo for count getter to set cardNo as 0, resizing dependent on cardTitle & cardNavigation div's displayed, in turn dependent on 'count'
      {route: 'location',     name: 'location', moduleId: './location/location',        settings: {cardNo: 1}},
      {route: 'depth',                          moduleId: './depth/depth',              settings: {cardNo: 2}},
      {route: 'photo',                          moduleId: './photo/photo',              settings: {cardNo: 3}},
      {route: 'description',                    moduleId: './description/description',  settings: {cardNo: 4}},
      {route: 'review',                         moduleId: './review/review',            settings: {cardNo: 5}},
      {route: 'terms',                          moduleId: './terms/terms',              settings: {cardNo: 6}},
      {route: 'thanks',                         moduleId: './thanks/thanks',            settings: {cardNo: 7}},
      {route: 'error',        name: 'error',    moduleId: './error/error',              settings: {cardNo: 8}},
    ]);
    config.mapUnknownRoutes({redirect: '/map'});
    this.router = router;
  }

  activate(params) {
    this.id = params.id;
  }

  changeLanguage(lang) {
    $.getJSON("../../../locales/" + lang + "/translation.json", (data) => {
      $.each(data, (key, val) => {
        this.locale[key] = val;
      });
    });
  }

  //switch on-the-fly
  switchLang(lang) {
    this.changeLanguage(lang);
    $('.langLabels').removeClass("active");
    $('#' + lang).addClass("active");
  }

  resizeCardHt() {
    $('#cardContent').css({
      'height': $('#cardWrapper').height() - ($('#cardTitle').height() + $('#cardNavigation').height()) + 'px'
    });
  }

  attached() {
    //Execute resize on initial page load
    this.resizeCardHt();

    //Add resize listener to browser window
    $(window).resize(() => {
      this.resizeCardHt();
    });

    this.totalCards = this.router.routes.length - 1; //exclude (route:'', redirect:'location')
    $('#' + this.selLanguage).addClass("active");

    var self = this;
    let client = new HttpClient();

    //DEV - TEST report id
    if (this.id !== 'test123') {
      //Navigate to location card OR error card, then resize card height to fill screen
      client.get(this.datasrc + 'cards/' + this.id)
      .then(response => {
        var msg = JSON.parse(response.response);
        //console.log(msg.result);
        if (msg.result.received === true) {
          //self.router.routes[8].settings.errorCode = response.statusCode;
          self.router.routes[8].settings.errorText = "Report already received from this link";
          self.router.navigate('error', {replace: true});
        } else {
          self.router.navigate('location', {replace: true});
        }
      })
      .catch(response => {
        if (response.statusCode === 404) {
          // error this card does not exist
          self.router.routes[8].settings.errorCode = response.statusCode;
          self.router.routes[8].settings.errorText = "Report link does not exist";
          self.router.navigate('error', {replace: true});
        } else {
          // unhandled error
          self.router.routes[8].settings.errorCode = response.statusCode;
          self.router.routes[8].settings.errorText = "Unhandled report link verification error (" + response.statusText + ")";
          self.router.navigate('error', {replace: true});
        }
      });
    } else {
      self.router.navigate('location', {replace: true});
    }

    this.ea.subscribe('readTerms', msg => {
      self.router.navigate('terms');
    });

    this.ea.subscribe('image', fileList => {
      self.photoToUpload = fileList[0];
    });

    this.ea.subscribe('submit', report => {
      client.put(self.datasrc + 'cards/' + self.id, report)
      .then(response => {
        // now/also, send the image.
        if (self.photoToUpload) {
          console.log(self.photoToUpload);

          let client = new HttpClient()
          .configure(x => {
            x.withBaseUrl(self.datasrc); //REPLACE with aws s3 response url?
            x.withHeader('Content-Type', self.photoToUpload.type);
          });
          client.post('cards/' + self.id + '/images', self.photoToUpload)
          .then(response => {
            // Proceed to thanks page if report submit resolved & image uploaded;
            self.router.navigate('thanks');
          })
          .catch(response => {
          });
        } else {
          // Proceed to thanks page if report submit resolved
          self.router.navigate('thanks');
        }
      })
      .catch(response => {
        console.log(response);
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
