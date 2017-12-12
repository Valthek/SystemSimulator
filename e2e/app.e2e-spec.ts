import { SysSymPage } from './app.po';

describe('sys-sym App', function() {
  let page: SysSymPage;

  beforeEach(() => {
    page = new SysSymPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
