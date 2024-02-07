import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LanguageIetfTag, Localizer } from './localizer';
import { Observable, Subscription } from 'rxjs';
import { ILanguageDescription, LanguageSelectionNotificationService } from '../../../features/services/language-selection/language-selection-notification.service';
import { Logger } from '../../services/logging/logger';

describe('Localizer', () => {
  let localizer: Localizer;
  let langDescr: ILanguageDescription;
  let langSelectNotificationService: LanguageSelectionNotificationService 


  beforeEach(() => {
    let logger = new Logger();

    langSelectNotificationService = new LanguageSelectionNotificationService();
    localizer = new Localizer("test", 1, langSelectNotificationService.selectionChanged$, logger);
  });

  it('should be created', () => {
    expect(localizer).toBeTruthy();
  });

  it('by start has en-US default language', () => {
    expect(localizer.currentLanguage).toEqual("en-US");
  });

  describe('after change the language on de-DE', () => {
    let languageChanged$: Observable<LanguageIetfTag>;

    let subscription: Subscription;
    
    beforeEach(() => {  
      console.log("beforeEach 2")
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

    it('the current language in localizer should be de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((slanguageTag: LanguageIetfTag) => {
        expect(localizer.currentLanguage).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });  

    it('the localizer should have languageMap for de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageIetfTag) => {
        expect(localizer.getTranslation('settings', 'not-exist')).toEqual("Einstellungen");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });    
  });

});



