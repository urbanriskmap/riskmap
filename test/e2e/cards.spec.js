describe('Landing page', function() {

  beforeEach(() => {
    browser.loadAndWaitForAureliaPage('http://localhost:9000/cards/test123');
  });
  
  it('expect title to be correct', () => {
    expect(browser.getTitle()).toContain('Flood reports'); 
  });

  it('expect flood location card', () => {
    //first card should be flood location 
    expect(browser.getCurrentUrl()).toContain('location'); 
    //let's click the previous button, nothing should happen! 
    element(by.id('prv')).click(); 
    browser.sleep(1000); 
    expect(browser.getCurrentUrl()).toContain('location'); 

    //now click the translate option 
    element(by.id('id')).click(); 
    browser.sleep(1000); 
    element(by.id('titleText')).getText().then((text)=> {
      expect(text).toBe('Pilih lokasi banjir'); 
    });
    
  }); 

  it('expect water depth card to be second', () => {
    browser.sleep(1000); 
    //need to click twice because we're not in jakarta
    element(by.id('nxt')).click();
    element(by.id('nxt')).click();
    browser.sleep(2000); 
    expect(browser.getCurrentUrl()).toContain('depth'); 
    element(by.id('titleText')).getText().then((text)=> {
      expect(text).toContain('Report water depth'); 
    });
  }); 

  it('expect upload photo to be third', () => {
    browser.sleep(1000); 
    //need to click twice because we're not in jakarta
    element(by.id('nxt')).click();
    element(by.id('nxt')).click();
    browser.sleep(2000); 


    element(by.id('nxt')).click();
    expect(browser.getCurrentUrl()).toContain('photo'); 
  }); 

});

