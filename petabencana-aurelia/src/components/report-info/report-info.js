import {bindable, customElement} from 'aurelia-framework';

//start-non-standard
@customElement('report-info')
//end-non-standard
export class ReportInfo {
  //@bindable attributes do not work with camelCase...

  //start-non-standard
  @bindable source;
  @bindable title;
  @bindable body;
  @bindable status;
  //end-non-standard

  attached(){
    var w; var h;
    var img=$('#image');
 img.src=this.source;
 img.onload=function(){w=this.width; h=this.height;};
    console.log(w +', '+ h);
  }
}
