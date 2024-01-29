import { TestBed } from '@angular/core/testing';

import { UserInformer, Warning, Error } from './user-informer';
import { Subject } from 'rxjs';
import { Logger } from '../../services/logging/logger';

describe('UserInformerService', () => {
  let service: UserInformer;

  beforeEach(() => {
    service = new UserInformer("SH-CL-UI", new Logger(), new Subject<Warning|Error>());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
