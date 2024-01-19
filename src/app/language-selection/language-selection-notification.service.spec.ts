import { TestBed } from '@angular/core/testing';

import { LanguageSelectionNotificationService } from './language-selection-notification.service';

describe('LanguageSelectionNotificationService', () => {
  let service: LanguageSelectionNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageSelectionNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
