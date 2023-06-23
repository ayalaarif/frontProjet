import { TestBed } from '@angular/core/testing';

import { TraveauService } from './traveau.service';

describe('TraveauService', () => {
  let service: TraveauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraveauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
