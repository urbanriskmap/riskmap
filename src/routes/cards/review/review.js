import {Reportcard} from 'Reportcard';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

//start-non-standard
@inject(Reportcard, EventAggregator)
//end-non-standard
export class Review {
  constructor(Reportcard, ea) {
    this.reportcard = Reportcard;
    this.ea = ea;
    this.report = {
      text: this.reportcard.description.value,
      water_depth: this.reportcard.waterDepth,
      created_at: new Date().toISOString(),
      image_url: '',
      location: this.reportcard.location.markerLocation,
    }
    this.imageObject = this.reportcard.photo.file;


    //Check for mobile or desktop device
    if (/Mobi/.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    //Check for available user inputs
    if (this.reportcard.waterDepth) {
      this.selDepth = this.reportcard.waterDepth + "cm";
    } else {
      this.selDepth = "Not selected";
    }
    if (this.reportcard.description.value) {
      this.selDescription = this.reportcard.description.value;
    } else {
      this.selDescription = "No description provided";
    }
  }

  get checkRequiredInputs() { //TODO: Add checks for file / data types
    if (this.reportcard.location.markerLocation && this.reportcard.waterDepth && (this.reportcard.photo.file || this.reportcard.description.value)) {
      return true;
    } else {
      return false;
    }
  }

  activate(params, routerConfig) {
    this.termsLink = routerConfig.navModel.router.routes[6].route;
    this.thanksLink = routerConfig.navModel.router.routes[7].route;
    this.router = routerConfig.navModel.router;
  }

  attached() {
    if (this.reportcard.photo.file) {
      this.drawImage(this.reportcard.photo.rotation);
    }

    var self = this;

    if (this.checkRequiredInputs) {
      var slideRange = $('#submitSlider').width() - $('#submitKnob').width(),
      slideThreshold = 0.9,
      slideTranslate = 0,
      slidePressed = false,
      swiped = false;

      //Slider touch start
      $('#submitKnob').on('touchstart mousedown', function (e) {
        var slideStartPos;
        if (self.isMobile) {
          slideStartPos = e.originalEvent.touches[0].pageX;
        } else {
          slideStartPos = e.clientX;
        }
        slidePressed = true;

        //Drag start
        $('#reviewWrapper').on('touchmove mousemove', function (e) {
          var slideDragPos;
          if (self.isMobile) {
            e.preventDefault();
            slideDragPos = e.originalEvent.touches[0].pageX;
          } else {
            slideDragPos = e.clientX;
          }
          slideTranslate = slideDragPos - slideStartPos;
          if (slidePressed && slideTranslate >= 0 && slideTranslate < slideRange) {
            $('#submitKnob').css({
              'left': slideTranslate + 'px'
            });
            $('#submitSlider').css({
              'background-color': 'rgba(31, 73, 99, ' + (slideTranslate / (slideThreshold * slideRange)) + ')'
            });

            //Swipe threshold crossed - TODO: execute report card submit function here
            if (slideTranslate >= (slideThreshold * slideRange) && !swiped) {
              swiped = true;
              //Execute reportcard submit function
              //TODO callback in self.reportcard.submitReport to send user to thank you card
              self.ea.publish('submit', self.report, self.imageObject);
              //self.reportcard.submitReport();
              //Navigate to thanks card
              //self.router.navigate(self.thanksLink);
            }
          }
        });

        //Drag end
        $(window).on('touchend mouseup', function () {
          if (slidePressed && slideTranslate < (slideThreshold * slideRange) && !swiped) {
            slidePressed = false;
            $('#submitKnob').animate({ //Swing back to start position
              'left': 0 + 'px'
            }, 50);
            $('#submitSlider').css({ //Reset slider background
              'background-color': 'transparent'
            });
          }
        });
      });
    } else {
      $('#submitKnob').css({
        'background-color': '#a0a0a0'
      });
      $('#termsConditions').html("Required flood location, water depth and atleast a photo or description to submit report");
    }
  }

  readTerms() {
    this.router.navigate(this.termsLink);
  }

  drawImage(deg) {
    let wrapper = this.preview;
    wrapper.width = $('#camera').width();
    wrapper.height = $('#camera').height();
    let reader = new FileReader();
    reader.onload = (e) => {
      let reviewImg = new Image();
      reviewImg.onload = () => {
        let imgW;
        let imgH;
        let trlX = -wrapper.width/2;
        let trlY = -wrapper.height/2;
        if (reviewImg.width >= reviewImg.height) {
          imgH = wrapper.height;
          imgW = Math.round((reviewImg.width * imgH) / reviewImg.height);
          trlX = trlX + Math.round((wrapper.width - imgW) / 2);
        } else {
          imgW = wrapper.width;
          imgH = Math.round((reviewImg.height * imgW) / reviewImg.width);
          trlY = trlY + Math.round((wrapper.height - imgH) / 2);
        }
        let cntxt = wrapper.getContext('2d');
        cntxt.translate(wrapper.width / 2, wrapper.height / 2);
        cntxt.rotate(deg * Math.PI / 180);
        cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
      };
      reviewImg.src = e.target.result;
    };
    reader.readAsDataURL(this.reportcard.photo.file[0]);
  }
}
