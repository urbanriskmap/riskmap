import {Cards} from '../../src/routes/cards/cards'; 
import {EventAggregator} from 'aurelia-event-aggregator'; 
import {ReportCard} from '../../src/resources/report-card';
import {Config} from '../../src/resources/config'; // Cards config
import {Container} from 'aurelia-dependency-injection'; 


describe('cards', () => {
  it('can construct', () => {
    let container = new Container(); 
    let cards = container.get(Cards); 
    expect(cards.test_card).toBe(true); 
  }); 

  it('can switch language', () => {
    var container = new Container(); 
    var cards = container.get(Cards); 

    cards.switchLang('en'); 
    expect(cards.reportcard.selLanguage).toBe('en'); 

  }); 
}); 
