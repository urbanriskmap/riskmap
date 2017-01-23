import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-http-client';
import {Config} from 'resources/config'; // Cards config
import {ReportCard} from 'resources/report-card';

//start-non-standard
@inject(EventAggregator, ReportCard, Config)
//end-non-standard
export class Cards {
  constructor(ea, ReportCard, Config) {
    this.ea = ea;
    this.datasrc = Config.cards.data_server;
    this.reportcard = ReportCard;
    this.locale = this.reportcard.locale;
  }

  configureRouter(config, router) {
    config.title = this.locale.page_title;
    config.map([
      {route: '',                               moduleId: './card-landing/card-landing', settings: {cardNo: 0}}, //requires cardNo for count getter to set cardNo as 0, on-the-fly resizing dependent on cardTitle & cardNavigation div's displayed, in turn dependent on 'count'
      {route: 'location',     name: 'location', moduleId: './location/location',         settings: {cardNo: 1}},
      {route: 'depth',                          moduleId: './depth/depth',               settings: {cardNo: 2}},
      {route: 'photo',                          moduleId: './photo/photo',               settings: {cardNo: 3}},
      {route: 'description',                    moduleId: './description/description',   settings: {cardNo: 4}},
      {route: 'review',                         moduleId: './review/review',             settings: {cardNo: 5}},
      {route: 'terms',                          moduleId: './terms/terms',               settings: {cardNo: 6}},
      {route: 'thanks',                         moduleId: './thanks/thanks',             settings: {cardNo: 7}},
      {route: 'error',        name: 'error',    moduleId: './error/error',               settings: {cardNo: 8}},
    ]);
    config.mapUnknownRoutes({redirect: '/map'});
    this.router = router;
  }

  activate(params) {
    this.id = params.id;
  }

  //switch on-the-fly
  switchLang(lang) {
    this.reportcard.changeLanguage(lang);
    $('.langLabels').removeClass("active");
    $('#' + lang).addClass("active");
  }

  resizeCardHt() {
    $('#cardContent').css({
      'height': $('#cardWrapper').height() - ($('#cardTitle').height() + $('#cardNavigation').height()) + 'px'
    });
  }

  attached() {
    var nua = navigator.userAgent.toLowerCase();
    //______________is Mobile______________________an iPhone_________________browser not safari (in-app)____
    if ((/Mobi/.test(navigator.userAgent)) && nua.indexOf('iphone') > -1 && nua.indexOf('safari') === -1) {
      // Double height for bottom navigation bar, due to floating browser bar in telegram / twitter app browsers
      $('#cardNavigation').css({
        'height': 100 + 'px'
      });
    }

    //Execute resize on initial page load
    this.resizeCardHt();

    //Add resize listener to browser window
    $(window).resize(() => {
      this.resizeCardHt();
    });

    this.totalCards = this.router.routes.length - 1; //exclude (route:'', redirect:'location')
    $('#' + this.reportcard.selLanguage).addClass("active");

    var self = this;
    let client = new HttpClient();

    //DEV - TEST report id
    if (this.id !== 'test123') {
      //Navigate to location card OR error card, then resize card height to fill screen
      client.get(this.datasrc + 'cards/' + this.id)
      .then(response => {
         var msg = JSON.parse(response.response);
         // card already exists
         if (msg.result.received === true) {
          self.router.routes[8].settings.errorText = self.locale.card_error_messages.already_received;
          self.router.navigate('error', {replace: true});
        } else {
          self.reportcard.network = msg.result.network;
          self.router.routes[7].settings.errorCode = response.statusCode;
          self.router.navigate('location', {replace: true});
        }
      })
      .catch(response => {
        if (response.statusCode === 404) {
          // error this card does not exist
          self.router.routes[8].settings.errorCode = response.statusCode;
          self.router.routes[8].settings.errorText = self.locale.card_error_messages.unknown_link;
          self.router.navigate('error', {replace: true});
        } else {
          console.log(self);
          // unhandled error
          self.router.routes[8].settings.errorCode = response.statusCode;
          self.router.routes[8].settings.errorText = self.locale.card_error_messages.unknown_error + "(" + response.statusText + ")";
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
    if (this.cardNo === 1) { //Disables next button until map is loaded
      return !this.reportcard.location.markerLocation;
    } else {
      return this.cardNo >= this.totalCards - 3;
    }
  }
  get prevDisabled() {
    return this.cardNo === 1 || this.cardNo === 7;
  }
}
