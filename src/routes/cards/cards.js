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
    this.reportcard = ReportCard;
    this.config = Config;
    this.locale = this.reportcard.locale;
    this.data_src = Config.cards.data_server;
    this.test_card = Config.cards.enable_test_cardid;
    this.region_bounds = {};
    for (let city in Config.map.instance_regions) {
      this.region_bounds[city] = Config.map.instance_regions[city].bounds;
    }
  }

  configureRouter(config, router) {
    config.title = this.locale.page_title;
    //IMPORTANT: '*foo' required mostly for dev,
    // but also if user hits refresh & url is appended with route name)
    // recommended: use '*foo' = report
    //
    // In server modules: use this as reply link ROOT/cards/:disaster/:one-time-link/report
    // In dev environment; (enable_test_cardid === true) use ROOT/cards/*foo (defaults to flood cards)
    // OR ROOT/cards/:disaster/:one-time-link/*foo (otl if known, connected to pgadmin)
    config.map([
      {route: '*foo', moduleId: './card-landing/card-landing'}
    ]);
    config.mapUnknownRoutes({route: '/map'});
    this.router = router;
  }

  activate(params) {
    var self = this;
    self.id = params.id;
    self.lang = (self.config.supported_languages.indexOf(params.lang) > -1) ? params.lang : self.config.default_language;
    self.reportcard.disasterType = (params.disaster === 'flood' || params.disaster === 'prep') ? params.disaster : 'flood';

    $.getJSON("assets/card-decks/" + self.reportcard.disasterType + ".json", data => {
      for (let obj of data) {
        self.router.addRoute(obj);
      }
    }).then(() => {
      $.getJSON("assets/card-decks/staple.json", data => {
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

  //switch on-the-fly
  switchLang(lang) {
    this.reportcard.changeLanguage();
    $('.langLabels').removeClass("active");
    $('#' + lang).addClass("active");
  }

  attached() {
    var self = this;

    self.totalCards = self.router.routes.length - 1; //exclude (route:'', redirect:'location')
    self.switchLang(self.lang); //set language based on url param OR default

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
          //self.checkBrowserThenResize();
        } else {
          // populate network property of reportcard, accessed in thanks card
          self.reportcard.network = msg.result.network;
          // proceed to first card
          self.router.navigate(self.router.routes[1].route, {replace: true});
          //self.checkBrowserThenResize();
        }
      })
      .catch(response => {
        if (response.statusCode === 404) {
          // error this card does not exist
          self.reportcard.errors.code = response.statusCode;
          self.reportcard.errors.text = self.locale.card_error_messages.unknown_link;
          self.router.navigate('error', {replace: true});
          //self.checkBrowserThenResize();
        } else {
          // unhandled error
          self.reportcard.errors.code = response.statusCode;
          self.reportcard.errors.text = self.locale.card_error_messages.unknown_error + " (" + response.statusText + ")";
          self.router.navigate('error', {replace: true});
          //self.checkBrowserThenResize();
        }
      });
    } else {
      // proceed to first card
      self.router.navigate(self.router.routes[1].route, {replace: true});
      //self.checkBrowserThenResize();
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
          let client = new HttpClient()
          .configure(x => {
            x.withBaseUrl(self.data_src); //REPLACE with aws s3 response url?
            x.withHeader('Content-Type', self.photoToUpload.type);
          });

          //To get AWS Signed URL
          client.get(self.data_src + 'cards/' + this.id + '/images')
          .then(response => {
            console.log(response);
            var msg = JSON.parse(response.response);
            var signedURL = msg.signedRequest;
            console.log(signedURL);
            //Post image to the Signed URL
            $.ajax({
              url: signedURL,
              type: 'PUT',
              data: self.photoToUpload,
              contentType: false,
              processData: false,
              cache: false,
              error: function (data) {
                console.log("Error uploading image to AWS");
              },
              success: function () {
                console.log("Uploaded image to AWS successfully!");
                // Proceed to thanks page if report submit resolved & image uploaded;
                self.router.navigate('thanks');
              }
            });

          })
          .catch(response => {
            //TODO: Need to be updated based on Abe's server code
          });
        } else {
          // Proceed to thanks page if report submit resolved
          self.router.navigate('thanks');
        }
      })
      .catch(response => {
        console.log(response); //Retain, DO NOT DELETE
        self.reportcard.errors.code = response.statusCode;
        self.reportcard.errors.text = response.statusText;
        self.router.navigate('error');
        // resolve(null);
      });
    });

    self.ea.subscribe('reportType', btnName => {
      self.reportcard.reportType = btnName;
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
    self.ea.subscribe('depthSlider', msg => {
      self.sliderDragged = true;
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
    } else if (this.router.currentInstruction.fragment === 'prep') {
      return !this.reportcard.reportType;
    } else if (this.router.currentInstruction.fragment === 'depth') {
      return !this.sliderDragged; //Disable next button on depth card until user drags slider
    } else {
      return this.cardNo >= this.totalCards - 3; //Disable next button on review card (exclude staple card routes: terms, thanks, error)
    }
  }

  get prevDisabled() {
    return this.cardNo === 1;
  }
}
