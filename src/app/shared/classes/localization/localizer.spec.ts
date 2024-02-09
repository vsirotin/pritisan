import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LanguageData, Localizer } from './localizer';
import { Observable, Subscription } from 'rxjs';
import { LanguageSelectionNotificationService } from '../../../features/services/language-selection/language-selection-notification.service';
import { ILanguageDescription } from './language-description';
import { Logger } from '../../services/logging/logger';
import { SETTINGS_SOURCE_DIR } from '../../../features/components/settings/settings.component';

describe('Localizer', () => {
  let localizer: Localizer;
  let langDescr: ILanguageDescription;

  let langSelectNotificationService: LanguageSelectionNotificationService 

  beforeEach(() => {
    let logger = new Logger();

    langSelectNotificationService = new LanguageSelectionNotificationService();
    localizer = new Localizer(SETTINGS_SOURCE_DIR, 1, langSelectNotificationService.selectionChanged$, logger);
  });

  it('should be created', () => {
    expect(localizer).toBeTruthy();
  });

  xit('by start has en-US default language', () => {
    expect(localizer.currentLanguage?.ietfTag).toEqual("en-US");
  });

  describe('after change the language on de-DE', () => {
    let languageChanged$: Observable<LanguageData>;

    let subscription: Subscription;
    
    beforeEach(() => {  
      languageChanged$ = localizer.languageChanged$;
      langDescr = {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"};
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('the selected language should be de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
        expect(languageTag.ietfTag).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });    

    it('the current language in localizer should be de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((slanguageTag: LanguageData) => {
        expect(localizer.currentLanguage?.ietfTag).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });  

    it('the localizer should have languageMap for de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
        expect(localizer.getTranslation('settings', 'not-exist')).toEqual("Einstellungen");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });    
  });

});



