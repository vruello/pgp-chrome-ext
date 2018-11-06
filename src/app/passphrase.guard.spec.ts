import { TestBed, async, inject } from '@angular/core/testing';

import { PassphraseGuard } from './passphrase.guard';

describe('PassphraseGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassphraseGuard]
    });
  });

  it('should ...', inject([PassphraseGuard], (guard: PassphraseGuard) => {
    expect(guard).toBeTruthy();
  }));
});
