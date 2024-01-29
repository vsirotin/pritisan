import { TestBed } from '@angular/core/testing';

import { Localizer } from './localizer';

describe('LocalizationService', () => {
  let service: Localizer;

  beforeEach(() => {
    service = new Localizer("SH-CL-LO");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
