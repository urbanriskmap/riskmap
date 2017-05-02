
describe('Landing page', function() {

  beforeEach(() => {
    browser.loadAndWaitForAureliaPage('http://localhost:9000');
  });
  
  it('expect title to be correct', () => {
    expect(browser.getTitle()).toBe('Riskmap.in'); 
  });

  it('expect city choosing popup', () => {
    let finder = element(by.id('cityPopup')); 
    finder.getText().then((text) => {
      expect(text).toContain("Select city"); 
      element(by.id('jakarta')).click();
      browser.sleep(2000);
      let url = browser.getCurrentUrl(); 
      expect(url).toContain("map/jakarta"); 

      //expect that the flood-gauges layer is being rendered- specific to Jakarta. 
      expect(element(by.css('.leaflet-gauges-pane')).isPresent()).toBe(true); 
    }); 
  }); 
});

