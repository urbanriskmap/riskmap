var baseURL = 'http://localhost:9000';

casper.test.begin('Landing page', function(test) {
  casper.start(baseURL, function() {
    this.echo(this.page.content);
    test.assertTitle('PetaBencana.id');
  });

  //click the jakarta option on the city popup
  casper.then(function() {
    casper.waitForSelector('#cityname-jakarta', function() {
      this.click('#cityname-jakarta');

      casper.waitForUrl(/map\/jakarta/, function() {
        //make sure the floodgauges are up
        casper.waitForSelector('.leaflet-marker-icon', function() {
          test.assertExists('.leaflet-marker-icon');
        });
      });
    }, 5000);
  });


  casper.then(function() {
    casper.waitForSelector('.icon-add-report', function() {
      this.click('.icon-add-report');
    });
  });

  casper.run(function() {
    test.done();
  });

});

casper.run();
