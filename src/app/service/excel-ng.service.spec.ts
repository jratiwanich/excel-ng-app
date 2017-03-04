import { TestBed, inject } from '@angular/core/testing';

import { ExcelNgService } from './excel-ng.service';

describe('ExcelNgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelNgService]
    });
  });

  it('should ...', inject([ExcelNgService], (service: ExcelNgService) => {
    expect(service).toBeTruthy();
  }));
});
