import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Depth {
  constructor(Reportcard) {
    if (/Mobi/.test(navigator.userAgent)) {
      Depth.isMobile = true;
    } else {
      Depth.isMobile = false;
    }
    this.reportcard = Reportcard;
  }

  activate(params, routerConfig) {
    var that = this;
    var reportCardDepth = that.reportcard.getwaterdepth();
    if (reportCardDepth) {
      Depth.depthVal = reportCardDepth;
    }
  }
  attached() {
    var that = this;
    var imgHeightCm = 200;
    var refHeightPx = $('#imgWrapper').height();
    if (Depth.depthVal) {
      $('#floodZone').css({
        'height': (Depth.depthVal * refHeightPx / imgHeightCm) + 'px'
      });
    }
    var fillHeight = $('#floodZone').height(); //TODO: DEBUG, if attached runs before CSS style is applied, results in 0.
    $('#sliderZone').css({
      'bottom': (fillHeight * 100 / refHeightPx) + '%'
    });
    var heightInCm = Math.round((fillHeight * imgHeightCm) / refHeightPx);
    Depth.depthVal = heightInCm;
    that.reportcard.setwaterdepth(Depth.depthVal);
    var sliderActive = false;
    $('#sliderZone').on('touchstart mousedown', function (e) {
      sliderActive = true;
      var startPos;
      if (Depth.isMobile) {
        startPos = e.originalEvent.touches[0].pageY;
      } else {
        startPos = e.clientY;
      }
      $('#depthWrapper').on('touchmove mousemove', function (e) {
        var dragPos;
        if (Depth.isMobile) {
          e.preventDefault();
          dragPos = e.originalEvent.touches[0].pageY;
        } else {
          dragPos = e.clientY;
        }
        heightInCm = Math.round(((fillHeight + startPos - dragPos) * imgHeightCm) / refHeightPx);
        if (sliderActive && heightInCm > 0 && heightInCm <= imgHeightCm) {
          Depth.depthVal = heightInCm;
          that.reportcard.setwaterdepth(Depth.depthVal);
          $('#floodZone').css({
            'height': (fillHeight + startPos - dragPos) + 'px'
          });
          $('#sliderZone').css({
            'bottom': (((fillHeight + startPos - dragPos) * 100) / refHeightPx) + '%'
          });
        }
      });
    });
    $(window).on('touchend mouseup', function () {
      if (sliderActive) {
        sliderActive = false;
        fillHeight = $('#floodZone').height();
      }
    });
  }
  get waterDepth() {
    return Depth.depthVal;
  }
}
