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
    this.data_src = Config.cards.data_server;
    this.test_card = Config.cards.enable_test_cardid;
    this.reportcard = ReportCard;
    this.locale = this.reportcard.locale;
    this.region_bounds = {};
    for (let city in Config.map.instance_regions) {
      this.region_bounds[city] = Config.map.instance_regions[city].bounds;
    }
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

  resizeCardHt(factor) {
    var glitchHeight = 106;
    $('#cardContent').css({
      'height': $('#cardWrapper').height() - ($('#cardTitle').height() + $('#cardNavigation').height() + (factor * glitchHeight)) + 'px'
    });
    $('#cardNavigation').css({
      'bottom': (factor * glitchHeight) + 'px'
    });
  }

  attached() {
    var nua = navigator.userAgent.toLowerCase();
    //______________is Mobile______________________an iPhone_________________browser not safari (in-app)___________app is twitter________________app is facebook______________not facebook messenger_________
    if ((/Mobi/.test(navigator.userAgent)) && nua.indexOf('iphone') > -1 && nua.indexOf('safari') === -1 && (nua.indexOf('twitter') > -1 || (nua.indexOf('fban') > -1 && nua.indexOf('messenger') === -1))) {
      this.resizeCardHt(1);
    } else {
      //Execute resize on initial page load
      this.resizeCardHt(0);
      //Add resize listener to browser window
      $(window).resize(() => {
        this.resizeCardHt(0);
      });
    }

    this.totalCards = this.router.routes.length - 1; //exclude (route:'', redirect:'location')
    $('#' + this.reportcard.selLanguage).addClass("active");

    var self = this;
    let client = new HttpClient();

    // Escape test in dev & local environment for 'test123'
    //_______is Prod____________otl:test123_______
    if (!this.test_card || this.id !== 'test123') {
      //Navigate to location card OR error card, then resize card height to fill screen
      client.get(this.data_src + 'cards/' + this.id)
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
          // unhandled error
          self.router.routes[8].settings.errorCode = response.statusCode;
          self.router.routes[8].settings.errorText = self.locale.card_error_messages.unknown_error + " (" + response.statusText + ")";
          self.router.navigate('error', {replace: true});
        }
      });
    } else {
      self.router.navigate('location', {replace: true});
    }

    self.ea.subscribe('readTerms', msg => {
      self.router.navigate('terms');
    });

    self.ea.subscribe('image', fileList => {
      self.photoToUpload = fileList[0];
    });

    self.ea.subscribe('submit', report => {
      client.put(self.data_src + 'cards/' + self.id, report)
      .then(response => {
        // now/also, send the image.
        if (self.photoToUpload) {
          console.log(self.photoToUpload);

          let client = new HttpClient()
          .configure(x => {
            x.withBaseUrl(self.data_src); //REPLACE with aws s3 response url?
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

    self.ea.subscribe('geolocate', error => {
      self.showNotification(error, 'location_1', 'location_1', false);
    });
    self.ea.subscribe('upload', error => {
      self.showNotification(error, 'photo_2', 'photo_2', false);
    });
    self.ea.subscribe('size', error => {
      self.showNotification(error, 'photo_1', 'photo_1', false);
    });
  }

  showNotification(type, header, message, bespoke) {
    var self = this;
    self.notify_type = type;
    self.notify_header = header;
    self.notify_message = message;
    if (bespoke) {
      self.notify_custom = true;
    } else {
      self.notify_custom = false;
    }
    if ($('#notifyWrapper').hasClass('active')) {
      $('#notifyWrapper').finish();
    }
    $('#notifyWrapper').slideDown(300, () => {
      $('#notifyWrapper').addClass('active');
    }).delay(5000).slideUp(300, () => {
      $('#notifyWrapper').removeClass('active');
    });
  }

  closeNotification() {
    if ($('#notifyWrapper').hasClass('active')) {
      $('#notifyWrapper').dequeue();
    }
  }

  logUserAgent() {
    var nua = navigator.userAgent.toLowerCase();
    this.showNotification('warning', 'User agent', nua, true);
  }

  get count() { //TODO navigation does not work unless getter is called from the DOM or elsewhere in js;
    this.cardNo = this.router.currentInstruction.config.settings.cardNo;
    return this.cardNo;
  }
  set count(val) {
    this.cardNo = this.count + val;
  }

  isLocationSupported() {
    var self = this,
        l = self.reportcard.location.markerLocation;
    self.reportcard.location.supported = false;
    for (let city in self.region_bounds) {
      if (l.lat > self.region_bounds[city].sw[0] && l.lng > self.region_bounds[city].sw[1] && l.lat < self.region_bounds[city].ne[0] && l.lng < self.region_bounds[city].ne[1]) {
        self.reportcard.location.supported = true;
        break;
      }
    }
    return self.reportcard.location.supported;
  }

  nextCard() {
    if (this.cardNo === 1) {
      if (this.isLocationSupported() || this.location_check) {
        this.count = 1; //count setter to increment cardNo by 1
        this.router.navigate(this.router.routes[this.cardNo].route);
        this.closeNotification();
      }
      if (!this.location_check && !this.isLocationSupported()) {
        this.showNotification('warning', 'location_2', 'location_2', false);
        this.location_check = true; // execute once
      }
    } else if (this.cardNo !== 1 && this.cardNo < this.totalCards) {
      this.count = 1; //count setter to increment cardNo by 1
      this.router.navigate(this.router.routes[this.cardNo].route);
      this.closeNotification();
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
      return !this.reportcard.location.markerLocation;
    } else {
      return this.cardNo >= this.totalCards - 3;
    }
  }
  get prevDisabled() {
    return this.cardNo === 1 || this.cardNo === 7;
  }
}
