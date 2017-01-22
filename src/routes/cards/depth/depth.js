import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {ReportCard} from 'resources/report-card';

//start-non-standard
@inject(ReportCard)
//end-non-standard
export class Depth {
  constructor(ReportCard) {
    this.reportcard = ReportCard;
    this.sliderActive = false;
    //Check for mobile or desktop device
    if (/Mobi/.test(navigator.userAgent)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  attached() {
    $(document).ready(() => { //TODO: test if required
      var self = this,
          imgHeightCm = 220,
          heightLimitCm = 195,
          refHeightPx = $('#bgImage').height(),
          fillHeightPx,
          reportHeightCm;
      if (self.reportcard.depth) {
        //reset value within limits
        if (self.reportcard.depth > heightLimitCm) {
          reportHeightCm = heightLimitCm;
        } else if (self.reportcard.depth < 0) {
          reportHeightCm = 0;
        }
        $('#floodZone').css({
          'height': (reportHeightCm * refHeightPx / imgHeightCm) + 'px'
        });
      }
      fillHeightPx = $('#floodZone').height();
      $('#sliderZone').css({
        'bottom': fillHeightPx + 'px'
      });
      reportHeightCm = (fillHeightPx * imgHeightCm) / refHeightPx;
      self.reportcard.depth = Math.round(reportHeightCm);

      //Touch start
      $('#sliderZone').on('touchstart mousedown', function (e) {
        self.sliderActive = true;
        $('.knobHelper').fadeOut(100);
        $('#knob').css({
          'box-shadow': '0px 0px 12px 8px rgba(179, 214, 239, 0.5)'
        });
        var startPos;
        if (self.isMobile) {
          startPos = e.originalEvent.touches[0].pageY;
        } else {
          startPos = e.clientY;
        }

        //Drag start
        $('#depthWrapper').on('touchmove mousemove', function (e) {
          var dragPos;
          if (self.isMobile) {
            e.preventDefault();
            dragPos = e.originalEvent.touches[0].pageY;
          } else {
            dragPos = e.clientY;
          }
          reportHeightCm = ((fillHeightPx + startPos - dragPos) * imgHeightCm) / refHeightPx;
          if (self.sliderActive) {
            if (reportHeightCm > 0 && reportHeightCm < heightLimitCm) {
              $('#floodZone').css({
                'height': (fillHeightPx + startPos - dragPos) + 'px'
              });
              $('#sliderZone').css({
                'bottom': (fillHeightPx + startPos - dragPos) + 'px'
              });
              self.reportcard.depth = Math.round(reportHeightCm);
            } else if (reportHeightCm >= heightLimitCm) {
              $('#floodZone').css({
                'height': ((refHeightPx * heightLimitCm) / imgHeightCm) + 'px'
              });
              $('#sliderZone').css({
                'bottom': ((refHeightPx * heightLimitCm) / imgHeightCm) + 'px'
              });
              self.reportcard.depth = heightLimitCm;
            } else if (reportHeightCm <= 0) {
              $('#floodZone').css({
                'height': 0 + 'px'
              });
              $('#sliderZone').css({
                'bottom': 0 + 'px'
              });
              self.reportcard.depth = 0;
            }
          }
        });
      });

      //Drag end
      $(document).on('touchend mouseup', function () {
        if (self.sliderActive) {
          self.sliderActive = false;
          $('#knob').css({
            'box-shadow': '0px 0px 12px 8px rgba(49, 170, 222, 0.4)'
          });
          $('.knobHelper').fadeIn(200);
          fillHeightPx = $('#floodZone').height();
        }
      });
    });
  }
}
