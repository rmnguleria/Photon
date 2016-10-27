import { PhotonPage } from './app.po';

describe('photon App', function() {
  let page: PhotonPage;

  beforeEach(() => {
    page = new PhotonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
