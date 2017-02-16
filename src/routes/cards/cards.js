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
    var self = this;
    config.title = this.locale.page_title;
    //TODO: fix issue with card numbers, this.router.routes array numbers
    // when route: '' is added (IMPORTANT, '*foo' required mostly for dev,
    // but also if user hits refresh & url is appended with route name)
    // Alternatively: retain only '*foo' & append /report in url??
    config.map([
      {route: '*foo', moduleId: './card-landing/card-landing'}
    ]);
    config.mapUnknownRoutes({route: '/map'});
    self.router = router;
  }

  activate(params) {
    var self = this;
    self.id = params.id;
    if (params.disaster === 'flood' || params.disaster === 'hurricane') {
      $.getJSON("./src/routes/card-decks/" + params.disaster + ".json", data => {
        for (let obj of data) {
          self.router.addRoute(obj);
        }
      }).then(() => {
        $.getJSON("./src/routes/card-decks/staple.json", data => {
          for (let obj of data) {
            self.router.addRoute(obj);
          }
        }).then(() => {
          for (let route in self.router.routes) {
            self.router.routes[route].settings = {cardNo: parseInt(route)};
          }
          self.router.refreshNavigation();
        });
      });
    }
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
    var self = this;

    $('#depthBG').attr('fill', '#ff0000');
    var nua = navigator.userAgent.toLowerCase();
    //______________is Mobile______________________an iPhone_________________browser not safari (in-app)___________app is twitter________________app is facebook______________not facebook messenger_________
    if ((/Mobi/.test(navigator.userAgent)) && nua.indexOf('iphone') > -1 && nua.indexOf('safari') === -1 && (nua.indexOf('twitter') > -1 || (nua.indexOf('fban') > -1 && nua.indexOf('messenger') === -1))) {
      self.resizeCardHt(1);
    } else {
      //Execute resize on initial page load
      self.resizeCardHt(0);
      //Add resize listener to browser window
      $(window).resize(() => {
        self.resizeCardHt(0);
      });
    }

    self.totalCards = self.router.routes.length - 1; //exclude routes: '*foo' (card-landing)
    $('#' + self.reportcard.selLanguage).addClass("active");
    $(document).ready(() => {
      $('.tabButtons').width((100 / (self.totalCards - 3)) + '%'); //fit 'n' tab buttons on-the-fly, n = (total - staple) cards
    });

    let client = new HttpClient();

    // Escape test in dev & local environment for 'test123'
    //_______is Prod____________otl:test123_______
    if (!self.test_card || self.id !== 'test123') {
      //Navigate to location card OR error card, then resize card height to fill screen
      client.get(self.data_src + 'cards/' + self.id)
      .then(response => {
         var msg = JSON.parse(response.response);
         if (msg.result.received === true) {
           // card already exists
          self.reportcard.errors.text = self.locale.card_error_messages.already_received;
          self.router.navigate('error', {replace: true});
        } else {
          // populate network property of reportcard, accessed in thanks card
          self.reportcard.network = msg.result.network;
          // proceed to first card
          self.router.navigate(self.router.routes[1].route, {replace: true});
        }
      })
      .catch(response => {
        if (response.statusCode === 404) {
          // error this card does not exist
          self.reportcard.errors.code = response.statusCode;
          self.reportcard.errors.text = self.locale.card_error_messages.unknown_link;
          self.router.navigate('error', {replace: true});
        } else {
          // unhandled error
          self.reportcard.errors.code = response.statusCode;
          self.reportcard.errors.text = self.locale.card_error_messages.unknown_error + " (" + response.statusText + ")";
          self.router.navigate('error', {replace: true});
        }
      });
    } else {
      // proceed to first card
      self.router.navigate(self.router.routes[1].route, {replace: true});
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
        self.reportcard.errors.code = response.statusCode;
        self.reportcard.errors.text = response.statusText;
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
    var self = this;
    if (self.router.currentInstruction.fragment === 'location') {
      if (self.isLocationSupported() || self.location_check) {
        self.count = 1; //count setter to increment cardNo by 1
        self.router.navigate(self.router.routes[self.cardNo].route);
        self.closeNotification();
      }
      if (!self.location_check && !self.isLocationSupported()) {
        self.showNotification('warning', 'location_2', 'location_2', false);
        self.location_check = true; // execute once
      }
    } else if (self.router.currentInstruction.fragment !== 'location' && self.cardNo < self.totalCards) {
      self.count = 1; //count setter to increment cardNo by 1
      self.router.navigate(self.router.routes[self.cardNo].route);
      self.closeNotification();
    }
  }
  prevCard() {
    if (this.cardNo > 1) {
      this.count = -1;
      this.router.navigate(this.router.routes[this.cardNo].route);
    }
  }

  get nextDisabled() {
    if (this.router.currentInstruction.fragment === 'location') {
      return !this.reportcard.location.markerLocation;
    } else {
      return this.cardNo >= this.totalCards - 3; //Disable next button on review card (exclude staple card routes: terms, thanks, error)
    }
  }
  get prevDisabled() {
    return this.cardNo === 1;
  }
}
