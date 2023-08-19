import { TestBed } from '@angular/core/testing';

import { MercantilReportService } from './mercantil-report.service';

describe('MercantilReportService', () => {
  let service: MercantilReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MercantilReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
