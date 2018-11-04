import { TestBed } from '@angular/core/testing';

import { PGPService } from './pgp.service';

describe('PGPService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PGPService = TestBed.get(PGPService);
    expect(service).toBeTruthy();
  });
});
