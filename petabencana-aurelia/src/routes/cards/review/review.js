import {Reportcard} from 'Reportcard';
import {inject} from 'aurelia-framework';

@inject(Reportcard)

export class Review {
  constructor(Reportcard) {
    if (/Mobi/.test(navigator.userAgent)) {
      Review.isMobile = true;
    } else {
      Review.isMobile = false;
    }
    this.reportcard = Reportcard;
  }
  activate(params, routerConfig) {
    var that = this;
    Review.termsLink = routerConfig.navModel.router.routes[6].route;
    Review.thanksLink = routerConfig.navModel.router.routes[7].route;
    Review.router = routerConfig.navModel.router;
    var reportCardDepth = that.reportcard.getwaterdepth();
    if (reportCardDepth) {
      this.selDepth = reportCardDepth + "cm";
    } else {
      this.selDepth = "Not selected";
    }
    var reportCardPhoto = that.reportcard.getphoto();
    if (reportCardPhoto) {
      this.selPhoto = reportCardPhoto;
    }
    var reportCardDescription = that.reportcard.getdescription();
    if (reportCardDescription) {
      this.selDescription = reportCardDescription;
    } else {
      this.selDescription = "No description provided";
    }
  }
  attached() {
    if (this.selPhoto) {
      this.drawImage();
    }
    var slideRange = $('#submitSlider').width() - $('#submitKnob').width(),
    slideThreshold = 0.9,
    slideTranslate = 0,
    slidePressed = false;
    $('#submitKnob').on('touchstart mousedown', function (e) {
      var slideStartPos;
      if (Review.isMobile) {
        slideStartPos = e.originalEvent.touches[0].pageX;
      } else {
        slideStartPos = e.clientX;
      }
      slidePressed = true;
      $('#reviewWrapper').on('touchmove mousemove', function (e) {
        var slideDragPos;
        if (Review.isMobile) {
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
          if (slideTranslate >= (slideThreshold * slideRange)) {
            Review.router.navigate(Review.thanksLink);
          }
        }
      });
      $(window).on('touchend mouseup', function () {
        if (slidePressed && slideTranslate < (slideThreshold * slideRange)) {
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
  }
  readTerms() {
    Review.router.navigate(Review.termsLink);
  }
  drawImage() {
    if (this.selPhoto) {
      let wrapper = this.preview;
      wrapper.width = $('#camera').width();
      wrapper.height = $('#camera').height();
      let reader = new FileReader();
      reader.onload = (e) => {
        let reviewImg = new Image();
        reviewImg.onload = () => {
          let imgW;
          let imgH;
          let trlX = 0;
          let trlY = 0;
          if (reviewImg.width >= reviewImg.height) {
            imgH = wrapper.height;
            imgW = Math.round((reviewImg.width * imgH) / reviewImg.height);
            trlX = Math.round((wrapper.width - imgW) / 2);
          } else {
            imgW = wrapper.width;
            imgH = Math.round((reviewImg.height * imgW) / reviewImg.width);
            trlY = Math.round((wrapper.height - imgH) / 2);
          }
          let cntxt = wrapper.getContext('2d');
          cntxt.drawImage(reviewImg, trlX, trlY, imgW, imgH);
        };
        reviewImg.src = e.target.result;
      };
      reader.readAsDataURL(this.selPhoto[0]);
    }
  }
}
