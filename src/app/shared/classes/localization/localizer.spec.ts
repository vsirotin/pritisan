import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LanguageIetfTag, Localizer } from './localizer';
import { Observable, Subscription } from 'rxjs';
import { ILanguageDescription, LanguageSelectionNotificationService } from '../../../features/services/language-selection/language-selection-notification.service';
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

  xit('should be created', () => {
    expect(localizer).toBeTruthy();
  });

  xit('by start has en-US default language', () => {
    expect(localizer.currentLanguage).toEqual("en-US");
  });

  describe('after change the language on de-DE', () => {
    let languageChanged$: Observable<LanguageIetfTag>;

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
      .subscribe((languageTag: LanguageIetfTag) => {
        expect(languageTag.ietfTag).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });    

    xit('the current language in localizer should be de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((slanguageTag: LanguageIetfTag) => {
        expect(localizer.currentLanguage).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });  

    xit('the localizer should have languageMap for de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageIetfTag) => {
        expect(localizer.getTranslation('settings', 'not-exist')).toEqual("Einstellungen");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });    
  });

});



