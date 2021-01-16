import { TestBed } from '@angular/core/testing';

import { StripHtmlService } from './strip-html.service';

describe('StripHtmlService', () => {
  let service: StripHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripHtmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
