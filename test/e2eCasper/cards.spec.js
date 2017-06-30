var baseUrl = 'http://localhost:9000';
var cardsUrl = baseUrl + '/cards/test123';

casper.test.begin('Cards', function(test) {
  casper.start(baseUrl, function() {
  });

  casper.thenOpen(cardsUrl, function() {
    casper.waitForUrl(cardsUrl+'/location', function() {
      test.assertTitle('Flood reports | PetaBencana.id');
      var languageButton = '#id';
      casper.waitForSelector(languageButton, function() {
        this.click(languageButton);
      });
    });
  });

  casper.run(function() {
    test.done();
  });

});

casper.run();
