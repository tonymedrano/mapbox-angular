import { MapboxPage } from './app.po';

describe('mapbox App', () => {
  let page: MapboxPage;

  beforeEach(() => {
    page = new MapboxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
