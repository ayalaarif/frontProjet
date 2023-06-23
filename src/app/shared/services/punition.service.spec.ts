import { TestBed } from '@angular/core/testing';

import { PunitionService } from './punition.service';

describe('PunitionService', () => {
  let service: PunitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PunitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
