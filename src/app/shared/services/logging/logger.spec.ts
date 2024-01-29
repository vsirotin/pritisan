import { TestBed } from '@angular/core/testing';

import { Logger } from './logger';

describe('Logger', () => {
  let service: Logger;

  beforeEach(() => {

    service = new Logger();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
