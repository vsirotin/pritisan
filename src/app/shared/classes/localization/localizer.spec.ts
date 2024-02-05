import { TestBed } from '@angular/core/testing';

import { Localizer } from './localizer';
import { Observable } from 'rxjs';
import { LanguageDescription } from '../../../features/services/language-selection/language-selection-notification.service';
import { Logger } from '../../services/logging/logger';

describe('LocalizationService', () => {
  let service: Localizer;

  let observable: Observable<LanguageDescription> = new Observable<LanguageDescription>();

  beforeEach(() => {
    service = new Localizer("test", 1, observable, new Logger());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
