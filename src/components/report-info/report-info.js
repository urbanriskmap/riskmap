import {inject, bindable, customElement, computedFrom} from 'aurelia-framework';
import {Config} from '../../resources/config';
import {PointsService} from './points-service';

//start-aurelia-decorators
@customElement('report-info')
@inject(Config, PointsService)
//end-aurelia-decorators
export class ReportInfo {
  //@bindable attributes do not work with camelCase...
  //start-aurelia-decorators
  @bindable locale;
  @bindable city;
  @bindable popupcontent;
  @bindable id;
  //end-aurelia-decorators

  constructor(Config, PointsService) {
    this.config = Config;
    this.service = PointsService;
    this.app = Config.map.app;
    this.links = {
      qlue: 'https://play.google.com/store/apps/details?id=org.qluein.android&hl=en',
      detik: 'http://pasangmata.detik.com/',
      //start-aurelia-decorators
      grasp: 'javascript:void(0)'
      //end-aurelia-decorators
    };
  }

  feedbackInteraction(button) {
    // $('.interactionFlyer').hide();
    $('.voteButton').removeClass('active');
    $('#vote_button_' + button.name).addClass('active');
    switch (button.name) {
      case 'share':
      // $('#flagReport').hide();
      $('#socialIcons').toggle();
            $('#shareButtons' + button.name).toggleClass('highlight');
      break;
      case 'flag':
      // $('#socialIcons').hide();
      $('#flagReport').toggle();
      $('#shareButtons' + button.name).toggleClass('highlight');
      break;
      default:
      return null;
    }
  }



  submitFlag()
  {
    let flagText = document.getElementById('flag_text').value;
    console.log(flagText);
  }

  get msgText() {
    return this.locale.report_info.share_msg;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get reportUrl() {
    return this.app + "map/" + this.city + "/" + this.popupcontent.pkey;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get reportId() {
    if (this.popupcontent.pkey) {
      return this.popupcontent.pkey;
    } else {
      return null;
    }
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get height() {
    if (this.popupcontent.report_data) {
      return this.popupcontent.report_data.flood_depth;
    } else {
      return null;
    }
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get points() {
    if (this.popupcontent.report_data) {
      return this.popupcontent.report_data.points;
    } else {
      return 0;
    }
  }


  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get imageurl() {
    return this.popupcontent.image_url;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get fullsizeimg() {
    if (this.popupcontent.image_url) {
      return this.popupcontent.image_url.replace(/(\/[-a-zA-Z0-9]*)(?=\.jpg)/, '/large' + '$1');
    } else {
      return null;
    }
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get title() {
    return this.popupcontent.title;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get reportevent() {
    if (this.popupcontent.report_data) {
      return this.popupcontent.report_data.report_type;
    } else {
      return null;
    }
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get source() {
    return this.popupcontent.source;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get timestamp() {
    return this.popupcontent.timestamp;
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent')
  //end-aurelia-decorators
  get text() {
    return this.popupcontent.text;
  }

  attached() {
    var self = this;

    self.socialButtons = [ // Name string should match fontello icons name
      {
        name: "twitter",
        intent: "https://twitter.com/intent/tweet?text=" + self.msgText + "%20" + self.reportUrl
      },
      {
        name: "telegram",
        intent: "https://telegram.me/share/url?url=" + self.reportUrl + " &text= " + self.msgText
      },
      {
        name: "whatsapp",
        intent: "https://api.whatsapp.com/send?text=" + self.msgText + "%20" + self.reportUrl
      },
      {
        name: "facebook",
        intent: "http://www.facebook.com/sharer/sharer.php?u=" + self.reportUrl
      }
    ];

    self.shareButtons = [
      {
        'name': 'share',
        'tooltip': 'Share this report'
      },
      {
        'name': 'flag',
        'tooltip': 'Flag this report as inappropriate'
      }
    ];

    self.voteButtons = [
      {
        'name': 'upvote',
        'tooltip': 'Upvote this report',
        'enabled': true
      },
      {
        'name': 'downvote',
        'tooltip': 'Downvote this report',
        'enabled': true
      }
    ];
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent.voteChanged')
  //end-aurelia-decorators
  get upvoteDisabled() {
    if (localStorage.getItem('id_' + this.reportId)) {
      if (localStorage.getItem('id_' + this.reportId) === 'up') {
        return 'disabled';
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  //start-aurelia-decorators
  @computedFrom('popupcontent.voteChanged')
  //end-aurelia-decorators
  get downvoteDisabled() {
    if (localStorage.getItem('id_' + this.reportId)) {
      if (localStorage.getItem('id_' + this.reportId) === 'down') {
        return 'disabled';
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  voteHandler(vote) {
    const self = this;
    self.service.updatePoints(self.reportId, vote)
    .then(points => {
      if (vote > 0) {
        // Upvote
        if (localStorage.getItem('id_' + self.reportId)) {
          if (localStorage.getItem('id_' + this.reportId) === 'down') {
            // Case 1: already downvoted
            localStorage.setItem('id_' + self.reportId, 'none');
          } else {
            // Case 2: not downvoted
            localStorage.setItem('id_' + self.reportId, 'up');
          }
        } else {
          // Case 3: never voted for this report id
          localStorage.setItem('id_' + self.reportId, 'up');
        }

        // Trigger getter to update disabled status
        self.popupcontent.voteChanged = true;
      } else {
        // Downvote
        if (localStorage.getItem('id_' + self.reportId)) {
          if (localStorage.getItem('id_' + this.reportId) === 'up') {
            // Case 1: already upvoted
            localStorage.setItem('id_' + self.reportId, 'none');
          } else {
            // Case 2: not upvoted
            localStorage.setItem('id_' + self.reportId, 'down');
          }
        } else {
          // Case 3: never voted for this report id
          localStorage.setItem('id_' + self.reportId, 'down');
        }

        // Trigger getter to update disabled status
        self.popupcontent.voteChanged = true;
      }
      console.log(localStorage);
    });

    // Set voteChanged back to false to enable trigger on next button click
    self.popupcontent.voteChanged = false;
  }
}
