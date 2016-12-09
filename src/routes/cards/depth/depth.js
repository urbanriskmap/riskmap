import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Depth {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
    //Check for mobile or desktop device
    if (/Mobi/.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    //Check previously available user inputs - from same session
    var reportCardDepth = this.reportcard.getwaterdepth();
    if (reportCardDepth) {
      this.depthVal = reportCardDepth;
    }
  }

  attached() {
    var that = this;
    var imgHeightCm = 200;
    var refHeightPx = $('#imgWrapper').height();
    if (that.depthVal) {
      $('#floodZone').css({
        'height': (that.depthVal * refHeightPx / imgHeightCm) + 'px'
      });
    }
    var fillHeight = $('#floodZone').height();
    $('#sliderZone').css({
      'bottom': (fillHeight * 100 / refHeightPx) + '%'
    });
    var heightInCm = Math.round((fillHeight * imgHeightCm) / refHeightPx);
    that.depthVal = heightInCm;
    that.reportcard.setwaterdepth(that.depthVal);
    var sliderActive = false;

    //Touch start
    $('#sliderZone').on('touchstart mousedown', function (e) {
      sliderActive = true;
      $('.knobHelper').fadeOut(100);
      $('#knob').css({
        'box-shadow': '0px 0px 12px 8px rgba(179, 214, 239, 0.5)'
      });
      var startPos;
      if (that.isMobile) {
        startPos = e.originalEvent.touches[0].pageY;
      } else {
        startPos = e.clientY;
      }

      //Drag start
      $('#depthWrapper').on('touchmove mousemove', function (e) {
        var dragPos;
        if (that.isMobile) {
          e.preventDefault();
          dragPos = e.originalEvent.touches[0].pageY;
        } else {
          dragPos = e.clientY;
        }
        heightInCm = Math.round(((fillHeight + startPos - dragPos) * imgHeightCm) / refHeightPx);
        if (sliderActive && heightInCm > 0 && heightInCm <= imgHeightCm) {
          that.depthVal = heightInCm;
          that.reportcard.setwaterdepth(that.depthVal);
          $('#floodZone').css({
            'height': (fillHeight + startPos - dragPos) + 'px'
          });
          $('#sliderZone').css({
            'bottom': (((fillHeight + startPos - dragPos) * 100) / refHeightPx) + '%'
          });
        }
      });
    });

    //Drag end
    $(window).on('touchend mouseup', function () {
      if (sliderActive) {
        sliderActive = false;
        $('#knob').css({
          'box-shadow': '0px 0px 12px 8px rgba(49, 170, 222, 0.4)'
        });
        $('.knobHelper').fadeIn(200);
        fillHeight = $('#floodZone').height();
      }
    });
  }

  get waterDepth() { //bind waterDepth in DOM
    return this.depthVal;
  }
}
