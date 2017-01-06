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
  }

  attached() {
    $(document).ready(() => {
      var self = this;
      var imgHeightCm = 200;
      var refHeightPx = $('#imgWrapper').height();
      var fillHeight;
      if (self.reportcard.depth) {
        $('#floodZone').css({
          'height': (self.reportcard.depth * refHeightPx / imgHeightCm) + 'px'
        });
      }
      fillHeight = $('#floodZone').height();
      var heightInCm = Math.round((fillHeight * imgHeightCm) / refHeightPx);
      self.reportcard.depth = heightInCm;
      var sliderActive = false;
      $('#sliderZone').css({
        'bottom': (fillHeight * 100 / refHeightPx) + '%'
      });

      //Touch start
      $('#sliderZone').on('touchstart mousedown', function (e) {
        sliderActive = true;
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
          heightInCm = Math.round(((fillHeight + startPos - dragPos) * imgHeightCm) / refHeightPx);
          if (sliderActive && heightInCm > 0 && heightInCm <= imgHeightCm) {
            self.reportcard.depth = heightInCm;
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
    });
  }
}
