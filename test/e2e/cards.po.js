const base = 'http://localhost:9000/cards/test123'; 

class PageObjectCards {
  constructor() {} 

  getCurrentPageTitle() {
    return browser.getTitle(); 
  }

  goToLocation() {
    return browser.loadAndWaitForAureliaPage(base+'/location');
  }

  prev() {
    element(by.id('prv')).click(); 
    return browser.waitForRouterComplete(); 
  }

  next() {
    element(by.id('nxt')).click(); 
    return browser.waitForRouterComplete(); 
  }

}
