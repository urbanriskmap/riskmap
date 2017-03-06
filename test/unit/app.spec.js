import {App} from '../../src/app';

//from aurelia's skeleton-esnext app
class RouterStub {
  constructor() {
    this.options = {};
  }

  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }

  mapUnknownRoutes() {}
}

describe('the app', () => {
  var sut;
  var mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('router is defined', () => {
    expect(sut.router).toBeDefined();
  });

  it('correct title', () => {
    expect(sut.router.title).toEqual('PetaBencana.id');
  });
});
