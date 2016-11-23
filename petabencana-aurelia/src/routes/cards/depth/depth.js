import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import $ from 'jquery';

//start-non-standard
@inject(EventAggregator)
//end-non-standard
export class Depth {
  constructor(ea) {
    Depth.ea = ea;
    if (/Mobi/.test(navigator.userAgent)) {
      Depth.isMobile = true;
    } else {
      Depth.isMobile = false;
    }
  }
  activate(params, routerConfig) {
    if (routerConfig.settings.input) {
      Depth.depthVal = routerConfig.settings.input;
      console.log(Depth.depthVal);
    }
    Depth.msgName = routerConfig.settings.msgName;
  }
  attached() {
    let imgHeightCm = 200;
    let refHeightPx = $('#bgImage').height();
    if (Depth.depthVal) {
      $('#floodZone').css({
        'height': (Depth.depthVal * refHeightPx / imgHeightCm) + 'px'
      });
    }
    let fillHeight = $('#floodZone').height(); //TODO: DEBUG, if attached runs before CSS style is applied, results in 0.
    console.log($('#floodZone').height());
    $('#sliderZone').css({
      'bottom': (fillHeight * 100 / refHeightPx) + '%'
    });
    let heightInCm = Math.round((fillHeight * imgHeightCm) / refHeightPx);
    Depth.depthVal = heightInCm;
    Depth.ea.publish(Depth.msgName, Depth.depthVal);
    let sliderActive = false;
    $('#sliderZone').on('touchstart mousedown', function (e) {
      sliderActive = true;
      let startPos;
      if (Depth.isMobile) {
        startPos = e.touches[0].pageY;
      } else {
        startPos = e.clientY;
      }
      $('#depthWrapper').on('touchmove mousemove', function (e) {
        let dragPos;
        if (Depth.isMobile) {
          e.preventDefault();
          dragPos = e.touches[0].pageY;
        } else {
          dragPos = e.clientY;
        }
        heightInCm = Math.round(((fillHeight + startPos - dragPos) * imgHeightCm) / refHeightPx);
        if (sliderActive && heightInCm > 0 && heightInCm <= imgHeightCm) {
          Depth.depthVal = heightInCm;
          Depth.ea.publish(Depth.msgName, Depth.depthVal);
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
