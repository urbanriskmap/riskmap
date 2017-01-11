import {inject} from 'aurelia-framework';
import $ from 'jquery';
import {Reportcard} from 'Reportcard';

//start-non-standard
@inject(Reportcard)
//end-non-standard
export class Depth {
  constructor(Reportcard) {
    this.reportcard = Reportcard;
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
      var self = this;
      var imgHeightCm = 238;
      var heightLimit = 190;
      var refHeightPx = $('#bgImage').height();
      var fillHeight;
      if (self.reportcard.depth) {
        if (self.reportcard.depth > heightLimit) {
          self.reportcard.depth = heightLimit;
        } else if (self.reportcard.depth < 0) {
          self.reportcard.depth = 0;
        }
        $('#floodZone').css({
          'height': (self.reportcard.depth * refHeightPx / imgHeightCm) + 'px'
        });
      }
      fillHeight = $('#floodZone').height();
      $('#sliderZone').css({
        'bottom': fillHeight + 'px'
      });
      self.reportcard.depth = (fillHeight * imgHeightCm) / refHeightPx;
      self.displayDepth = Math.round(self.reportcard.depth);

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
          self.reportcard.depth = ((fillHeight + startPos - dragPos) * imgHeightCm) / refHeightPx;
          if (self.sliderActive && (self.reportcard.depth > 0 && self.reportcard.depth <= 190)) {
            self.displayDepth = Math.round(self.reportcard.depth);
            $('#floodZone').css({
              'height': (fillHeight + startPos - dragPos) + 'px'
            });
            $('#sliderZone').css({
              'bottom': (fillHeight + startPos - dragPos) + 'px'
            });
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
          fillHeight = $('#floodZone').height();
        }
      });
    });
  }
}
