  import $ from 'jquery';
  import {inject, bindable, customElement} from 'aurelia-framework';
  import {Config} from '../../resources/config';

  //start-aurelia-decorators
  @customElement('report-info')
  @inject(Config)
  //end-aurelia-decorators
  export class ReportInfo {
    //@bindable attributes do not work with camelCase...
    //start-aurelia-decorators
    @bindable locale;
    @bindable imageurl;
    @bindable height;
    @bindable reportevent;
    @bindable title;
    @bindable text;
    @bindable pkey;
    @bindable city;
    @bindable timestamp;
    @bindable source;
    //end-aurelia-decorators

    constructor(Config) {
      this.config = Config;
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
      switch (button.name) {
        case 'share':
        if($('#vote_button_' + button.name).hasClass('active'))
        {
          $('#vote_button_' + button.name).removeClass('active');
          $('#socialIcons').fadeToggle();
        }
        else {
          {
            $('#vote_button_' + button.name).addClass('active');
            $('#socialIcons').fadeToggle();
          }
        }
        break;
        case 'flag':
        if($('#vote_button_' + button.name).hasClass('active'))
        {
          $('#vote_button_' + button.name).removeClass('active');
          $('#flagReport').fadeToggle();
        }
        else {
          {
            $('#vote_button_' + button.name).addClass('active');
            $('#flagReport').fadeToggle();}
          }
        default:
        return null;
      }
    }

    get msgText() {
      return this.locale.report_info.share_msg;
    }

    get reportUrl() {
      return this.app + "map/" + this.city + "/" + this.pkey;
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

      self.voteButtons = [
        {
          'name': 'upvote',
          'tooltip': 'Upvote this report'
        },
        {
          'name': 'downvote',
          'tooltip': 'Downvote this report'
        },
        {
          'name': 'share',
          'tooltip': 'Share this report'
        },
        {
          'name': 'flag',
          'tooltip': 'Flag this report as inappropriate'
        }
      ];

      // self.shareButton = [
      //   {
      //     'name': 'share',
      //     'tooltip': 'Share this report'
      //   }
      // ];
    }
  }
