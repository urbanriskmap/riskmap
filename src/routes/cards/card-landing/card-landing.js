export class CardLanding {
  resizeCardHt(factor) {
    var glitchHeight = 106;
    $('#cardContent').css({
      'height': $('#cardWrapper').height() - ($('#cardTitle').height() + $('#cardNavigation').height() + (factor * glitchHeight)) + 'px'
    });
    $('#cardNavigation').css({
      'bottom': (factor * glitchHeight) + 'px'
    });
  }

  checkBrowserThenResize() {
    $('.tabButtons').width((100 / (this.totalCards - 3)) + '%'); //fit 'n' tab buttons on-the-fly, n = (total - staple) cards
    var nua = navigator.userAgent.toLowerCase();
    //______________is Mobile______________________an iPhone_________________browser not safari (in-app)___________app is twitter________________app is facebook______________not facebook messenger_________
    if ((/Mobi/.test(navigator.userAgent)) && nua.indexOf('iphone') > -1 && nua.indexOf('safari') === -1 && (nua.indexOf('twitter') > -1 || (nua.indexOf('fban') > -1 && nua.indexOf('messenger') === -1))) {
      this.resizeCardHt(1);
    } else {
      //Execute resize on initial page load
      this.resizeCardHt(0);
      //Add resize listener to browser window
      $(window).resize(() => {
        this.resizeCardHt(0);
      });
    }
  }

  attached() {
    this.checkBrowserThenResize();
  }
}
