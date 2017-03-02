import { ExcelNgAppPage } from './app.po';

describe('excel-ng-app App', () => {
  let page: ExcelNgAppPage;

  beforeEach(() => {
    page = new ExcelNgAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
